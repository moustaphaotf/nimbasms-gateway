"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { SenderResponse, SenderStatus } from "@/lib/api/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { UpdateStatusDialog } from "@/components/senders/update-status-dialog";

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
      return format(new Date(row.getValue("added_at")), "PPp", { locale: fr });
    },
  },
  {
    id: "actions",
    cell: ({ row: { original } }) => <UpdateStatusDialog sender={original} />,
  },
];
