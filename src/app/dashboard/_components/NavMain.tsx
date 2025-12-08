"use client"

import { usePathname } from "next/navigation"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from "@/shared/components/ui/sidebar"
import { type LucideIcon } from "lucide-react"
import { NavMenuItem } from "./NavMenuItem"
import { NavCollapsibleMenu } from "./NavCollapsibleMenu"
import { hasActiveSubItem, isDashboardMenu, isMenuActive } from "../_utils/navigation"

interface MenuItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

interface NavMainProps {
  label: string
  items: MenuItem[]
}

export function NavMain({ label, items }: NavMainProps) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const needsExactMatch = isDashboardMenu(item.url)
          const isActive = isMenuActive(pathname, item.url, needsExactMatch)

          // Simple menu (no subitems)
          if (!item.items || item.items.length === 0) {
            return (
              <NavMenuItem
                key={item.title}
                item={{
                  title: item.title,
                  url: item.url,
                  icon: item.icon,
                }}
                isActive={isActive}
              />
            )
          }

          // Collapsible menu (with subitems)
          const hasActiveSub = hasActiveSubItem(pathname, item.items)
          const subItemsWithActiveState = item.items.map((subItem) => ({
            ...subItem,
            isActive: isMenuActive(pathname, subItem.url),
          }))

          return (
            <NavCollapsibleMenu
              key={item.title}
              item={{
                title: item.title,
                url: item.url,
                icon: item.icon,
              }}
              subItems={subItemsWithActiveState}
              isActive={isActive}
              hasActiveSub={hasActiveSub}
            />
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
