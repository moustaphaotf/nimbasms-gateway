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
import { Sender, SenderStatus } from "@/lib/api/types";

interface UpdateStatusDialogProps {
  sender: Sender | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (status: SenderStatus) => void;
}

export function UpdateStatusDialog({
  sender,
  open,
  onOpenChange,
  onConfirm,
}: UpdateStatusDialogProps) {
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
    onConfirm(status);
    setShowConfirmation(false);
    onOpenChange(false);
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

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Button variant="outline" onClick={() => onOpenChange(false)}>
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
            <AlertDialogAction onClick={handleConfirmationConfirm}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
