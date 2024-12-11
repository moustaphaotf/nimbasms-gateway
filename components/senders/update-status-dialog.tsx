"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Button } from "@/components/ui/button";
import { Sender, SenderResponse, SenderStatus } from "@/lib/api/types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useUpdateSenderStatus } from "@/hooks/api/use-senders";

interface UpdateStatusDialogProps {
  sender: SenderResponse | null;
}

export function UpdateStatusDialog({
  sender,
}: UpdateStatusDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<SenderStatus>(
    sender?.status || "pending"
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleStatusChange = (value: string) => {
    setStatus(value as SenderStatus);
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handleConfirmationConfirm = () => {
    handleUpdateStatus(status);
    setShowConfirmation(false);
    setOpen(false);
  };

  const getStatusLabel = (status: SenderStatus) => {
    switch (status) {
      case "accepted":
        return "Approuvé";
      case "refused":
        return "Rejeté";
      default:
        return "En attente";
    }
  };

    const updateStatus = useUpdateSenderStatus();

    const handleUpdateStatus = (status: Sender["status"]) => {
      updateStatus.mutate({
        senderId: sender?.uid!,
        status: { status },
      });
    };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"} variant={"outline"}>
            Modifier le Statut
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le statut</DialogTitle>
            <DialogDescription>
              Choisissez le nouveau statut pour le nom d&apos;expéditeur &quot;
              {sender?.name}&quot;
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="accepted">Approuvé</SelectItem>
                <SelectItem value="refused">Rejeté</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleConfirm}>Confirmer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirmer le changement de statut
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir marquer le nom d&apos;expéditeur &quot;
              {sender?.name}&quot; comme {getStatusLabel(status)} ? Cette action
              ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction disabled={updateStatus.isPending} onClick={handleConfirmationConfirm}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
