"use client";

import React, { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AppSidebar } from "@/app/(dashboard)/settings/components/app-sidebar"
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

const settingsRoutes = {
  "/settings": "General",
  "/settings/information": "Information",
  "/settings/billing": "Billing",
  "/settings/limits": "Limits",
  "/settings/connections": "Connections",
  "/settings/security": "Security",
  "/settings/notifications": "Notifications",
  "/settings/appearance": "Appearance",
  "/settings/integrations": "Integrations",
  "/settings/api": "API",
} as const;

export default function SettingsLayout({ children }: { children: ReactNode } ) {
  const pathname = usePathname();
  const currentRoute = settingsRoutes[pathname as keyof typeof settingsRoutes];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 border-b items-center gap-2 ease-linear">
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
                  <BreadcrumbLink asChild>
                    <Link href="/settings">Settings</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {currentRoute && currentRoute !== "General" && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{currentRoute}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle
            className="px-4 ml-auto"
          />
        </header>
        <main className="container-wrapper border-none">{/** flex flex-1 flex-col */}
          <div className="container p-6">
            {children}
          </div>
        </main>
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
