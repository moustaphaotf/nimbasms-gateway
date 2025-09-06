"use client";

import * as React from "react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import Image from "next/image";

export function CompanyLogo() {
  const { theme } = useTheme();
  
  // Détermine le logo à utiliser selon le thème
  const logoSrc = theme === "dark" ? "/logo.png" : "/logo-black.png";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Image
          src={logoSrc}
          alt={process.env.NEXT_PUBLIC_APP_NAME + " Logo"}
          width={60}
          height={30}
          priority
          className="mx-auto"
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
