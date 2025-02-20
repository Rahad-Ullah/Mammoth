import { AppSidebar } from "@/components/app-sidebar";
import DashboardBreadcrumb from "@/components/dashboard-breadcrumb";
import { NavUser } from "@/components/nav-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userData } from "@/constants/dashboard-sidebar-menu";
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
    <SidebarProvider>
      {/* dashboard sidebar */}
      <AppSidebar />
      <SidebarInset>
        {/* dashboard header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex flex-nowrap items-center gap-2 px-4">
            <SidebarTrigger className="lg:hidden -ml-1" />
            <DashboardBreadcrumb />
          </div>
          {/* searchbar */}
          <div className="flex justify-center items-center gap-6">
            <div className="relative">
              <Input
                type="search"
                id="search"
                placeholder="Search your interest"
                className="rounded-full bg-zinc-50 px-5 h-10"
                size={28}
              />
              <Search className="absolute right-2 top-2 text-zinc-500" />
            </div>
            {/* notification */}
            <Button size={"icon"} className="rounded-full">
              <Bell />
            </Button>
            {/* user dropdown */}
            <NavUser user={userData} />
          </div>
        </header>
        {/* dashboard content */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
