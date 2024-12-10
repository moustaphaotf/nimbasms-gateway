"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isVisible?: string;
  items?: NavItem[];
};

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubitems = item.items && item.items.length > 0;
          const isActive =
            pathname.startsWith(item.url) ||
            (hasSubitems &&
              item?.items!.some((subItem) => pathname.startsWith(subItem.url)));

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <>
                    {hasSubitems && (
                      <CollapsibleTrigger asChild>
                        <Link href={item.url}>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon className="w-4 h-4"/>}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </Link>
                      </CollapsibleTrigger>
                    )}

                    {!hasSubitems && (
                      <Link href={item.url}>
                        <SidebarMenuButton
                          isActive={isActive}
                          tooltip={item.title}
                        >
                          {item.icon && <item.icon className="w-4 h-4"/>}
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </Link>
                    )}
                  </>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
