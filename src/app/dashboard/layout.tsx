import React from "react"

import "@/shared/styles/admin.css"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 shadow ring ring-gray-200 fixed" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 2xl:px-32">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
