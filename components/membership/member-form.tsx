import { Membership } from "@/lib/api/types";
import React from "react";
import {
  FormDialog,
  useFormDialog,
  withFormDialogProvider,
} from "../ui/form-dialog";
import { FormWrapper } from "../ui/form-wrapper";
import { Button } from "../ui/button";
import { Edit2, PlusIcon } from "lucide-react";
import {
  createMembershipSchema,
  MembershipFormData,
} from "@/lib/schemas/membership.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangeMemberRole, useCreateMember } from "@/hooks/api/use-members";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ComboBox } from "../ui/combobox";

export const MemberForm = withFormDialogProvider(
  ({ initialData }: { initialData?: Membership }) => {
    const { setOpen } = useFormDialog();
    const form = useForm<MembershipFormData>({
      resolver: zodResolver(createMembershipSchema),
      defaultValues: {
        new_member_email: initialData?.member?.email || "",
        role: initialData?.role || "Member",
      },
    });

    const { mutateAsync: createMember, isPending: isCreating } =
      useCreateMember();
    const { mutateAsync: updateMember, isPending: isUpdating } =
      useChangeMemberRole();

    const isPending = isUpdating || isCreating;

    const handleSubmit = async (values: MembershipFormData) => {
      try {
        if (initialData) {
          await updateMember({ id: initialData.uid, role: values.role });
        } else {
          await createMember(values);
        }
        setOpen(false);
      } catch (error) {}
    };

    const role = form.watch("role");

    return (
      <FormDialog
        title={initialData ? "Modifier le rôle" : "Ajouter un membre"}
        trigger={
          initialData ? (
            <Button variant={"secondary"} size={"icon"}>
              <Edit2 className="w-4 h-4" />
            </Button>
          ) : (
            <Button>
              <PlusIcon className="w-4 h-4" />
              Ajouter un membre
            </Button>
          )
        }
      >
        <FormWrapper isLoading={isPending} form={form} onSubmit={handleSubmit}>
          {!initialData && (
            <FormField
              control={form.control}
              name="new_member_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rôle de l&apos;utilisateur</FormLabel>

                <ComboBox
                  value={role}
                  onChange={(value) => field.onChange(value)}
                  options={[
                    { value: "Member", label: "Membre" },
                    { value: "Developer", label: "Développeur" },
                    { value: "Owner", label: "Propriétaire" },
                  ]}
                  placeholder="Sélectionnez le rôle du membre"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormWrapper>
      </FormDialog>
    );
  }
);
