"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Export } from "@/lib/api/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const columns: ColumnDef<Export>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      return format(new Date(row.getValue("created_at")), "Pp", { locale: fr });
    },
  },
  {
    accessorKey: "report_type",
    header: "Type",
  },
  {
    accessorKey: "file_name",
    header: "Fichier",
  },
  {
    accessorKey: "file_size",
    header: "Taille",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { status, report_url } = row.original;

      if (["PENDING", "FAILED"].includes(status)) {
        return (
          <Badge variant={status === "FAILED" ? "destructive" : "secondary"}>
            {status === "FAILED" ? "Echoué" : "En cours"}
          </Badge>
        );
      }

      return (
        <Button
          variant="ghost"
          size="sm"
          disabled={status !== "SUCCESS"}
          asChild
        >
          <a href={report_url} target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </a>
        </Button>
      );
    },
  },
];
