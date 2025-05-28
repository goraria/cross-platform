import React, { ReactNode } from "react"
import Link from "next/link"
import { AppSidebar } from "@/app/(dashboard)/manager/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/elements/mode-toggle"
import { appGlobal } from "@/constants/constants";

export default function DashboardLayout({ children }: { children: ReactNode } ) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <header className="flex h-16 shrink-0 border-b items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"> */}
        <header className="flex h-14 shrink-0 border-b items-center gap-2 ease-linear">
          {/* <div className="flex items-center gap-2 px-4"> */}
          <div className="container flex h-14 items-center gap-2 md:gap-4 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href="/">
                      {appGlobal.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle
            className="px-4 ml-auto"
          />
        </header>
        {children}
        <footer className="border-grid border-t py-0">
          <div className="mx-auto p-4">
            <div className="text-balance text-left text-sm leading-loose">{/* text-muted-foreground text-center */}
              Copyright © 2020 - {new Date().getFullYear()} Gorth Inc. All rights reserved.
            </div>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
