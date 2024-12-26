"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateMessage,
  useSendGrouppedMessages,
} from "@/hooks/api/use-messages";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GrouppedMessageFormData,
  createGrouppedMessageSchema,
  createMessageSchema,
} from "@/lib/schemas/message.shema";

export function GroupMessagesForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const sendMessages = useSendGrouppedMessages();
  const { data: senders, isLoading: isLoadingSenders } = useSenders({
    status: "accepted",
  });

  const form = useForm<GrouppedMessageFormData>({
    resolver: zodResolver(createGrouppedMessageSchema),
    defaultValues: {
      sender: "",
      message: "",
      contacts: "",
    },
  });
  const onSubmit = (data: GrouppedMessageFormData) => {
    form.clearErrors();

    const contacts = data.contacts
      .trim()
      .split("\n")
      .map((contact) => contact.replace(/\s/g, ""))
      .filter((row) => row.length > 0);

    sendMessages.mutate(
      { ...data, contacts },
      {
        onSuccess: () => {
          form.reset();
          setOpen(false);
        },
        onError: (error: any) => {
          if (error.response?.data) {
            Object.entries(error.response.data).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                form.setError(key as keyof GrouppedMessageFormData, {
                  type: "server",
                  message: value[0],
                });
              }
            });
          }
        },
      }
    );
  };

  return (
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
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un expéditeur" />
                    </SelectTrigger>
                    <SelectContent>
                      {senders?.results.map((sender) => (
                        <SelectItem key={sender.uid} value={sender.name}>
                          {sender.name}
                        </SelectItem>
                      ))}

                      {senders?.results?.length === 0 && (
                        <SelectItem value="NO_SENDER_ID" disabled>
                          Vous n&apos;avez pas un nom d&apos;expéditeur actif
                        </SelectItem>
                      )}
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
          name="contacts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contacts</FormLabel>
              <p className="text-xs text-muted-foreground">
                Liste des contacts séparés par un saut de ligne...
              </p>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Liste des contacts"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={sendMessages.isPending || isLoadingSenders}
          >
            {sendMessages.isPending ? "Envoi en cours..." : "Envoyer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
