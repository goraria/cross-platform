"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArchiveX, ChevronRight, File, Inbox, type LucideIcon, Send, Trash2 } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Japtor",
    email: "japtor@gorth.org",
    avatar: "/avatars/waddles.jpeg",
  },
  item: [
    {
      title: "Inbox",
      url: "/message",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Drafts",
      url: "/message/drafts",
      icon: File,
      isActive: false,
    },
    {
      title: "Sent",
      url: "/message/sent",
      icon: Send,
      isActive: false,
    },
    {
      title: "Junk",
      url: "/message/junk",
      icon: ArchiveX,
      isActive: false,
    },
    {
      title: "Trash",
      url: "/message/trash",
      icon: Trash2,
      isActive: false,
    },
  ],
}

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const [activeItem, setActiveItem] = useState(data.item[0])
  const { setOpen } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: subItem.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          // setActiveItem(subItem)
                          setOpen(true);
                        }}
                        isActive={activeItem?.title === item.title}
                        className="px-2.5 md:px-2"
                      >
                        <Link href={subItem.url}>
                          {/* {subItem.icon && <subItem.icon />} */}
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuButton>

                      {/*<SidebarMenuSubItem key={subItem.title}>*/}
                      {/*  <SidebarMenuSubButton asChild>*/}
                      {/*    <Link href={subItem.url}>*/}
                      {/*      <span>{subItem.title}</span>*/}
                      {/*    </Link>*/}
                      {/*  </SidebarMenuSubButton>*/}
                      {/*</SidebarMenuSubItem>*/}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
