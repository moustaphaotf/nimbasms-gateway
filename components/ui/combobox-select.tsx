"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export interface SortOption {
  label: string;
  value: string;
}

interface ComboBoxProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SortOption[];
  placeholder?: string;
  className?: string;
  emptyText?: string;
}

export function ComboBox({
  value,
  onValueChange,
  options,
  placeholder = "Sélectionnez une option",
  className,
}: ComboBoxProps) {
  return (
    <div className="relative max-w-xs">
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
      {value && (
        <button
          onClick={() => {
            onValueChange("");
          }}
          className="absolute right-8 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
