import { setTimeout as wait } from "node:timers/promises";
import { defineTool } from "eve/tools";
import { z } from "zod";

const CONTEXT_API_BASE_URL = "https://api.context.dev/v1";
const DEFAULT_MAX_MARKDOWN_CHARS = 18_000;
const MAX_MARKDOWN_CHARS = 60_000;
const REQUEST_TIMEOUT_MS = 30_000;
const MAX_RETRIES = 2;
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

type ContextJson = Record<string, unknown>;

type ContextRequestResult =
  | {
      data: ContextJson;
      ok: true;
      status: number;
      url: string;
    }
  | {
      error: string;
      ok: false;
      status: number;
      url: string;
    };

type BrandPageContextOutput =
  | {
      brand: ContextRequestResult;
      homepageMarkdown: HomepageMarkdownOutput;
      ok: true;
      sourceUrls: string[];
      styleguide: ContextRequestResult | null;
    }
  | {
      error: string;
      missingEnv?: string;
      ok: false;
    };

type HomepageMarkdownOutput = {
  characterCount: number;
  markdown: string | null;
  sourceUrl: string;
  truncated: boolean;
};

const requestInputSchema = z.object({
  domain: z
    .string()
    .min(1)
    .describe("Brand domain to resolve, such as example.com or https://example.com."),
  pageUrl: z
    .string()
    .url()
    .optional()
    .describe("Specific page URL to scrape. Defaults to the domain homepage."),
  includeStyleguide: z
    .boolean()
    .optional()
    .describe("Whether to pull Context.dev styleguide data. Defaults to true."),
  maxMarkdownChars: z
    .number()
    .int()
    .min(1_000)
    .max(MAX_MARKDOWN_CHARS)
    .optional()
    .describe("Maximum homepage markdown characters returned to the model."),
});

export default defineTool({
  description:
    "Retrieve brand, homepage content, and optional styleguide data for a domain with the Context.dev API. Use this before generating an SEO-optimized HTML page from a brand domain.",
  inputSchema: requestInputSchema,
  async execute({
    domain,
    includeStyleguide = true,
    maxMarkdownChars = DEFAULT_MAX_MARKDOWN_CHARS,
    pageUrl,
  }): Promise<BrandPageContextOutput> {
    const apiKey = process.env.CONTEXT_DEV_API_KEY ?? process.env.CONTEXT_API_KEY;
    if (!apiKey) {
      return {
        ok: false,
        error:
          "CONTEXT_DEV_API_KEY is required. Set it to a Context.dev API key before running the agent.",
        missingEnv: "CONTEXT_DEV_API_KEY",
      };
    }

    const normalizedDomain = normalizeDomain(domain);
    const sourceUrl = pageUrl ?? `https://${normalizedDomain}`;
    const brand = await requestContextApi("/brand/retrieve", { domain: normalizedDomain }, apiKey);
    const markdown = await requestContextApi("/web/scrape/markdown", { url: sourceUrl }, apiKey);
    const styleguide = includeStyleguide
      ? await requestContextApi("/web/styleguide", { domain: normalizedDomain }, apiKey)
      : null;

    return {
      ok: true,
      brand,
      homepageMarkdown: formatMarkdownOutput(markdown, sourceUrl, maxMarkdownChars),
      sourceUrls: [brand.url, markdown.url, ...(styleguide ? [styleguide.url] : [])],
      styleguide,
    };
  },
  toModelOutput(output) {
    if (!output.ok) {
      return { type: "json", value: output };
    }

    return {
      type: "json",
      value: {
        ok: true,
        brand: output.brand,
        homepageMarkdown: output.homepageMarkdown,
        styleguide: output.styleguide,
        sourceUrls: output.sourceUrls,
      },
    };
  },
});

function normalizeDomain(input: string): string {
  const value = input.trim();
  const withProtocol = value.includes("://") ? value : `https://${value}`;
  const url = new URL(withProtocol);
  return url.hostname.toLowerCase().replace(/^www\./, "");
}

async function requestContextApi(
  endpoint: string,
  params: Record<string, string>,
  apiKey: string,
): Promise<ContextRequestResult> {
  const url = new URL(`${CONTEXT_API_BASE_URL}${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
        signal: controller.signal,
      });
      const data = await readJsonResponse(response);
      if (response.ok) {
        return { ok: true, status: response.status, url: url.toString(), data };
      }

      const error = formatContextError(response.status, data);
      if (attempt < MAX_RETRIES && RETRYABLE_STATUS_CODES.has(response.status)) {
        await wait(getRetryDelayMs(attempt, response.headers.get("retry-after")));
        continue;
      }

      return { ok: false, status: response.status, url: url.toString(), error };
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        await wait(getRetryDelayMs(attempt));
        continue;
      }

      return {
        ok: false,
        status: 0,
        url: url.toString(),
        error: formatUnknownError(error),
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  return {
    ok: false,
    status: 0,
    url: url.toString(),
    error: "Context.dev request failed after retries.",
  };
}

async function readJsonResponse(response: Response): Promise<ContextJson> {
  const text = await response.text();
  if (!text) {
    return {};
  }

  try {
    const parsed = JSON.parse(text);
    return isRecord(parsed) ? parsed : { value: parsed };
  } catch {
    return { message: text };
  }
}

function formatMarkdownOutput(
  result: ContextRequestResult,
  sourceUrl: string,
  maxChars: number,
): HomepageMarkdownOutput {
  if (!result.ok) {
    return {
      sourceUrl,
      markdown: null,
      characterCount: 0,
      truncated: false,
    };
  }

  const markdown = typeof result.data.markdown === "string" ? result.data.markdown : "";
  const trimmed = markdown.slice(0, maxChars);
  return {
    sourceUrl,
    markdown: trimmed,
    characterCount: markdown.length,
    truncated: markdown.length > trimmed.length,
  };
}

function getRetryDelayMs(attempt: number, retryAfterHeader?: string | null): number {
  if (retryAfterHeader) {
    const retryAfterSeconds = Number(retryAfterHeader);
    if (Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0) {
      return retryAfterSeconds * 1_000;
    }
  }

  return 500 * 2 ** attempt;
}

function formatContextError(status: number, data: ContextJson): string {
  const message = data.message ?? data.error ?? data.code;
  if (typeof message === "string" && message.length > 0) {
    return `Context.dev API ${status}: ${message}`;
  }

  return `Context.dev API ${status}: request failed.`;
}

function formatUnknownError(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unknown Context.dev request error.";
}

function isRecord(value: unknown): value is ContextJson {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
