import { connectSlackCredentials } from "@vercel/connect/eve";
import { defaultSlackAuth, loadThreadContextMessages, slackChannel } from "eve/channels/slack";

const SLACK_OPERATING_CONTEXT = [
  "Surface: Slack.",
  "Slack is intake, coordination, notification, and scheduled delivery.",
  "The final operational source of truth must live in Linear whenever work is created or changed.",
  "Before sensitive Linear changes, ask for approval in the originating Slack thread or move the final confirmation to Linear.",
].join("\n");

export default slackChannel({
  credentials: connectSlackCredentials(process.env.SLACK_CONNECT_UID ?? "slack/linear-operations-agent"),
  async onAppMention(ctx, message) {
    const auth = defaultSlackAuth(message, ctx);
    const priorMessages = await loadThreadContextMessages(ctx.thread, message, {
      since: "last-agent-reply",
    });

    const transcript = priorMessages
      .map((threadMessage) => `${threadMessage.isMe ? "agent" : (threadMessage.user ?? "user")}: ${threadMessage.markdown}`)
      .join("\n");

    return {
      auth,
      context: transcript
        ? [SLACK_OPERATING_CONTEXT, `Recent Slack thread context since the last agent reply:\n\n${transcript}`]
        : [SLACK_OPERATING_CONTEXT],
    };
  },
  onDirectMessage: (ctx, message) => ({
    auth: defaultSlackAuth(message, ctx),
    context: [SLACK_OPERATING_CONTEXT],
  }),
});
