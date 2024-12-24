"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandLoading } from "cmdk";

type ComboBoxOption = {
  value: string;
  label: string;
};

type ComboBoxProps = {
  options: ComboBoxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  isLoading?: boolean;
};

export function ComboBox({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  className,
  buttonClassName,
  searchPlaceholder = "Search...",
  onSearch,
  isLoading,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(searchQuery);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", buttonClassName)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full p-0", className)}>
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={setSearchQuery}
            placeholder={searchPlaceholder}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {isLoading && (
                <CommandLoading className="p-4">
                  Chargement en cours...
                </CommandLoading>
              )}
              {!isLoading &&
                options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
