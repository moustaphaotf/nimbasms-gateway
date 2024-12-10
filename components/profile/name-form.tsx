"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameSchema, NameFormData } from "@/lib/schemas/profile.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateProfile } from "@/hooks/api/use-auth";

interface NameFormProps {
  initialFirstName: string;
  initialLastName: string;
}

export function NameForm({ initialFirstName, initialLastName }: NameFormProps) {
  const updateProfile = useUpdateProfile();

  const form = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      first_name: initialFirstName,
      last_name: initialLastName,
    },
  });

  const onSubmit = (data: NameFormData) => {
    updateProfile.mutate(data, {
      onError: (error: any) => {
        if (error.response?.data) {
          Object.entries(error.response.data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              form.setError(key as keyof NameFormData, {
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
          <h2 className="text-lg font-semibold">Informations personnelles</h2>
          <p className="text-sm text-muted-foreground">
            Modifiez vos informations personnelles
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
