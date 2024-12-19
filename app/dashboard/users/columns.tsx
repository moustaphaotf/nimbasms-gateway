"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/lib/api/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { createSortableHeader } from "@/components/ui/data-table/columns";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "first_name",
    header: "Prénom",
  },
  {
    accessorKey: "last_name",
    header: "Nom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({}) => {
      return ;
    },
  },
];
