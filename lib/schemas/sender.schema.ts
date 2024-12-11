import { z } from "zod";

export const createSenderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(11, "Le nom ne peut pas dépasser 11 caractères")
    .regex(/^[a-zA-Z0-9\s-_]+$/, "Le nom doit contenir uniquement lettres, chiffres, - et _"),
});

export type CreateSenderFormData = z.infer<typeof createSenderSchema>;