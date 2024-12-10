"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateMessage } from "@/hooks/api/use-messages";
import { useSenders } from "@/hooks/api/use-senders";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInputField } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CreateMessageFormData,
  createMessageSchema,
} from "@/lib/schemas/message.shema";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { MessageSquarePlus } from "lucide-react";

interface CreateMessageDialogProps {}

export function CreateMessageDialog({}: CreateMessageDialogProps) {
  const [open, setOpen] = useState(false);

  const createMessage = useCreateMessage();
  const { data: senders, isLoading: isLoadingSenders } = useSenders({
    status: "accepted",
  });

  const form = useForm<CreateMessageFormData>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      sender: "",
      message: "",
      contact: "",
    },
  });

  const onSubmit = (data: CreateMessageFormData) => {
    form.clearErrors();

    createMessage.mutate(data, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
      onError: (error: any) => {
        if (error.response?.data) {
          Object.entries(error.response.data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              form.setError(key as keyof CreateMessageFormData, {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          Nouveau message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Envoyer un message</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire pour envoyer un nouveau message SMS
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="sender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d&apos;expéditeur</FormLabel>
                  <FormControl>
                    {isLoadingSenders ? (
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un expéditeur" />
                        </SelectTrigger>
                        <SelectContent>
                          {senders?.results.map((sender) => (
                            <SelectItem key={sender.uid} value={sender.name}>
                              {sender.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Votre message..."
                      maxLength={160}
                      className="resize-none"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <PhoneInputField
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      error={!!form.formState.errors.contact}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={createMessage.isPending || isLoadingSenders}
              >
                {createMessage.isPending ? "Envoi en cours..." : "Envoyer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
