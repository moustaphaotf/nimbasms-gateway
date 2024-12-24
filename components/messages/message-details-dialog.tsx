"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Message } from "@/lib/api/types/messages";
import { formatDate } from "date-fns";
import { useUser } from "@/providers/user-provider";

interface MessageDetailDialogProps {
  message: Message | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MessageDetailDialog({
  message,
  open,
  onOpenChange,
}: MessageDetailDialogProps) {
  const { user } = useUser();

  if (!message) return null;

  const getStatusBadge = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Badge variant="secondary">Envoyé</Badge>;
      case "failure":
        return <Badge variant="destructive">Échoué</Badge>;
      case "delivered":
        return <Badge variant="success">Reçu</Badge>;
      default:
        return <Badge variant="outline">En attente</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Détails du message</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Expéditeur</p>
              <p className="font-medium">{message.sender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Destinataire</p>
              <p className="font-medium">{message.contact}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date d&apos;envoi</p>
              <p className="font-medium">
                {message.sent_at ? formatDate(message.sent_at, "P HH:mm") : "-"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Longueur</p>
              <p className="font-medium">
                {message.message_len !== null
                  ? message.message_len + " SMS"
                  : "-"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Statut</p>
              <div className="mt-1">{getStatusBadge(message.status)}</div>
            </div>

            {user && user.isStaff ? (
              <div>
                <p className="text-sm text-muted-foreground">Utilisateur</p>
                <div className="mt-1 text-xs">{message.owner.email}</div>
                <div className="mt-1 text-xs">
                  {message.owner.first_name} {message.owner.last_name}
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Contenu</p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
