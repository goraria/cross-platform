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
import { appGlobal } from "@/constants/constants";

// This is sample data.
const data = {
  user: {
    name: "japtor",
    email: "japtor@gorth.org",
    avatar: "/avatars/waddles.jpeg",
  },
  teams: [
    {
      name: "Gorth Inc.",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Goraria Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Waddles Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Demo",
      url: "#",
      icon: Layers2,
      isActive: true,
      items: [
        {
          title: "Manage",
          url: "/manager",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Manager",
      url: "#",
      icon: SquareLibrary,
      isActive: true,
      items: [
        {
          title: "User",
          url: "/manager/user-management",
        },
        {
          title: "Product",
          url: "/manager/product-management",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

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
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
