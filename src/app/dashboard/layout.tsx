import React from "react"

import "@/shared/styles/admin.css"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar"
import { DashboardBreadcrumb } from "./_components/DashboardBreadcrumb"
import { requireAuth } from "@/features/auth/utils/middleware"
import { getSetting } from "@/features/settings/services/settings.service"
import { ThemeProvider } from "./_components/ThemeProvider"
import { ModeToggle } from "./_components/ModeToggle"
import { HeaderCalendar } from "./_components/HeaderCalendar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()
  const companyName = await getSetting("company_name")

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col justify-between">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar user={user} companyName={companyName || undefined} />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-5 px-4">
                  <SidebarTrigger className="-ml-1 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50" />
                  <DashboardBreadcrumb />
                </div>
                <div className="px-4 flex items-center gap-2">
                  <HeaderCalendar />
                  <ModeToggle />
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pb-16 2xl:px-32">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
