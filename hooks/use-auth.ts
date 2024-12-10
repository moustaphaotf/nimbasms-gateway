"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/lib/auth";
import { toast } from "sonner";

export function useAuth() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      router.push("/dashboard");
      toast.success("Connexion réussie");
    },
    onError: () => {
      toast.error("Email ou mot de passe incorrect");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    logout: auth.logout,
    isAuthenticated: auth.isAuthenticated,
  };
}