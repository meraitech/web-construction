"use client"

import { SidebarMenuItem, SidebarMenuButton } from "@/shared/components/ui/sidebar"
import { type LucideIcon } from "lucide-react"

interface NavMenuItemProps {
  title: string
  url: string
  icon?: LucideIcon
  isActive: boolean
}

/**
 * Single menu item without sub-items
 * Responsible only for rendering a single menu link
 */
export function NavMenuItem({ title, url, icon: Icon, isActive }: NavMenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <a href={url}>
          {Icon && <Icon />}
          <span>{title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

