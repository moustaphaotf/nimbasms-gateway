import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Format d'email invalide").optional().or(z.literal("")),
  phone: z.string().trim().min(1, "Le numéro de téléphone est requis").optional().or(z.literal("")),
}).superRefine((data, ctx) => {
  if (!data.email && !data.phone) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Email ou numéro de téléphone requis",
      path: ["email"]
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Email ou numéro de téléphone requis",
      path: ["phone"]
    });
  }
});

export type LoginFormData = z.infer<typeof loginSchema>;