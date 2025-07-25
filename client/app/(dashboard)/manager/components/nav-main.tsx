"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link"
import {
  type LucideIcon,
  ChevronRight,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
  useSidebar
} from "@/components/ui/sidebar";

interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

interface NavMainProps {
  items: NavMainItem[];
}

export function NavMain({ items }: NavMainProps) {
  const { setOpen } = useSidebar();
  const pathname = usePathname();
  // const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Helper to check if a menu or submenu is active by current route
  const isMenuActive = (item: NavMainItem) => {
    if (item.url !== "#" && pathname === item.url) return true;
    if (item.items) {
      return item.items.some((sub: { url: string }) => sub.url !== "#" && pathname === sub.url);
    }
    return false;
  };
  const isSubMenuActive = (item: { url: string }, parent: NavMainItem) => {
    return item.url !== "#" && pathname === item.url;
  };

  // useEffect(() => {
  //   const idx = items.findIndex((item: NavMainItem) => isMenuActive(item));
  //   setOpenIndex(idx !== -1 ? idx : null);
  // }, [pathname, items]);

  // Tính toán nav mở mặc định ngay từ lần render đầu tiên
  const getDefaultOpenIndex = React.useCallback(() => {
    return items.findIndex((item: NavMainItem) => isMenuActive(item));
  }, [items, pathname]);
  const [openIndex, setOpenIndex] = useState<number | null>(() => {
    const idx = getDefaultOpenIndex();
    return idx !== -1 ? idx : null;
  });

  // Đồng bộ openIndex khi pathname hoặc items thay đổi (nếu cần)
  useEffect(() => {
    const idx = getDefaultOpenIndex();
    setOpenIndex(idx !== -1 ? idx : null);
  }, [getDefaultOpenIndex]);

  // Hiển thị hiệu ứng cho tất cả nav đang hiển thị (có items), không chỉ nav đang active
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item: NavMainItem, idx: number) => {
          const isOpen = openIndex === idx;
          const hasSubMenu = Array.isArray(item.items) && item.items.length > 0;
          return (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              onOpenChange={(open: boolean) => setOpenIndex(open ? idx : null)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isMenuActive(item)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen && hasSubMenu ? "auto" : 0,
                    opacity: isOpen && hasSubMenu ? 1 : 0,
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeInOut",
                    height: { type: "tween", duration: 0.3 },
                    opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 }
                  }}
                  style={{ 
                    overflow: "hidden"
                  }}
                >
                  {hasSubMenu && (
                    <SidebarMenuSub>
                      {item.items?.map((subItem: { title: string; url: string }) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            tooltip={{
                              children: subItem.title,
                              hidden: false,
                            }}
                            onClick={() => {
                              setOpen(true);
                            }}
                            isActive={isSubMenuActive(subItem, item)}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </motion.div>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
