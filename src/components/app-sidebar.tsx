"use client"

import * as React from "react"
import {
  FlaskConical,
  MapPinned,
  Settings,
  Users,
  UsersRound,
  Wrench,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavSettings } from "./nav-settings";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tests",
      url: "/dashboard",
      icon: FlaskConical,
      isActive: true,
    },
    {
      title: "Patients",
      url: "/dashboard/patients",
      icon: Users,
    },
    {
      title: "User Details",
      url: "/dashboard/user-details",
      icon: UsersRound,
    },
    {
      title: "Bill Details",
      url: "/dashboard/bill-details",
      icon: Settings,
    },
  ],
  settings: [
    {
      name: "Facilities",
      url: "/dashboard/facilities",
      icon: MapPinned,
    },
    {
      name: "Toolbox",
      url: "/dashboard/toolbox",
      icon: Wrench,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <figure className="flex justify-center mt-2">
          <Image src={"/logo.png"} alt="logo" width={120} height={68} />
        </figure>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSettings settings={data.settings} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
