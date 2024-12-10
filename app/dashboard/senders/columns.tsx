"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sender, SenderResponse, SenderStatus } from "@/lib/api/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { createSortableHeader } from "@/components/ui/data-table/columns";
import { useState } from "react";
import { UpdateStatusDialog } from "@/components/senders/update-status-dialog";
import { useUpdateSenderStatus } from "@/hooks/api/use-senders";

export const columns: ColumnDef<SenderResponse>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "owner",
    header: "Propriétaire",
    cell: ({
      row: {
        original: { owner },
      },
    }) => {
      return (
        <span className="flex flex-col text-xs text-muted-foreground">
          <span>{owner.email}</span>
          <span className="font-semibold">
            {owner.first_name} {owner.last_name}
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as SenderStatus;
      return (
        <Badge
          variant={
            status === "accepted"
              ? "success"
              : status === "refused"
              ? "destructive"
              : "secondary"
          }
        >
          {status === "accepted"
            ? "Approuvé"
            : status === "refused"
            ? "Rejeté"
            : "En attente"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "added_at",
    header: "Date d'ajout",
    cell: ({ row }) => {
      return format(new Date(row.getValue("added_at")), "Pp", { locale: fr });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sender = row.original;
      //   const [showUpdateStatus, setShowUpdateStatus] = useState(false);
      //   const updateStatus = useUpdateSenderStatus();

      //   const handleUpdateStatus = (status: Sender["status"]) => {
      //     updateStatus.mutate({
      //       senderId: sender.uid,
      //       status: { status },
      //     });
      //   };

      return (
        <>
          <Button
            variant="outline"
            size="sm"
            // onClick={() => setShowUpdateStatus(true)}
          >
            Modifier le statut
          </Button>

          {/* <UpdateStatusDialog
            sender={sender}
            open={showUpdateStatus}
            onOpenChange={setShowUpdateStatus}
            onConfirm={handleUpdateStatus}
          /> */}
        </>
      );
    },
  },
];
