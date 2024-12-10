"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function createSortableHeader<TData>(
  header: string,
  accessorKey: string,
  className?: string
): ColumnDef<TData> {
  return {
    accessorKey,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={cn("-ml-4", className)}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {header}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  };
}