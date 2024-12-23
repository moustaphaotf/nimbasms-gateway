"use client";

import React, { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "../ui/file-upload";
import { Steps } from "../excel-importer/steps";
import { DataPreview } from "../excel-importer/data-preview";
import { ColumnMapping } from "../excel-importer/column-mapping";
import * as XLSX from "xlsx";
import { xlsx2json } from "@/lib/utils/xlsx-to-json";

interface UploadSMSProps {
  setOpen: (open: boolean) => void;
}

const availableOptions = [
  { label: "Contact", value: "contact" },
  { label: "Expéditeur", value: "sender" },
  { label: "Message", value: "message" },
];

export function UploadSMS({ setOpen }: UploadSMSProps) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<Record<string, number>>({});
  const [hasHeaderRow, setHasHeaderRow] = useState(false);

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      setFile(file);
      const data = await xlsx2json(file);
      setData(data);
      setStep(2);
    } catch (error: any) {
      console.error(error.message);
    }
  }, []);

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Steps currentStep={step} totalSteps={2} />
      {step === 1 && <FileUpload onFileUpload={handleFileUpload} />}
      {step === 2 && (
        <DataPreview
          data={data}
          file={file}
          availableOptions={availableOptions}
          mapping={mapping}
          setMapping={setMapping}
          hasHeaderRow={hasHeaderRow}
          setHasHeaderRow={setHasHeaderRow}
          onBack={handleBack}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}
