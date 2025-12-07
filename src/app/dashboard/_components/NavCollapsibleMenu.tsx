"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible"
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar"
import { ChevronRight, type LucideIcon } from "lucide-react"

interface SubMenuItem {
  title: string
  url: string
  isActive: boolean
}

interface NavCollapsibleMenuProps {
  title: string
  url: string
  icon?: LucideIcon
  isActive: boolean
  isOpen: boolean
  subItems: SubMenuItem[]
}

/**
 * Collapsible menu item with sub-items
 * Responsible only for rendering a collapsible menu with children
 */
export function NavCollapsibleMenu({
  title,
  url,
  icon: Icon,
  isActive,
  isOpen,
  subItems,
}: NavCollapsibleMenuProps) {
  return (
    <Collapsible
      asChild
      defaultOpen={isOpen}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={title} isActive={isActive}>
            {Icon && <Icon />}
            <span>{title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {subItems.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                  <a href={subItem.url}>
                    <span>{subItem.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

