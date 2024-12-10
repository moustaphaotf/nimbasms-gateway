"use client"

import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function CompanyLogo() {

  return (
    <SidebarMenu>
      <SidebarMenuItem >
        <Image 
          src="/mtn-logo.png" 
          alt="MTN Logo" 
          width={60} 
          height={30} 
          priority 
          className="mx-auto" 
        />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
