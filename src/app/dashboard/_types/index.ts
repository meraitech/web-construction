import { type LucideIcon } from "lucide-react"

export interface User {
  name: string
  email: string
  avatar: string
}

export interface Company {
  name: string
  logo: React.ElementType
  plan: string
}

export interface SubMenuItem {
  title: string
  url: string
}

export interface MainMenuItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: SubMenuItem[]
}

export interface SidebarData {
  user: User
  company: Company
  navMain: MainMenuItem[]
}
