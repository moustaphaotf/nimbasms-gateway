import { z } from "zod";

export const createMessageSchema = z.object({
  sender: z
    .string()
    .min(1, "Le nom d'expéditeur est requis")
    .max(11, "Le nom d'expéditeur ne peut pas dépasser 11 caractères"),
  message: z
    .string()
    .min(1, "Le message est requis")
    .max(160, "Le message ne peut pas dépasser 160 caractères"),
  contact: z
    .string()
    .min(1, "Le numéro est requis")
    .regex(/^\+?[0-9\s-]+$/, "Format de numéro invalide"),
});

export type CreateMessageFormData = z.infer<typeof createMessageSchema>;