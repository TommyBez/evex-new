import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "https://context-dev.stlmcp.com",
  description:
    "Context.dev hosted MCP for resolving brand data, scraping webpages, crawling sites, and extracting styleguides from domains. Use it to gather the brand, content, and design context needed before generating SEO HTML.",
  headers: {
    "x-context-dev-api-key": () =>
      process.env.CONTEXT_DEV_API_KEY ?? process.env.CONTEXT_API_KEY ?? "",
  },
  tools: {
    allow: ["search_docs", "execute"],
  },
});
