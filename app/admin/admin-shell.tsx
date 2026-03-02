"use client";

import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type AdminShellProps = {
  children: ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-svh w-full items-stretch">
        <AppSidebar />
        <SidebarInset className="relative flex min-w-0 flex-1 flex-col">
          <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
            <div className="mb-4 flex items-center gap-2">
              <SidebarTrigger aria-label="Toggle sidebar" />
            </div>
            <div className="w-full min-w-0 max-w-[1400px] 2xl:mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
