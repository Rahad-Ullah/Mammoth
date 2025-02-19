"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavSettings({
  settings,
}: {
  settings: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>System Settings</SidebarGroupLabel>
      <SidebarMenu>
        {settings.map((item) => {
          const isActive = item.url === pathname;

          return (
            <Link href={item.url} key={item.name}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.name}
                  className={`${
                    isActive
                      ? "bg-primary text-white hover:bg-primary hover:text-white active:bg-primary-foreground active:text-white"
                      : ""
                  }`}
                >
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
