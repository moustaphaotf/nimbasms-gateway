"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateExport } from "@/hooks/api/use-exports";
import { useSenders } from "@/hooks/api/use-senders";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import {
  CreateExportFormData,
  createExportSchema,
} from "@/lib/schemas/export.schema";
import { useUser } from "@/providers/user-provider";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FileDown } from "lucide-react";

interface CreateExportDialogProps {}

export function CreateExportDialog({}: CreateExportDialogProps) {
  const createExport = useCreateExport();
  const { data: senders, isLoading: isLoadingSenders } = useSenders();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const { user } = useUser();
  const form = useForm<CreateExportFormData>({
    resolver: zodResolver(createExportSchema),
    defaultValues: {
      sender_name: "",
      start_date: "",
      end_date: "",
    },
  });

  const onSubmit = (data: CreateExportFormData) => {
    const exportData = {
      ...(data.sender_name && { sender_name: data.sender_name }),
      start_date: data.start_date,
      end_date: data.end_date,
    };

    createExport.mutate(exportData, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  // Update form when date range changes
  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from) {
      form.setValue("start_date", format(newDate.from, "yyyy-MM-dd"));
    }
    if (newDate?.to) {
      form.setValue("end_date", format(newDate.to, "yyyy-MM-dd"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FileDown className="mr-2 h-4 w-4" />
          Nouvelle exportation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer un export</DialogTitle>
          <DialogDescription>
            Sélectionnez les paramètres pour générer votre export
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormItem>
              <FormLabel>Période</FormLabel>
              <FormControl>
                <DatePickerWithRange date={date} setDate={handleDateChange} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="sender_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nom d&apos;expéditeur{" "}
                    <span className="text-muted-foregroundd">(optionnel)</span>
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un expéditeur" />
                      </SelectTrigger>
                      <SelectContent>
                        {senders?.results.map((sender) => (
                          <SelectItem key={sender.uid} value={sender.name}>
                            {sender.name}
                          </SelectItem>
                        ))}
                        {senders?.results?.length === 0 && (
                          <SelectItem value="NO_SENDER_ID" disabled>
                            {user?.isStaff
                              ? "Aucun nom d'expéditeur trouvé"
                              : "Vous n'avez pas de nom d'expéditeur"}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={createExport.isPending || isLoadingSenders}
              >
                {createExport.isPending
                  ? "Exportation en cours..."
                  : "Exporter les données"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
