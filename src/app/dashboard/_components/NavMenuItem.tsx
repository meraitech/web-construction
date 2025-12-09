import Link from "next/link"
import { SidebarMenuItem, SidebarMenuButton } from "@/shared/components/ui/sidebar"
import { type LucideIcon } from "lucide-react"

interface NavMenuItemProps {
  item: {
    title: string
    url: string
    icon?: LucideIcon
    items?: {
      title: string
      url: string
    }[]
  }
  isActive: boolean
}

export function NavMenuItem({ item, isActive }: NavMenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={item.url}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
