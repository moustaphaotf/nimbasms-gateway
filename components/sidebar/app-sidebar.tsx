"use client";

import * as React from "react";

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
import { useUser } from "@/providers/user-provider";
import { ADMIN_ROUTES, CLIENT_ROUTES } from "@/lib/constants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const { user } = useUser();

  const routes = user?.isStaff ? ADMIN_ROUTES : CLIENT_ROUTES;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyLogo />
      </SidebarHeader>
      <SidebarContent>
        {!user?.isStaff && open && <NavGetStarted />}
        <NavMain items={routes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
