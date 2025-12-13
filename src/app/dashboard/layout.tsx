import React from "react"

import "@/shared/styles/admin.css"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar"
import { DashboardBreadcrumb } from "./_components/DashboardBreadcrumb"
import { requireAuth } from "@/features/auth/utils/middleware"
import { getSetting } from "@/features/settings/services/settings.service"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()
  const companyName = await getSetting("company_name")

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col justify-between">
        <SidebarProvider>
          <AppSidebar user={user} companyName={companyName || undefined} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-5 px-4">
                <SidebarTrigger className="-ml-1 shadow shadow-slate-400" />
                <DashboardBreadcrumb />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pb-16 2xl:px-32">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
