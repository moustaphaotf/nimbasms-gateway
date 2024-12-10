import { useMutation } from '@tanstack/react-query';
import { authService } from '@/lib/api/services/auth.service';
import { ValidateOTPRequest, ChangePasswordRequest, CreateUserRequest } from '@/lib/api/types';
import { auth } from '@/lib/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useRequestEmailOTP() {
  return useMutation({
    mutationFn: authService.requestEmailOTP,
    onSuccess: () => {
      toast.success('Code de vérification envoyé par email');
    },
    onError: () => {
      toast.error('Erreur lors de l\'envoi du code');
    },
  });
}

export function useRequestMobileOTP() {
  return useMutation({
    mutationFn: authService.requestMobileOTP,
    onSuccess: () => {
      toast.success('Code de vérification envoyé par SMS');
    },
    onError: () => {
      toast.error('Erreur lors de l\'envoi du code');
    },
  });
}

export function useValidateEmailOTP() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ValidateOTPRequest) => authService.validateEmailOTP(payload),
    onSuccess: (data) => {
      auth.setTokens(data.access, data.refresh);
      router.push('/dashboard');
      toast.success('Connexion réussie');
    },
    onError: () => {
      toast.error('Code de vérification incorrect');
    },
  });
}

export function useValidateMobileOTP() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ValidateOTPRequest) => authService.validateMobileOTP(payload),
    onSuccess: (data) => {
      auth.setTokens(data.access, data.refresh);
      router.push('/dashboard');
      toast.success('Connexion réussie');
    },
    onError: () => {
      toast.error('Code de vérification incorrect');
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (passwords: ChangePasswordRequest) => authService.changePassword(passwords),
    onSuccess: () => {
      toast.success('Mot de passe changé avec succès');
    },
    onError: () => {
      toast.error('Erreur lors du changement de mot de passe');
    },
  });
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (user: CreateUserRequest) => authService.createUser(user),
    onSuccess: () => {
      toast.success('Utilisateur créé avec succès');
    },
    onError: () => {
      toast.error('Erreur lors de la création de l\'utilisateur');
    },
  });
}