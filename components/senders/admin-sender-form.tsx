import { useForm } from "react-hook-form";
import {
  FormDialog,
  useFormDialog,
  withFormDialogProvider,
} from "../ui/form-dialog";
import { FormWrapper } from "../ui/form-wrapper";
import {
  adminCreateSenderSchema,
  CreateSenderFormData,
} from "@/lib/schemas/sender.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/providers/user-provider";
import { useUsers } from "@/hooks/api/use-users";
import { useCreateSender } from "@/hooks/api/use-senders";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ComboBox } from "../ui/combobox";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export const AdminSenderForm = withFormDialogProvider(() => {
  const { setOpen } = useFormDialog();
  const [search, setSearch] = useState("");

  const form = useForm<CreateSenderFormData>({
    resolver: zodResolver(adminCreateSenderSchema),
    defaultValues: {
      name: "",
      owner_uid: "",
      status: "pending",
    },
  });

  const { user } = useUser();
  const { mutate: createSender, isPending: isCreating } = useCreateSender();

  const { data, isLoading, isError } = useUsers(
    {
      search,
    },
    user !== null && user.isStaff
  );

  const handleSubmit = (data: CreateSenderFormData) => {
    // Clear any previous errors
    form.clearErrors();

    createSender(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
      onError: (error: any) => {
        if (error.response?.data) {
          // Set server-side errors using setError
          Object.entries(error.response.data).forEach(([key, value]) => {
            if (key === "sender") key = "name";
            if (Array.isArray(value)) {
              form.setError(key as keyof CreateSenderFormData, {
                type: "server",
                message: value[0],
              });
            }
          });
        }
      },
    });
  };

  let userList: { label: string; value: string }[] = [];

  if (!isError && !isLoading) {
    userList = data?.results?.map((item) => ({
      label: `${item.first_name} ${item.last_name} <${item.email}>`,
      value: item.uid,
    }))!;
  }

  if (user) {
    userList = userList?.filter((item) => item.value !== user.userId);
    userList?.unshift({
      label: `${user?.firstName} ${user?.lastName} <${user?.email}>`,
      value: user?.userId,
    });
  }

  return (
    <FormDialog
      title="Ajouter un nom d'expéditeur"
      trigger={
        <Button>
          <Plus className="w-4 h-4" /> Ajouter un nom d&apos;expéditeur
        </Button>
      }
    >
      <FormWrapper
        form={form}
        onSubmit={handleSubmit}
        submitText="Créer le nom d'expéditeur"
        loadingText="Création en cours..."
        isLoading={isCreating}
      >
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Vous devez approuver le nom d&#39;expéditeur avant qu&apos;il ne
            soit utilisable.
          </p>
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d&apos;expéditeur</FormLabel>
                <FormControl>
                  <Input placeholder="Entrez le nom d'expéditeur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {user?.isStaff && (
            <>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut du nom d&apos;expéditeur</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="accepted">Approuvé</SelectItem>
                          <SelectItem value="refused">Rejeté</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="owner_uid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Propriétaire du nom d&apos;expéditeur</FormLabel>
                    <FormControl>
                      <ComboBox
                        value={field.value}
                        options={userList}
                        onChange={(value) => field.onChange(value)}
                        placeholder="Sélectionner un utilisateur"
                        searchPlaceholder="Réchercher un email..."
                        onSearch={(value) => setSearch(value)}
                        isLoading={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
      </FormWrapper>
    </FormDialog>
  );
});
