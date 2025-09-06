import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { X } from "lucide-react";
import { useSendUploadedMessages } from "@/hooks/api/use-messages";

interface DataPreviewProps {
  data: any[][];
  hasHeaderRow: boolean;
  setHasHeaderRow: (value: boolean) => void;
  availableOptions: { label: string; value: string }[];
  onBack: () => void;
  mapping: Record<string, number>;
  setMapping: (mapping: Record<string, number>) => void;
  file: File | null;
  setOpen: (open: boolean) => void;
}

export function DataPreview({
  data,
  file,
  hasHeaderRow,
  setHasHeaderRow,
  availableOptions,
  mapping,
  onBack,
  setMapping,
  setOpen,
}: DataPreviewProps) {
  const { mutate: sendMessages, isPending } = useSendUploadedMessages();

  const headers = hasHeaderRow
    ? data[0]
    : data[0].map((_, index) => `Colonne ${index + 1}`);
  const rows = hasHeaderRow ? data.slice(1) : data;

  const handleMappingChange = (columnIndex: number, value: string) => {
    setMapping({ ...mapping, [value]: columnIndex });
  };

  const isSubmitDisabled = () => {
    const selectedOptions = Object.values(mapping);
    return (
      selectedOptions.length !== availableOptions.length ||
      new Set(selectedOptions).size !== availableOptions.length
    );
  };

  const handleClearMapping = () => {
    setMapping({});
  };

  const handleSubmit = () => {
    sendMessages(
      { column_mapping: mapping, file },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-sm">
        Veuillez sélectionner les colonnes correspondant au nom
        d&apos;expéditeur au message et au contact du detinataire.
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasHeaderRow"
            checked={hasHeaderRow}
            onCheckedChange={(checked) => setHasHeaderRow(checked as boolean)}
          />
          <Label htmlFor="hasHeaderRow">
            La première ligne contient le nom des colonnes
          </Label>
        </div>

        <Button variant="outline" onClick={handleClearMapping}>
          <X className="w-4 h-4" /> Effacer
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] py-2"
                >
                  <div className="flex flex-col  space-y-2 py-2">
                    <Select
                      value={
                        Object.keys(mapping).find(
                          (key) => mapping[key] === index
                        ) || ""
                      }
                      onValueChange={(value) =>
                        handleMappingChange(index, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ignorer" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableOptions.map(({ label, value }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>{header}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.slice(0, 5).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell
                    className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] py-2"
                    key={cellIndex}
                  >
                    {cell && cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-end">
        <p>
          {rows.length} ligne{rows.length > 1 ? "s" : ""}{" "}
          {rows.length > 1 ? "ont au total" : "a"} été retrouvée
          {rows.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack}>Retour</Button>
        <Button
          disabled={isSubmitDisabled() || isPending}
          onClick={handleSubmit}
        >
          Envoyer
        </Button>
      </div>
    </div>
  );
}
