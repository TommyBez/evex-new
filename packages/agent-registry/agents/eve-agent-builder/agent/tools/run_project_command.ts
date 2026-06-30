import { defineTool } from "eve/tools";
import { z } from "zod";
import {
  inAppRoot,
  runSandboxCommand,
  toCliModelOutput,
} from "../lib/vercel-brokered-cli";

const commandPurpose = z.enum([
  "inspect",
  "install_dependencies",
  "typecheck",
  "lint",
  "build",
  "test",
  "smoke_test",
  "other",
]);

const inputSchema = z.object({
  appRoot: z
    .string()
    .min(1)
    .default(".")
    .describe("Workspace-relative app root where the command should run."),
  command: z.string().min(1).max(8000),
  purpose: commandPurpose,
  reason: z
    .string()
    .min(1)
    .max(1000)
    .describe("Why this command is needed for the current task."),
});

const BLOCKED_COMMANDS = [
  /\beve\s+(?:deploy|link)\b/i,
  /\beve\s+channels\s+add\b/i,
  /\bvercel(?:\s|$)/i,
  /\bnpx\s+vercel(?:\s|$)/i,
  /\bpnpm\s+(?:dlx\s+)?vercel(?:\s|$)/i,
  /\bnpm\s+exec\s+vercel(?:\s|$)/i,
] as const;

export default defineTool({
  description:
    "Run a normal project command in the sandbox for inspection, dependency install, typecheck, lint, build, test, or smoke testing. This tool rejects Eve deploy/link/channel setup and Vercel CLI commands; use the dedicated Eve or Vercel tools for those.",
  inputSchema,
  async execute(input, ctx) {
    assertAllowedProjectCommand(input.command);
    return await runSandboxCommand(
      ctx,
      inAppRoot(input.appRoot, input.command),
    );
  },
  toModelOutput: toCliModelOutput,
});

function assertAllowedProjectCommand(command: string): void {
  for (const blockedCommand of BLOCKED_COMMANDS) {
    if (blockedCommand.test(command)) {
      throw new Error(
        "Use run_eve_cli or run_vercel_cli for Eve channel setup, Eve deploy/link, and Vercel CLI commands.",
      );
    }
  }
}
