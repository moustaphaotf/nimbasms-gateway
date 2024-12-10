"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSchema, PhoneFormData } from "@/lib/schemas/profile.schema";
import { useUpdateProfile } from "@/hooks/api/use-auth";
import { PhoneInputField } from "@/components/ui/phone-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PhoneFormProps {
  initialPhone: string;
}

export function PhoneForm({ initialPhone }: PhoneFormProps) {
  const updateProfile = useUpdateProfile();

  const form = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone:initialPhone,
    },
  });

  const onSubmit = (data: PhoneFormData) => {
    updateProfile.mutate(data, {
      onError: (error: any) => {
        if (error.response?.data) {
          Object.entries(error.response.data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              form.setError(key as keyof PhoneFormData, {
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
          <h2 className="text-lg font-semibold">Téléphone</h2>
          <p className="text-sm text-muted-foreground">
            Modifiez votre numéro de téléphone
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <PhoneInputField
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      error={!!form.formState.errors.phone}
                    />
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
