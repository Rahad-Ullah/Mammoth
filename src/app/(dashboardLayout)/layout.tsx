import { AppSidebar } from "@/components/app-sidebar";
import DashboardBreadcrumb from "@/components/dashboard-breadcrumb";
import NavUserWrapper from "@/components/nav-user-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Bell, Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Mammoth",
  description: "CRM for Health Care",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="">
      {/* dashboard sidebar */}
      <AppSidebar className="p-4 pr-0" />
      <SidebarInset className="bg-transparent p-4 gap-4">
        {/* dashboard header */}
        <header className="flex h-20 py-2 bg-white rounded-xl border shadow-sm shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-20 sticky top-4 z-50">
          <div className="flex flex-nowrap items-center gap-2 px-4">
            <SidebarTrigger className="xl:hidden -ml-1" />
            <DashboardBreadcrumb />
          </div>
          {/* searchbar */}
          <div className="flex justify-center items-center gap-4 md:gap-6">
            <div className="relative hidden md:block">
              <Input
                type="search"
                id="search"
                placeholder="Search your interest"
                className="rounded-full bg-[#F1F1F1] px-5 h-10 placeholder:text-[#B6B6B6]"
                size={28}
              />
              <Search className="absolute right-2 top-2 text-zinc-500" />
            </div>
            {/* notification */}
            <Button size={"icon"} className="rounded-full">
              <Bell />
            </Button>
            {/* user dropdown */}
            <NavUserWrapper />
          </div>
        </header>
        {/* dashboard content */}
        <div className="rounded-xl flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
