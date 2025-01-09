"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CompanyUsage } from "@/lib/api/types/statistics";

export const columns: ColumnDef<CompanyUsage>[] = [
  {
    accessorKey: "owner",
    header: "Client",
    cell: ({
      row: {
        original: { owner__company_name, owner__email },
      },
    }) => {
      return (
        <span className="flex flex-col text-xs text-muted-foreground">
          <span>{owner__email}</span>
          <span className="font-semibold">{owner__company_name}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "message_count_delivered",
    header: "Reçu",
  },
  {
    accessorKey: "message_count_sent",
    header: "Inconnu",
  },
  {
    accessorKey: "message_count_failure",
    header: "Echec",
  },

  {
    accessorKey: "total",
    header: "Total",
    accessorFn: ({
      message_count_delivered,
      message_count_sent,
      message_count_failure,
    }) => message_count_delivered + message_count_failure + message_count_sent,
  },
];
