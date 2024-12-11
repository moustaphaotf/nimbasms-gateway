import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "@/lib/api/services";
import { toast } from "react-toastify";

export function useAccountInfo() {
  return useQuery({
    queryKey: ["account", "info"],
    queryFn: accountService.getInfo,
  });
}

export function useRegenerateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: accountService.regenerateApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "info"] });
      toast.success("Clé API régénérée avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la régénération de la clé API");
    },
  });
}

export function useUpdateWebhook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: accountService.updateWebhook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", "info"] });
      toast.success("URL du webhook mise à jour avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du webhook");
    },
  });
}
