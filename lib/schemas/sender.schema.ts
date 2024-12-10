import { z } from "zod";

export const createSenderSchema = z.object({
  name: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(11, "Le nom ne peut pas dépasser 11 caractères")
    .regex(/^[a-zA-Z0-9]+$/, "Le nom ne peut contenir que des lettres et des chiffres"),
});

export type CreateSenderFormData = z.infer<typeof createSenderSchema>;