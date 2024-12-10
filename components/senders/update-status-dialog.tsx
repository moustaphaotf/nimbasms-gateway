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
  const [status, setStatus] = useState<SenderStatus>(sender?.status || "pending");

  const handleConfirm = () => {
    onConfirm(status);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le statut</DialogTitle>
          <DialogDescription>
            Choisissez le nouveau statut pour le nom d&apos;expéditeur &quot;{sender?.name}&quot;
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Select value={status} onValueChange={(value) => setStatus(value as SenderStatus)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="approved">Approuvé</SelectItem>
              <SelectItem value="rejected">Rejeté</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleConfirm}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}