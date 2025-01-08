"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/user-provider";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PROTECTED_ROUTES } from "@/lib/constants";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const OrganizationList: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user && user.organizations.length === 0) {
      router.push(PROTECTED_ROUTES.DASHBOARD.url);
    }
  }, [router, user]);

  const handleClick = (orgId: string) => {
    if (orgId !== "") {
      localStorage.setItem("orgId", orgId);
      toast.success("Bienvenue dans votre organization");
    } else {
      localStorage.removeItem("orgId");
    }
    queryClient.invalidateQueries()
    router.push(PROTECTED_ROUTES.DASHBOARD.url);
  };

  if (!user)
    <div className="space-y-4">
      <Skeleton className="w-64 h-8" />
      <ul className="space-y-2">
        {[...Array(4)].map((org, index) => (
          <Skeleton key={index} className="h-10 w-96" />
        ))}
      </ul>
    </div>;

  return (
    <div className="flex gap-4 flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold text-center text-foreground">
          Sélectionnez une organisation
        </h1>
        <ul className="space-y-2">
          <li>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => handleClick("")}
            >
              <span className="text-foreground block">Mon Compte</span>
              <span className="text-sm text-muted-foreground block">
                Propriétaire
              </span>
            </Button>
          </li>
          {user?.organizations.map((org) => (
            <li key={org.uid}>
              <Button
                variant="outline"
                className="w-full flex justify-between items-center p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => handleClick(org.uid)}
              >
                <span className="text-foreground block">
                  {org.company_name}
                </span>
                <span className="text-sm text-muted-foreground block">
                  {org.role}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrganizationList;
