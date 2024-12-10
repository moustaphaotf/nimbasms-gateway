"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateWebhook } from "@/hooks/api/use-account";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { webhookSchema, WebhookFormData } from "@/lib/schemas/webhook.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface WebhookFormProps {
  initialWebhookUrl: string;
}

export function WebhookForm({ initialWebhookUrl }: WebhookFormProps) {
  const updateWebhook = useUpdateWebhook();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingWebhookUrl, setPendingWebhookUrl] = useState<string | null>(null);

  const form = useForm<WebhookFormData>({
    resolver: zodResolver(webhookSchema),
    defaultValues: {
      webhook_url: initialWebhookUrl,
    },
  });

  const handleSubmit = (data: WebhookFormData) => {
    setPendingWebhookUrl(data.webhook_url);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (pendingWebhookUrl !== null) {
      updateWebhook.mutate(pendingWebhookUrl, {
        onSuccess: () => {
          setShowConfirmation(false);
        },
        onError: (error: any) => {
          if (error.response?.data?.webhook_url) {
            form.setError("webhook_url", {
              type: "server",
              message: error.response.data.webhook_url[0],
            });
          }
          setShowConfirmation(false);
        },
      });
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Configuration Webhook</h2>
            <p className="text-sm text-muted-foreground">
              Recevez des notifications en temps réel sur votre endpoint
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="webhook_url"
                render={({ field }) => (
                  <FormItem>
                    <Label>URL du Webhook</Label>
                    <FormControl>
                      <Input
                        placeholder="https://votre-domaine.com/webhook"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit"
                disabled={updateWebhook.isPending}
              >
                {updateWebhook.isPending ? "Enregistrement en cours..." : "Sauvegarder les changements"}
              </Button>
            </form>
          </Form>
        </div>
      </Card>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la modification</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingWebhookUrl 
                ? "Êtes-vous sûr de vouloir modifier l'URL du webhook ? Cette action peut affecter la réception des notifications."
                : "Êtes-vous sûr de vouloir supprimer l'URL du webhook ? Vous ne recevrez plus de notifications."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}