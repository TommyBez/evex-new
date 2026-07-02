import { defineTool } from "eve/tools";
import { z } from "zod";

const AI_GATEWAY_IMAGE_URL = "https://ai-gateway.vercel.sh/v1/images/generations";
const ARROW_MODEL = "quiverai/arrow-1.1";
const RESPONSE_PREVIEW_LENGTH = 1200;

const inputSchema = z.object({
  filename: z
    .string()
    .min(1)
    .describe("Suggested SVG filename, for example feature-hero.svg."),
  assetType: z
    .string()
    .min(1)
    .describe("Asset type, for example hero illustration, icon, badge, or empty state."),
  brief: z
    .string()
    .min(20)
    .describe("Self-contained creative brief with brand profile, subject, style notes, and constraints."),
  dimensions: z
    .string()
    .min(1)
    .describe("Intended dimensions or viewBox, for example 1200x720 or 0 0 64 64."),
});

const imageGenerationResponseSchema = z.object({
  data: z
    .array(
      z.object({
        b64_json: z.string().min(1).optional(),
        revised_prompt: z.string().optional(),
      }),
    )
    .min(1),
});

type GenerateSvgOutput =
  | {
      byteLength: number;
      filename: string;
      mediaType: "image/svg+xml";
      model: typeof ARROW_MODEL;
      ok: true;
      revisedPrompt?: string;
      svg: string;
    }
  | {
      error: string;
      filename: string;
      missingEnv?: "AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN";
      ok: false;
      responsePreview?: string;
      status?: number;
    };

export default defineTool({
  description:
    "Generate one editable SVG asset by calling the Quiver Arrow image model through Vercel AI Gateway. Use once per finalized asset brief.",
  inputSchema,
  async execute(input): Promise<GenerateSvgOutput> {
    const credential = readGatewayCredential();
    if (!credential) {
      return {
        ok: false,
        filename: input.filename,
        error:
          "AI Gateway credentials are required to call quiverai/arrow-1.1. Set AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN.",
        missingEnv: "AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN",
      };
    }

    const prompt = buildPrompt(input);
    const response = await fetch(AI_GATEWAY_IMAGE_URL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${credential}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: ARROW_MODEL,
        prompt,
        n: 1,
        response_format: "b64_json",
        providerOptions: {
          quiverai: {
            operation: "generate",
            instructions:
              "Return a complete SVG document only. The SVG must be editable markup, not raster data.",
            maxOutputTokens: 6000,
            temperature: 0.45,
            topP: 0.9,
          },
        },
      }),
    });

    const responseText = await response.text();
    if (!response.ok) {
      return {
        ok: false,
        filename: input.filename,
        error: "Quiver Arrow SVG generation failed through AI Gateway.",
        status: response.status,
        responsePreview: preview(responseText),
      };
    }

    const parsedJson = parseJson(responseText);
    const parsedResponse = imageGenerationResponseSchema.safeParse(parsedJson);
    if (!parsedResponse.success) {
      return {
        ok: false,
        filename: input.filename,
        error: "AI Gateway returned an unexpected image-generation response.",
        responsePreview: preview(responseText),
      };
    }

    const firstImage = parsedResponse.data.data[0];
    if (!firstImage.b64_json) {
      return {
        ok: false,
        filename: input.filename,
        error: "AI Gateway did not return base64 SVG data.",
        responsePreview: preview(responseText),
      };
    }

    const rawSvg = decodeSvg(firstImage.b64_json);
    if (!looksLikeSvg(rawSvg)) {
      return {
        ok: false,
        filename: input.filename,
        error: "Quiver Arrow returned data that does not look like SVG markup.",
        responsePreview: preview(rawSvg),
      };
    }

    if (!hasViewBox(rawSvg)) {
      return {
        ok: false,
        filename: input.filename,
        error: "Quiver Arrow returned SVG markup without a viewBox.",
        responsePreview: preview(rawSvg),
      };
    }

    const svg = ensureAccessibleSvg(rawSvg, input);
    return {
      ok: true,
      filename: input.filename,
      model: ARROW_MODEL,
      mediaType: "image/svg+xml",
      byteLength: Buffer.byteLength(svg, "utf8"),
      svg,
      revisedPrompt: firstImage.revised_prompt,
    };
  },
  toModelOutput(output) {
    return {
      type: "json",
      value: output,
    };
  },
});

function readGatewayCredential(): string | undefined {
  return (
    process.env.AI_GATEWAY_API_KEY?.trim() ||
    process.env.VERCEL_OIDC_TOKEN?.trim()
  );
}

function buildPrompt(input: z.infer<typeof inputSchema>): string {
  return [
    `Generate ${input.filename} as a production-ready SVG.`,
    `Asset type: ${input.assetType}.`,
    `Dimensions or viewBox: ${input.dimensions}.`,
    "",
    input.brief,
    "",
    "Hard requirements:",
    "- Return complete SVG markup only.",
    "- Include a viewBox, title, and desc.",
    "- Use semantic group ids for meaningful sections.",
    "- Keep the artwork editable. Do not embed raster images.",
    "- For icons, prefer currentColor unless the brief explicitly requires fixed brand colors.",
    "- Avoid generic SaaS filler such as globes, random node networks, decorative dot grids, and disconnected floating dashboards.",
  ].join("\n");
}

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

function decodeSvg(encoded: string): string {
  const base64 = encoded.includes(",") ? encoded.split(",").at(-1) ?? "" : encoded;
  return Buffer.from(base64, "base64").toString("utf8").trim();
}

function looksLikeSvg(value: string): boolean {
  return value.includes("<svg") && value.includes("</svg>");
}

function hasViewBox(value: string): boolean {
  return /\sviewBox\s*=/iu.test(value);
}

function ensureAccessibleSvg(
  svg: string,
  input: z.infer<typeof inputSchema>,
): string {
  const additions: string[] = [];

  if (!/<title\b/iu.test(svg)) {
    additions.push(`<title>${escapeXml(svgTitle(input.filename))}</title>`);
  }

  if (!/<desc\b/iu.test(svg)) {
    additions.push(`<desc>${escapeXml(svgDescription(input))}</desc>`);
  }

  if (additions.length === 0) {
    return svg;
  }

  return svg.replace(/<svg\b[^>]*>/iu, (openingTag) =>
    [openingTag, ...additions].join("\n"),
  );
}

function svgTitle(filename: string): string {
  return filename
    .replace(/\.svg$/iu, "")
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ");
}

function svgDescription(input: z.infer<typeof inputSchema>): string {
  return `Brand-aligned ${input.assetType} for ${input.filename}.`;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function preview(value: string): string {
  if (value.length <= RESPONSE_PREVIEW_LENGTH) {
    return value;
  }

  return value.slice(0, RESPONSE_PREVIEW_LENGTH);
}
