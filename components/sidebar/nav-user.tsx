"use client";

import { ChevronsUpDown, Edit2, User2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useProfileInfo } from "@/hooks/api/use-auth";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { useState } from "react";
import { LogoutButton } from "../auth/logout-button";
import { PROTECTED_ROUTES } from "@/lib/constants";
import { useUser } from "@/providers/user-provider";

export function NavUser() {
  const { isMobile } = useSidebar();

  const { data, isLoading } = useProfileInfo();
  const [isHoverUserIcon, setIsHoveringUserIcon] = useState(false);
  const { user } = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {isLoading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Link
                  onMouseEnter={() => setIsHoveringUserIcon(true)}
                  onMouseLeave={() => setIsHoveringUserIcon(false)}
                  href={PROTECTED_ROUTES.PROFILE.url}
                >
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarFallback className="rounded-lg">
                      {isHoverUserIcon ? <Edit2 /> : <User2 />}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data?.first_name} {data?.last_name}
                  </span>
                  <span className="truncate text-xs">{data?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Link
                    onMouseEnter={() => setIsHoveringUserIcon(true)}
                    onMouseLeave={() => setIsHoveringUserIcon(false)}
                    href={PROTECTED_ROUTES.PROFILE.url}
                  >
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarFallback className="rounded-lg">
                        {isHoverUserIcon ? <Edit2 /> : <User2 />}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {data?.first_name} {data?.last_name}
                    </span>
                    <span className="truncate text-xs">{data?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user && user?.organizations.length > 0 ? (
                <DropdownMenuItem asChild>
                  <Link href={PROTECTED_ROUTES.DASHBOARD.url + '?change-organization'}>
                    Changer d&apos;organisation
                  </Link>
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
