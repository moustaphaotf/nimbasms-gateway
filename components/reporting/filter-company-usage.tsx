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
import { CompanyUsageFilters } from "@/lib/api/types/statistics";
import { ComboBox } from "../ui/combobox";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterCompanyUsageProps {}

export function FilterCompanyUsage({}: FilterCompanyUsageProps) {
  const createExport = useCreateExport();
  const { data: senders, isLoading: isLoadingSenders } = useSenders();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const { user } = useUser();

  const form = useForm<CompanyUsageFilters>({
    defaultValues: {
      end_date: "",
      sender: "",
      start_date: "",
    },
  });

  const onSubmit = (data: CompanyUsageFilters) => {
    const filters: Record<string, string> = {
      ...(data.sender && { sender: data.sender }),
      start_date: data.start_date!,
      end_date: data.end_date!,
    };

    queryClient.invalidateQueries({
      queryKey: ["reporting", filters],
    });

    const queryString = new URLSearchParams(filters).toString();
    router.push("?" + queryString);
    setOpen(false);
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
          Filtrer les données
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Filtrer les données</DialogTitle>
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
              name="sender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nom d&apos;expéditeur{" "}
                    <span className="text-muted-foregroundd">(optionnel)</span>
                  </FormLabel>
                  <FormControl>
                    <ComboBox
                      onChange={(value) => field.onChange(value)}
                      options={
                        senders?.results.map((item) => ({
                          value: item.uid,
                          label: item.name,
                        })) || []
                      }
                      value=""
                    />
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
                Filtrer les données
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
