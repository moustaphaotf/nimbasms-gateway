import {
  useQuery,
  useMutation,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import { messagesService } from "@/lib/api/services";
import { MessageFilters } from "@/lib/api/types";
import { toast } from "react-toastify";
import {
  CreateMessageFormData,
  UploadSendMessagesFormData,
} from "@/lib/schemas/message.shema";

export function useMessages(filters?: MessageFilters) {
  return useQuery({
    queryKey: ["messages", filters],
    queryFn: () => messagesService.getMessages(filters),
    placeholderData: keepPreviousData,
  });
}

export function useMessage(messageId: string) {
  return useQuery({
    queryKey: ["messages", messageId],
    queryFn: () => messagesService.getMessage(messageId),
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: CreateMessageFormData) =>
      messagesService.createMessage(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast.success("Message envoyé avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi du message");
    },
  });
}

export function useUploadSendMessages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UploadSendMessagesFormData) =>
      messagesService.uploadSendMessages(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast.info("L'envoi des messages est en cours...");
      toast.info("Vous serez notifié par email à la fin du processus", {
        delay: 2000,
      });
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi des messages");
    },
  });
}

export function useRequestExport() {
  return useMutation({
    mutationFn: messagesService.requestExport,
    onSuccess: () => {
      toast.success(
        "Export demandé avec succès. Vous recevrez un email une fois terminé."
      );
    },
    onError: () => {
      toast.error("Erreur lors de la demande d'export");
    },
  });
}
