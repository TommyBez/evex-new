import { defineAgent } from "eve";

export default defineAgent({
  model: "openai/gpt-5.1",
  modelContextWindowTokens: 400_000,
});
