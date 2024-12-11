"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { createSortableHeader } from "@/components/ui/data-table/columns";
import { Message } from "@/lib/api/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { MessageDetailDialog } from "@/components/messages/message-details-dialog";
import { MessageActions } from "@/components/messages/messages-actions";

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      return format(new Date(row.getValue("created_at")), "Pp", { locale: fr });
    },
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string;
      return message.length > 50 ? `${message.substring(0, 50)}...` : message;
    },
  },
  {
    accessorKey: "contact",
    header: "Destinataire",
  },
  {
    accessorKey: "sender",
    header: "Expéditeur",
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "sent" || status === "delivered"
              ? "success"
              : status === "failure"
              ? "destructive"
              : "secondary"
          }
        >
          {status === "sent"
            ? "Envoyé"
            : status === "failure"
            ? "Échoué"
            : status === "delivered"
            ? "Livré"
            : "En attente"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <MessageActions message={row.original} />,
  }
];
