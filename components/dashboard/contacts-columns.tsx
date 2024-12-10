"use client";

import { ColumnDef } from "@tanstack/react-table";
import { createSortableHeader } from "@/components/ui/data-table/columns";

export type Contact = {
  name: string;
  phone: string;
  group: string;
};

export const columns: ColumnDef<Contact>[] = [
  createSortableHeader<Contact>("Prénom et Nom", "name"),
  createSortableHeader<Contact>("Numéro", "phone"),
  createSortableHeader<Contact>("Groupes", "group"),
];