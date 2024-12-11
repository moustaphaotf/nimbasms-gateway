"use client";

import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserProvider } from "@/providers/user-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 w-full">{children}</main>
      </SidebarProvider>
    </UserProvider>
  );
}
