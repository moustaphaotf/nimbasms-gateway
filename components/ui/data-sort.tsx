"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SortOption {
  label: string;
  value: string;
}

interface DataSortProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SortOption[];
  placeholder?: string;
  className?: string;
}

export function DataSort({
  value,
  onValueChange,
  options,
  placeholder = "Trier par...",
  className,
}: DataSortProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className || "w-[200px]"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}