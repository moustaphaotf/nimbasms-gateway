import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  phone: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .regex(/^\+?[0-9\s-]+$/, "Format de numéro invalide"),
  first_name: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  last_name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;