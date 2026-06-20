import { defineAgent } from "eve";

export default defineAgent({
  model: "openai/gpt-5.1-mini",
  modelContextWindowTokens: 400_000,
});
