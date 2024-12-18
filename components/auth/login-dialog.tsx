"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRequestGoogleOTP } from "@/hooks/api/use-auth";
import { AuthStep, CheckUserResponse } from "@/lib/api/types";
import { LoginFormData, loginSchema } from "@/lib/schemas/auth.schema";
import { Setup2FA } from "./setup-2fa";
import { OTPVerification } from "./otp-verification";

export function LoginDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<AuthStep>("request");
  const [requestOTPResponse, setRequestOTPResponse] =
    useState<CheckUserResponse>();

  const requestGoogleOTP = useRequestGoogleOTP();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      requestGoogleOTP.mutate(data.email, {
        onSuccess: (response) => {
          setRequestOTPResponse(response);

          if (!response.is_2fa_enabled) {
            setStep("setup-2fa");
          } else {
            setStep("verify");
          }
        },
        onError: (error: any) => {
          if (error.response?.data) {
            // Set server-side errors using setError
            Object.entries(error.response.data).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                form.setError(key as keyof LoginFormData, {
                  type: "server",
                  message: value[0],
                });
              }
            });
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    form.reset({ email: "" });
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Se connecter</Button>
      </DialogTrigger>
      <DialogContent>
        {step === "request" && (
          <>
            <DialogHeader>
              <DialogTitle>Connexion</DialogTitle>
              <DialogDescription>
                Connectez-vous à votre compte pour accéder à la plateforme
                d&apos;administration SMS.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="exemple@mtn.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={requestGoogleOTP.isPending}
                  type="submit"
                  className="w-full"
                >
                  Se connecter
                </Button>
              </form>
            </Form>
          </>
        )}

        {step === "setup-2fa" && (
          <Setup2FA
            requestOTPResponse={requestOTPResponse!}
            setStep={setStep}
          />
        )}

        {step === "verify" && (
          <OTPVerification
            requestOTPResponse={requestOTPResponse!}
            setStep={setStep}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
