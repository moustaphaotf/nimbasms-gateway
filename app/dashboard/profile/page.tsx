"use client";

import { Card } from "@/components/ui/card";
import { NameForm } from "@/components/profile/name-form";
import { EmailForm } from "@/components/profile/email-form";
import { PhoneForm } from "@/components/profile/phone-form";
import { useAccountInfo } from "@/hooks/api/use-account";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfileInfo } from "@/hooks/api/use-auth";

export default function ProfilePage() {
  const { data: accountInfo, isLoading } = useProfileInfo();

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold">Mon Profil</h1>
        </header>
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
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">Mon Profil</h1>
      </header>

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