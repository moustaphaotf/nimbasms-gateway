import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService, UserFilters } from '@/lib/api/services/users.service';
import { CreateUserFormData } from '@/lib/schemas/user.schema';
import { toast } from 'sonner';

export function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => usersService.getUsers(filters),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: CreateUserFormData) => usersService.createUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Utilisateur créé avec succès');
    },
    onError: () => {
      toast.error('Erreur lors de la création de l\'utilisateur');
    },
  });
}