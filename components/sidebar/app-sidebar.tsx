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
import { getUserRoutes } from "@/lib/constants";

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const { user } = useUser();
  const routes = getUserRoutes(user);
  const orgId = localStorage.getItem("orgId");

  const isDeveloper = user?.organizations.find(
    (item) => item.uid === orgId && item.role === "Developer"
  );
  const messageSender = user && !user.isStaff && !isDeveloper;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyLogo />
      </SidebarHeader>
      <SidebarContent>
        {messageSender && open ? <NavGetStarted /> : null}
        <NavMain items={routes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
