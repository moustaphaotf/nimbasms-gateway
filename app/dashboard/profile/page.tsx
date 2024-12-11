"use client";

import { Card } from "@/components/ui/card";
import { NameForm } from "@/components/profile/name-form";
import { EmailForm } from "@/components/profile/email-form";
import { PhoneForm } from "@/components/profile/phone-form";
import { useAccountInfo } from "@/hooks/api/use-account";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfileInfo } from "@/hooks/api/use-auth";
import { PageHeader } from "@/components/layout/app-header";

export default function ProfilePage() {
  const { data: accountInfo, isLoading } = useProfileInfo();

  const breadcrumbs = [
    { label: "Tableau de bord", href: "/dashboard" },
    { label: "Profil" },
  ];

  const header = <PageHeader title="Mon Profil" breadcrumbs={breadcrumbs} />;

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        {header}
        <div className="space-y-4">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {header}

      <div className="space-y-6">
        <NameForm
          initialFirstName={accountInfo?.first_name || ""}
          initialLastName={accountInfo?.last_name || ""}
        />
        <EmailForm initialEmail={accountInfo?.email || ""} />
        <PhoneForm initialPhone={accountInfo?.phone || ""} />
      </div>
    </div>
  );
}
