"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  CreditCard,
  Search,
  Sparkles,
  Bell,
  Globe,
  LogOut,
  Bolt,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { appGlobal } from "@/constants/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuickSetting } from "@/components/elements/quick-setting";
import { ModeToggle } from "@/components/elements/mode-toggle";
import { Separator } from "@/components/ui/separator";

const user = {
  name: "japtor",
  email: "japtor@gorth.org",
  avatar: "/avatars/waddles.jpeg",
}

const navigation = [
  { name: "Contact", href: "/contact" },
  { name: "About Us", href: "/about" },
  { name: "Pages", href: "/pages" },
  { name: "Components", href: "/components" },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="flex h-16 items-center px-6">
          {/* Logo */}
          <div className="mr-4 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                className="w-12 h-12"
                src="/logos/logo.png"
                alt={appGlobal.name}
                width={48}
                height={48}
              />
              <span className="text-lg font-bold hidden md:inline-block">{appGlobal.name}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="">{/*w-[300px] sm:w-[400px]*/}
              <SheetHeader className="pb-0">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/logos/logo.png"
                      alt={appGlobal.name}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{appGlobal.name}</span>
                      <span className="truncate text-xs">Manager</span>
                    </div>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <Separator />
              <nav className="flex flex-col space-y-0 p-4 pt-0">
                {navigation.map((item, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    className="justify-start w-full"
                  >
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium transition-colors hover:text-primary w-full text-left"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Search */}
          <div className="ml-auto flex items-center space-x-2">
            <div className="hidden lg:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] pl-8"
                />
              </div>
            </div>

            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
                <DropdownMenuItem>German</DropdownMenuItem>
                <DropdownMenuItem>Italian</DropdownMenuItem>
                <DropdownMenuItem>Vietnamese</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ModeToggle />
            <QuickSetting/>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                    8
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-auto">
                  <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">New Message</span>
                      <span className="text-xs text-muted-foreground">1h ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">You have new message from Natalie</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">New Message</span>
                      <span className="text-xs text-muted-foreground">1h ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">You have new message from Natalie</p>
                  </DropdownMenuItem>
                  {/* Add more notification items */}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="md:h-8 md:p-0 cursor-pointer"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">JG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                // side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    <Link href="/account">Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bolt className="mr-2 h-4 w-4" />
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/*<NavUser user={data.user}/>*/}
          </div>
        </div>
      </div>
    </header>
  );
};