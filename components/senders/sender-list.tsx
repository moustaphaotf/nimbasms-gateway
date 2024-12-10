"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sender, SenderStatus } from "@/lib/api/types";
import { useState } from "react";
import { UpdateStatusDialog } from "./update-status-dialog";
import { useUpdateSenderStatus } from "@/hooks/api/use-senders";

interface SenderListProps {
  senders: Sender[];
}

export function SenderList({ senders }: SenderListProps) {
  const [selectedSender, setSelectedSender] = useState<Sender | null>(null);
  const updateStatus = useUpdateSenderStatus();

  const getStatusBadge = (status: SenderStatus) => {
    switch (status) {
      case "accepted":
        return <Badge variant="success">Approuvé</Badge>;
      case "refused":
        return <Badge variant="destructive">Rejeté</Badge>;
      default:
        return <Badge variant="secondary">En attente</Badge>;
    }
  };

  const handleUpdateStatus = (status: SenderStatus) => {
    if (selectedSender) {
      updateStatus.mutate({
        senderId: selectedSender.uid,
        status: { status },
      });
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d&apos;ajout</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {senders.map((sender) => (
              <TableRow key={sender.uid}>
                <TableCell>{sender.name}</TableCell>
                <TableCell>{getStatusBadge(sender.status)}</TableCell>
                <TableCell>
                  {new Date(sender.added_at).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSender(sender)}
                  >
                    Modifier le statut
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UpdateStatusDialog
        sender={selectedSender}
        open={!!selectedSender}
        onOpenChange={(open) => !open && setSelectedSender(null)}
        onConfirm={handleUpdateStatus}
      />
    </>
  );
}