"use client";

import * as React from "react";
import {
  Building2,
  FileDown,
  History,
  Key,
  LayoutDashboard,
  MessageSquare,
  UserCircle2,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { CompanyLogo } from "./company-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavGetStarted } from "./get-started";

const data = {
  navMain: [
    {
      icon: LayoutDashboard,
      title: "Tableau de Bord",
      url: "/dashboard",
    },
    {
      icon: History,
      title: "Consommation",
      url: "/dashboard/history",
    },
    {
      icon: MessageSquare,
      title: "Noms d'expéditeur",
      url: "/dashboard/senders",
    },
    {
      icon: Key,
      title: "Clés API et webhooks",
      url: "/dashboard/api-keys",
    },
    {
      icon: FileDown,
      title: "Exportation de données",
      url: "/dashboard/export",
    },
    {
      icon: Building2,
      title: "Comptes Client",
      url: "/dashboard/users",
    },
    {
      icon: UserCircle2,
      title: "Mon Profile",
      url: "/dashboard/profile",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyLogo />
      </SidebarHeader>
      <SidebarContent>
        {open && <NavGetStarted />}
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
