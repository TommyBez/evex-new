import { defineAgent } from "eve";

export default defineAgent({
  description: "Reconstruct an incident timeline, highlight evidence gaps, and return only the factual sequence needed by the parent.",
  model: "openai/gpt-5.1",
  modelContextWindowTokens: 400_000,
});
