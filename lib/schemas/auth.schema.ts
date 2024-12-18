import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'adresse email est requise")
    .email("Format d'email invalide"),
});

export const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  first_name: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères"),
  last_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(1, "Le numéro de téléphone est obligatoire"),
  company_name: z
    .string()
    .min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
