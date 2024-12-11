import { z } from "zod";

export const createExportSchema = z.object({
  sender_name: z
    .string()
    .optional(),
  start_date: z
    .string()
    .min(1, "La date de début est requise"),
  end_date: z
    .string()
    .min(1, "La date de fin est requise"),
});

export type CreateExportFormData = z.infer<typeof createExportSchema>;