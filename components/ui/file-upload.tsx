import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  return (
    <Card>
      <CardContent
        {...getRootProps()}
        className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-8 h-8 text-gray-400" />
        {isDragActive ? (
          <p className="mt-2 text-sm text-gray-500">
            Déposez le fichier ici ...
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            Glissez-déposez un fichier excel ou CSV ici ou cliquez pour en
            sélectionner un
          </p>
        )}
      </CardContent>
    </Card>
  );
}
