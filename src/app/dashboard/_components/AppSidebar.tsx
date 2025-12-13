"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/shared/components/ui/sidebar"
import { sidebarData } from "../_constants/sidebar-data"
import { NavMain } from "./NavMain"
import { NavUser } from "./NavUser"
import { AuthSession } from "@/features/auth/types/auth.types"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: AuthSession | null
  companyName?: string
}

export function AppSidebar({ user, companyName, ...props }: AppSidebarProps) {
  const data = sidebarData
  const displayName = companyName || data.company.name

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayName}</span>
                  <span className="truncate text-xs">{data.company.plan}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {data.navGroups.map((group, index) => (
          <NavMain key={index} label={group.label} items={group.items} />
        ))}
      </SidebarContent>

      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
