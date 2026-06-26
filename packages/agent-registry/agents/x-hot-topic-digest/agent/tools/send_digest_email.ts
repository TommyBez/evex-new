import { Resend } from "resend";
import { defineTool } from "eve/tools";
import { z } from "zod";

import { hotTopicConfig } from "../lib/hot-topic-config.js";

// Eve replays a tool step that did not complete. The Resend Idempotency-Key
// header makes a retried send safe, and this in-process map lets a replayed
// step return the recorded result instead of issuing a second send.
const sentKeys = new Map<string, unknown>();

const payloadSchema = z.object({
  from: z.email().optional(),
  to: z.array(z.email()).min(1).max(50).optional(),
  subject: z.string().min(1).optional(),
  html: z.string().min(1),
  confirmSend: z
    .boolean()
    .describe(
      "Must be true to send. Acts as an explicit guard against accidental sends.",
    ),
  idempotencyKey: z
    .string()
    .min(1)
    .max(255)
    .describe(
      "Stable unique key for this digest. Reused across retries of the same step so a replayed send does not duplicate the email.",
    ),
});

export default defineTool({
  description:
    "Send the X hot topic digest email through Resend. Requires an explicit confirmSend flag and a stable idempotencyKey so a replayed step never duplicates the email. Always call preview_digest_email first.",
  inputSchema: payloadSchema,
  async execute({ from, to, subject, html, confirmSend, idempotencyKey }) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { authRequired: true, missingEnv: "RESEND_API_KEY" };
    }

    if (!confirmSend) {
      return {
        notConfirmed: true,
        note: "confirmSend must be true to send. Call preview_digest_email to review the email first.",
      };
    }

    const resolvedFrom = from ?? hotTopicConfig.digest.from;
    if (!resolvedFrom) {
      return { notConfigured: true, missingEnv: "X_HOT_TOPIC_DIGEST_FROM" };
    }

    const resolvedTo = to?.length ? to : hotTopicConfig.digest.to;
    if (resolvedTo.length === 0) {
      return { notConfigured: true, missingEnv: "X_HOT_TOPIC_DIGEST_TO" };
    }

    const cached = sentKeys.get(idempotencyKey);
    if (cached) {
      return { replayed: true, idempotencyKey, result: cached };
    }

    const resend = new Resend(apiKey);
    const result = await resend.emails.send(
      {
        from: resolvedFrom,
        to: resolvedTo,
        subject: subject ?? hotTopicConfig.digest.subject,
        html,
      },
      { idempotencyKey },
    );

    sentKeys.set(idempotencyKey, result);
    return { sent: true, idempotencyKey, result };
  },
});
