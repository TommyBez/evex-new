import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description: "Submits a no-findings review for an innocuous PR diff.",
  async test(t) {
    await t.send(`
<github_context>
repository: example/widget
pull_request_number: 43
sender: maintainer
head_sha: def456
</github_context>

Pull request diff:

diff --git a/src/copy.ts b/src/copy.ts
@@
-export const emptyState = "No items";
+export const emptyState = "No matching items";

Review this diff and publish the PR review with submit_pr_review.
`);

    t.completed();
    t.calledTool("submit_pr_review");
    t.check(t.reply, includes("No actionable").soft());
  },
});
