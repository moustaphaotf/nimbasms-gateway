import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'adresse email est requise")
    .email("Format d'email invalide"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
