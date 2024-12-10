import { useQuery, useMutation } from '@tanstack/react-query';
import { messagesService } from '@/lib/api/services/messages.service';
import { MessageFilters } from '@/lib/api/types';
import { toast } from 'sonner';

export function useMessages(filters?: MessageFilters) {
  return useQuery({
    queryKey: ['messages', filters],
    queryFn: () => messagesService.getMessages(filters),
  });
}

export function useMessage(messageId: string) {
  return useQuery({
    queryKey: ['messages', messageId],
    queryFn: () => messagesService.getMessage(messageId),
  });
}

export function useRequestExport() {
  return useMutation({
    mutationFn: messagesService.requestExport,
    onSuccess: () => {
      toast.success('Export demandé avec succès. Vous recevrez un email une fois terminé.');
    },
    onError: () => {
      toast.error('Erreur lors de la demande d\'export');
    },
  });
}