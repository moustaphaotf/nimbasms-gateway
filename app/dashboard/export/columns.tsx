"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Export } from "@/lib/api/types";
import { formatDate } from "date-fns";
import { filesize } from "filesize";

export const columns: ColumnDef<Export>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    accessorFn: ({ created_at }) => formatDate(created_at, "P H:mm"),
  },
  {
    accessorKey: "period",
    header: "Période",
    cell: ({
      row: {
        original: { start_date, end_date },
      },
    }) => (
      <span className="flex flex-col text-xs">
        <span className="text-muted">
          Du{" "}
          <span className="text-muted-foreground">
            {formatDate(start_date, "P")}
          </span>
        </span>
        <span className="text-muted">
          Au{" "}
          <span className="text-muted-foreground">
            {formatDate(end_date, "P")}
          </span>
        </span>
      </span>
    ),
  },
  {
    accessorKey: "report_type",
    header: "Type",
  },
  {
    accessorKey: "file_size",
    header: "Taille",
    accessorFn: ({ file_size }) =>
      file_size !== null ? filesize(file_size) : "-",
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
