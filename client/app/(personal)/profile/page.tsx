"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Palette,
  UserCheck,
  CalendarDays,
  User,
  CheckCircle,
  Crown,
  Flag,
  FileText,
  Phone,
  MessageSquare,
  Star,
  Users, Mail, LayoutGrid, Link
} from "lucide-react";

export default function ProfilePage() {
	return (
    <>
      <Card className="overflow-hidden mb-6 py-0">
        <div className="">{/**user-profile-header-banner */}
          <img
            src="/backgrounds/profile-banner.png"
            alt="Banner image"
            className="rounded-top"
          />
        </div>
        <div className="user-profile-header flex flex-column flex-lg-row text-sm-start text-center mb-6">
          <div className="shrink-0 mt-1 sm:mx-0 mx-auto">{/*flex-shrink-0 mt-1 mx-sm-0 mx-auto*/}
            {/*block h-auto ms-0 ms-sm-6 rounded-3 user-profile-img*/}
            <Avatar className="user-profile-img block h-[138px] w-[138px] mx-auto sm:mx-0 sm:ms-6 rounded-2xl">
              {/*<Avatar className="user-profile-img block h-auto ms-0 sm:ms-6 rounded-2xl">*/}
              <AvatarImage
                src="/avatars/waddles.jpeg"
                alt="user image"
                width={128}
                height={128}
                className="object-cover h-32 w-32 aspect-square"
              />
              <AvatarFallback className="rounded-none text-2xl font-bold">SW</AvatarFallback>
            </Avatar>
            {/*<Image*/}
            {/*  src="/avatars/waddles.jpeg"*/}
            {/*  alt="user image"*/}
            {/*  width={128}*/}
            {/*  height={128}*/}
            {/*  objectFit="cover"*/}
            {/*  className="user-profile-img block h-auto ms-0 sm:ms-6 rounded-2xl"*/}
            {/*/>*/}
          </div>
          <div className="grow mt-3 lg:mt-5">{/*flex-grow-1 mt-3 mt-lg-5*/}
            {/*align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-5 flex-md-row flex-column gap-4*/}
            <div
              className="flex md:items-end sm:items-start items-center md:justify-between justify-start mx-5 md:flex-row flex-col gap-4">
              <div className="user-profile-info">
                <h4 className="mb-2 lg:mt-7 text-2xl font-semibold text-left">Japtor Gorthenburg</h4>
                {/*list-inline mb-0 flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-4 mt-4*/}
                <ul className="flex flex-wrap list-inline mb-0 items-center sm:justify-start justify-center gap-4 mt-4">
                  <li className="list-inline-item">
                    <Palette size={20} className="align-top me-2" />
                    <span className="font-medium">UX Designer</span>
                  </li>
                  <li className="list-inline-item">
                    <MapPin size={20} className="align-top me-2" />
                    <span className="font-medium">Milan City</span>
                  </li>
                  <li className="list-inline-item">
                    <CalendarDays size={20} className="align-top me-2" />
                    <span className="font-medium"> Joined April 2021</span>
                  </li>
                </ul>
              </div>
              <Button variant="default" className="mb-1 cursor-pointer">
                <UserCheck className="icon-base bx bx-user-check icon-sm me-" />
                Connected
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <div className="grid xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 gap-6">
        <div className="xl:col-span-12 lg:col-span-12 md:col-span-12">
          <div className="nav-align-top">
            <ul className="flex flex-column flex-sm-row mb-6 gap-sm-0 gap-1">
              <li className="nav-item">
                <Button className="nav-link active cursor-pointer" variant="default">
                  <User />Profile
                </Button>
              </li>
              <li className="nav-item">
                <Button className="nav-link cursor-pointer" variant="ghost">
                  <Users />Teams
                </Button>
              </li>
              <li className="nav-item">
                <Button className="nav-link cursor-pointer" variant="ghost">
                  <LayoutGrid />Projects
                </Button>
              </li>
              <li className="nav-item">
                <Button className="nav-link cursor-pointer" variant="ghost">
                  <Link />Connections
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 gap-6">
        {/* Left Column - About User and Profile Overview */}
        <div className="xl:col-span-4 lg:col-span-5 md:col-span-5 space-y-6">
          <Card>
            <CardContent>
              <p className="text-xs uppercase text-muted-foreground">About</p>
              <ul className="mt-3 py-1 space-y-4">
                <li className="flex items-center">
                  <User className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Full Name:</span>
                  <span>John Doe</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Status:</span>
                  <span>Active</span>
                </li>
                <li className="flex items-center">
                  <Crown className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Role:</span>
                  <span>Developer</span>
                </li>
                <li className="flex items-center">
                  <Flag className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Country:</span>
                  <span>USA</span>
                </li>
                <li className="flex items-center">
                  <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Languages:</span>
                  <span>English</span>
                </li>
              </ul>

              <p className="text-xs uppercase text-muted-foreground mt-6">Contacts</p>
              <ul className="mt-3 py-1 space-y-4">
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Contact:</span>
                  <span>(123) 456-7890</span>
                </li>
                <li className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Skype:</span>
                  <span>john.doe</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Email:</span>
                  <span>john.doe@example.com</span>
                </li>
              </ul>

              <p className="text-xs uppercase text-muted-foreground mt-6">Teams</p>
              <ul className="mt-3 py-1 space-y-4">
                <li className="flex flex-wrap">
                  <span className="font-medium mr-2">Backend Developer</span>
                  <span>(126 Members)</span>
                </li>
                <li className="flex flex-wrap">
                  <span className="font-medium mr-2">React Developer</span>
                  <span>(98 Members)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p className="text-xs uppercase text-muted-foreground">Overview</p>
              <ul className="mt-3 py-1 space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Task Compiled:</span>
                  <span>13.5k</span>
                </li>
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Projects Compiled:</span>
                  <span>146</span>
                </li>
                <li className="flex items-center">
                  <Users className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="font-medium mx-2">Connections:</span>
                  <span>897</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Projects */}
        <div className="xl:col-span-8 lg:col-span-7 md:col-span-7">
          <Card>
            <CardContent>
              <p className="text-xs uppercase text-muted-foreground">Projects</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
