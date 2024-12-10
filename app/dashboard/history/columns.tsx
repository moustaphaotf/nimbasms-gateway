"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { createSortableHeader } from "@/components/ui/data-table/columns";

export type History = {
  id: string;
  date: string;
  message: string;
  recipients: number;
  status: "delivered" | "failed" | "pending";
  cost: number;
};

export const columns: ColumnDef<History>[] = [
  createSortableHeader<History>("Date", "date"),
  {
    accessorKey: "message",
    header: "Message",
  },
  createSortableHeader<History>("Destinataires", "recipients"),
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "delivered"
              ? "success"
              : status === "failed"
              ? "destructive"
              : "secondary"
          }
        >
          {status === "delivered"
            ? "Livré"
            : status === "failed"
            ? "Échoué"
            : "En attente"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "cost",
    header: "Coût",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"));
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
      }).format(amount);
    },
  },
];