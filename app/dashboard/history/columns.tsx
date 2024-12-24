"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Message } from "@/lib/api/types";
import { MessageActions } from "@/components/messages/messages-actions";

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({
      row: {
        original: { created_at },
      },
    }) => {
      return (
        <span className="flex flex-col text-xs text-muted-foreground">
          <span className="whitespace-nowrap">{format(created_at, "PP", { locale: fr })}</span>
          <span>{format(created_at, "p", { locale: fr })}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "owner",
    header: "Utilisateur",
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
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string;
      return message.length > 50 ? `${message.substring(0, 50)}...` : message;
    },
  },
  {
    accessorKey: "message_len",
    header: "Longueur",
    accessorFn: ({ message_len }) =>
      message_len !== null ? message_len + " SMS" : "-",
  },
  {
    accessorKey: "contact",
    header: "Destinataire",
    cell: ({
      row: {
        original: { contact },
      },
    }) => <span className="text-xs whitespace-nowrap">{contact} </span>,
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
            status === "sent"
              ? "secondary"
              : status === "delivered"
              ? "success"
              : status === "failure"
              ? "destructive"
              : "outline"
          }
        >
          {status === "sent"
            ? "Envoyé"
            : status === "failure"
            ? "Échoué"
            : status === "delivered"
            ? "Reçu"
            : "En attente"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <MessageActions message={row.original} />,
  },
];
