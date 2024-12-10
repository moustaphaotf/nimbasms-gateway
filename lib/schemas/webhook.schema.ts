import { z } from "zod";

export const webhookSchema = z.object({
  webhook_url: z
    .string()
    .trim()
    .url("L'URL doit être valide")
    .nullable()
    .or(z.literal(""))
    .transform(val => val === "" ? null : val),
});

export type WebhookFormData = z.infer<typeof webhookSchema>;