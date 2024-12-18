"use client";

import { useState } from "react";
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
import { Setup2FA } from "./setup-2fa";
import { AuthStep, CheckUserResponse } from "@/lib/api/types";
import { RegisterFormData, registerSchema } from "@/lib/schemas/auth.schema";
import { useRegisterUser } from "@/hooks/api/use-auth";

export function RegisterDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<AuthStep>("request");
  const [requestOTPResponse, setRequestOTPResponse] =
    useState<CheckUserResponse>();

  const { mutate: registerUser, isPending: isRegistering } = useRegisterUser();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      company_name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    // Handle registration
    registerUser(values, {
      onSuccess: (response) => {
        setOpen(false);
      },
      onError: (error: any) => {
        if (error.response?.data) {
          // Set server-side errors using setError
          Object.entries(error.response.data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              form.setError(key as keyof RegisterFormData, {
                type: "server",
                message: value[0],
              });
            }
          });
        }
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Créer un compte</Button>
      </DialogTrigger>
      <DialogContent>
        {step === "request" && (
          <Form {...form}>
            <DialogHeader>
              <DialogTitle>Créer un compte</DialogTitle>
              <DialogDescription>
                Inscrivez-vous pour commencer à utiliser notre plateforme
                d&apos;administration SMS.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l&apos;entreprise</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isRegistering} type="submit" className="w-full">
                S&apos;inscrire
              </Button>
            </form>
          </Form>
        )}

        {step === "setup-2fa" && (
          <Setup2FA
            requestOTPResponse={requestOTPResponse!}
            setStep={setStep}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
