import { z } from "zod";

export const MEMBER_ROLES = {
  Member: "Membre",
  Developer: "Développeur",
  Owner: "Propriétaire",
};

export const createMembershipSchema = z.object({
  new_member_email: z.string().min(1, "L'email de l'utilisateur est requis"),
  role: z.enum(["Developer", "Member", "Owner"]),
});

export type MembershipFormData = z.infer<typeof createMembershipSchema>;
