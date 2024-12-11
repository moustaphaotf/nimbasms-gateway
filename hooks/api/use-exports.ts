import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { exportsService } from "@/lib/api/services";
import { ExportFilters } from "@/lib/api/types";
import { toast } from "react-toastify";

export function useExports(filters?: ExportFilters) {
  return useQuery({
    queryKey: ["exports", filters],
    queryFn: () => exportsService.getExports(filters),
    placeholderData: keepPreviousData,
  });
}

export function useCreateExport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exportsService.createExport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exports"] });
      toast.success("La requête d'exportation créé avec succès");
      toast.success(
        "Vous serez notifié par email dès que le processus sera terminé!"
      );
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi de la requête d'exportation");
    },
  });
}
