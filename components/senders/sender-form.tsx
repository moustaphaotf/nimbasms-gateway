"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSenderSchema, CreateSenderFormData } from "@/lib/schemas/sender.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface SenderFormProps {
  onSubmit: (data: CreateSenderFormData) => void;
  isSubmitting: boolean;
}

export function SenderForm({ onSubmit, isSubmitting }: SenderFormProps) {
  const form = useForm<CreateSenderFormData>({
    resolver: zodResolver(createSenderSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (data: CreateSenderFormData) => {
    // Clear any previous errors
    form.clearErrors();

    try {
      onSubmit(data);
      form.reset();
    } catch (error: any) {
      if (error.response?.data) {
        // Set server-side errors using setError
        Object.entries(error.response.data).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            form.setError(key as keyof CreateSenderFormData, {
              type: "server",
              message: value[0],
            });
          }
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Ajouter un nom d&apos;expéditeur</h2>
          <p className="text-sm text-muted-foreground">
            Le nom d&apos;expéditeur doit être validé avant utilisation
          </p>
        </div>

        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Entrez le nom d'expéditeur"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </form>
    </Form>
  );
}