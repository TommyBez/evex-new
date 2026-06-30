import { defineTool, type ApprovalStatus } from "eve/tools";
import { bash } from "eve/tools/defaults";

const DEPLOY_COMMAND_PATTERN =
  /\b(?:eve\s+deploy|vercel\s+(?:deploy|--prod)|npx\s+vercel|pnpm\s+(?:dlx\s+)?vercel|npm\s+exec\s+vercel)\b|--prod\b/;

function deploymentApproval(input: Record<string, unknown>): ApprovalStatus {
  const command = typeof input.command === "string" ? input.command : "";

  if (DEPLOY_COMMAND_PATTERN.test(command)) {
    return "user-approval";
  }

  return "not-applicable";
}

export default defineTool({
  ...bash,
  approval: ({ toolInput }) => deploymentApproval(toolInput ?? {}),
});
