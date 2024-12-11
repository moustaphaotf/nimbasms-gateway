"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";

interface PageHeaderProps {
  title: string;
  breadcrumbs: Array<{ label: string; href?: string; }>;
  children?: React.ReactNode;
}

export function PageHeader({ title, breadcrumbs, children }: PageHeaderProps) {

  return (
    <header className="border-b pb-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="space-y-1">
            <Breadcrumb items={breadcrumbs} />
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
}