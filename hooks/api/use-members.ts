import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { membersService } from "@/lib/api/services";
import { toast } from "react-toastify";
import { MembershipFilters } from "@/lib/api/types";
import { MembershipFormData } from "@/lib/schemas/membership.schema";

export function useMembers(
  filters?: MembershipFilters,
  shouldFetch: boolean = true
) {
  return useQuery({
    queryKey: ["members", filters],
    queryFn: () => membersService.getMembers(filters),
    placeholderData: keepPreviousData,
    enabled: !!shouldFetch,
  });
}

export function useCreateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: MembershipFormData) => membersService.createMember(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("L'invitation a été envoyée à l'adresse email indiquée");
    },
    onError: () => {
      toast.error("Erreur lors de la création de l'utilisateur");
    },
  });
}

export function useChangeMemberRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: membersService.changeRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Le rôle de l'utilisateur a été modifié avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la modification du rôle de l'utilisateur");
    },
  });
}
