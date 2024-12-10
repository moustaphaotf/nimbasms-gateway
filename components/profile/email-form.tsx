"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, EmailFormData } from "@/lib/schemas/profile.schema";
import { useUpdateProfile } from "@/hooks/api/use-auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";

interface EmailFormProps {
  initialEmail: string;
}

export function EmailForm({ initialEmail }: EmailFormProps) {
  const updateProfile = useUpdateProfile();

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: initialEmail,
    },
  });

  useEffect(() => {
    form.reset({
      email: initialEmail,
    });
  }, [form, initialEmail]);

  const onSubmit = (data: EmailFormData) => {
    updateProfile.mutate(data, {
      onError: (error: any) => {
        if (error.response?.data) {
          Object.entries(error.response.data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              form.setError(key as keyof EmailFormData, {
                type: "server",
                message: value[0],
              });
            }
          });
        }
      },
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Email</h2>
          <p className="text-sm text-muted-foreground">
            Modifiez votre adresse email
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
