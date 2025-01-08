import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserProvider } from "@/providers/user-provider";
import dynamic from "next/dynamic";

const AppSidebar = dynamic(
  () => import("../../components/sidebar/app-sidebar"),
  {
    ssr: false,
  }
);

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
