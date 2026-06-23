import { defineSchedule } from "eve/schedules";

import slack from "../channels/slack.js";
import {
  getSlackChannelId,
  linearOperationsConfig,
} from "../lib/linear-operations-config.js";

const formatInitiatives = (): string =>
  linearOperationsConfig.coveredInitiatives
    .filter((initiative) => initiative.weeklyUpdateEnabled)
    .map((initiative) => initiative.idOrName)
    .join(", ");

export default defineSchedule({
  cron: linearOperationsConfig.schedules.weeklyInitiativeUpdates,
  async run({ receive, waitUntil, appAuth }) {
    const initiativeList = formatInitiatives();
    const channelId = getSlackChannelId("default");
    if (!initiativeList || !channelId) return;

    waitUntil(
      receive(slack, {
        auth: appAuth,
        target: { channelId },
        message: [
          "Create weekly Linear initiative updates for the explicitly configured initiatives only.",
          `Configured initiatives: ${initiativeList}.`,
          "For each initiative, analyze related issues, projects, recent completions, open work, blockers, risks, dependencies, pending decisions, scope changes, and recommended next steps.",
          'Write the final update directly to Linear with save_status_update({ type: "initiative" }).',
          "If Linear reports that roadmaps or initiatives are not enabled in this workspace, post a clear Slack error to this configured channel instead of producing a generic digest.",
        ].join("\n"),
      }),
    );
  },
});
