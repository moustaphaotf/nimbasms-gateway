import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/api/services";
import { ValidateOTPRequest, ChangePasswordRequest } from "@/lib/api/types";
import { auth } from "@/lib/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PROTECTED_ROUTES } from "@/lib/constants";

export function useRequestEmailOTP() {
  return useMutation({
    mutationFn: authService.requestEmailOTP,
    onSuccess: () => {
      toast.success("Code de vérification envoyé par email");
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi du code");
    },
  });
}

export function useRequestGoogleOTP() {
  return useMutation({
    mutationFn: authService.requestGoogleOTP,
    onSuccess: () => {
      // toast.success("");
    },
    onError: () => {
      toast.error("Erreur lors de la vérification de l'email");
    },
  });
}

export function useValidateEmailOTP() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ValidateOTPRequest) =>
      authService.validateEmailOTP(payload),
    onSuccess: (data) => {
      auth.setTokens(data.access, data.refresh);
      router.push(PROTECTED_ROUTES.DASHBOARD.url);
      toast.success("Connexion réussie");
    },
    onError: () => {
      toast.error("Code de vérification incorrect");
    },
  });
}

export function useValidateGoogleOTP() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ValidateOTPRequest) =>
      authService.validateGoogleOTP(payload),
    onSuccess: (data) => {
      auth.setTokens(data.access, data.refresh);
      router.push(PROTECTED_ROUTES.DASHBOARD.url);
      toast.success("Connexion réussie");
    },
    onError: () => {
      toast.error("Code de vérification incorrect");
    },
  });
}

export function useProfileInfo() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: authService.getProfileInfo,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profil mis à jour avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du profil");
    },
  });
}
