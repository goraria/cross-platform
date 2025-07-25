"use client"

import React, { ComponentProps } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Layers2,
  Map,
  PieChart,
  Settings2,
  SquareLibrary,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/app/(dashboard)/manager/components/nav-main"
import { NavProjects } from "@/app/(dashboard)/manager/components/nav-projects"
import { NavUser } from "@/components/elements/nav-user"
// import { TeamSwitcher } from "@/app/(dashboard)/manager/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { appGlobal, managerSidebar } from "@/constants/constants";

// This is sample data.

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"> */}
                  {/* <Command className="size-4" /> */}
                {/* </div> */}
                <Image src="/logos/logo.png" alt={appGlobal.name} width={36} height={36} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{appGlobal.name}</span>
                  <span className="truncate text-xs">Manager</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={managerSidebar.navMain} />
        <NavProjects projects={managerSidebar.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={managerSidebar.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
