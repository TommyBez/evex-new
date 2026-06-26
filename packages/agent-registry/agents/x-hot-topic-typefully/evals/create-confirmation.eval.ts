import { defineEval } from "eve/evals";
import { equals, includes } from "eve/evals/expect";

export default defineEval({
  description:
    "Confirms the create path requires confirmCreate=true and a stable, unique idempotencyKey per draft, and does not create when the flag is omitted.",
  async test(t) {
    const turn = await t.send(`
The three X draft candidates have been previewed with preview_x_draft and the user has approved creating them in Typefully for today (2026-06-26).

Now create the drafts with create_x_drafts. Use today's date and the candidate index to build a stable, unique idempotencyKey per draft such as x-hot-topic-typefully-2026-06-26-1, x-hot-topic-typefully-2026-06-26-2, and x-hot-topic-typefully-2026-06-26-3. Set confirmCreate=true. If you would otherwise create without confirmCreate=true, do not create and report that confirmation is required instead.
`);

    const call = turn.requireToolCall("create_x_drafts");
    t.check(call.input.confirmCreate, equals(true).gate());
    const drafts = call.input.drafts as readonly { idempotencyKey?: string }[];
    t.check(drafts.length === 3, equals(true).gate());
    const keys = new Set<string>();
    let allKeysUnique = true;
    for (const draft of drafts) {
      const key = draft.idempotencyKey;
      if (typeof key !== "string" || key.length === 0 || keys.has(key)) {
        allKeysUnique = false;
      }
      keys.add(key ?? "");
    }
    t.check(allKeysUnique, equals(true).gate());
    t.check(call.input.socialSetId === undefined, equals(true).soft());
    t.check(call.input.tag === undefined, equals(true).soft());
    t.check(t.reply, includes("x-hot-topic-typefully-2026-06-26-1").soft());
  },
});
