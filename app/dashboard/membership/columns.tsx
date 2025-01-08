"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Membership } from "@/lib/api/types";
import { format } from "date-fns";
import { MemberForm } from "@/components/membership/member-form";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Membership>[] = [
  {
    accessorKey: "email",
    accessorFn: ({ member }) => member.email,
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rôle",
  },
  {
    accessorKey: "added_at",
    accessorFn: ({ added_at }) => format(added_at, "P"),
    header: "Date d'ajout",
  },
  {
    accessorKey: "is_active",
    header: "Statut",
    cell: ({
      row: {
        original: { is_active },
      },
    }) => {
      return is_active ? (
        <Badge variant="success">Activé</Badge>
      ) : (
        <Badge variant={"secondary"}>Désactivé</Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row: { original } }) => {
      return <MemberForm initialData={original} />;
    },
  },
];
