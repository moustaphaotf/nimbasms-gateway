import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { sendersService } from "@/lib/api/services";
import {
  CreateSenderRequest,
  SenderFilters,
  UpdateSenderStatusRequest,
} from "@/lib/api/types";
import { toast } from "react-toastify";

export function useSenders(filters?: SenderFilters) {
  return useQuery({
    queryKey: ['senders', filters],
    queryFn: () => sendersService.getSenders(filters),
    placeholderData: keepPreviousData,
  });
}

export function useCreateSender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sender: CreateSenderRequest) =>
      sendersService.createSender(sender),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["senders"] });
      toast.success("Nom d'expéditeur créé avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la création du nom d'expéditeur");
    },
  });
}

export function useUpdateSenderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      senderId,
      status,
    }: {
      senderId: string;
      status: UpdateSenderStatusRequest;
    }) => sendersService.updateStatus(senderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["senders"] });
      toast.success("Statut du nom d'expéditeur mis à jour avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du statut");
    },
  });
}
