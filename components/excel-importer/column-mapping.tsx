import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ColumnMappingProps {
  data: any[];
  hasHeaderRow: boolean;
  availableOptions: string[];
  mapping: Record<string, number>;
  setMapping: (mapping: Record<string, number>) => void;
  onBack: () => void;
}

export function ColumnMapping({
  data,
  hasHeaderRow,
  availableOptions,
  mapping,
  setMapping,
  onBack,
}: ColumnMappingProps) {
  const headers = Object.keys(data[0] || {});

  const handleMappingChange = (columnIndex: number, value: string) => {
    setMapping({ ...mapping, [value]: columnIndex });
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}></TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>
                {hasHeaderRow ? data[0][header] : `Colonne ${index + 1}`}
              </TableCell>
            ))}
          </TableRow>
          {(hasHeaderRow ? data.slice(1, 3) : data.slice(0, 2)).map(
            (row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex}>{row[header]}</TableCell>
                ))}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-start">
        <Button onClick={onBack}>Retour</Button>
      </div>
    </div>
  );
}
