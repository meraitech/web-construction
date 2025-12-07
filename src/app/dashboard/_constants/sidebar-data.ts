import {
  Building2,
  Users,
  MessageSquare,
  Settings,
  LayoutDashboard,
} from "lucide-react"

export const sidebarData = {
  company: {
    name: "Construction Co",
    plan: "Enterprise",
  },
  user: {
    name: "Admin User",
    email: "admin@construction.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: Building2,
      items: [
        {
          title: "All Projects",
          url: "/dashboard/projects",
        },
        {
          title: "Create New",
          url: "/dashboard/projects/new",
        },
      ],
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: Users,
    },
    {
      title: "Testimonials",
      url: "/dashboard/testimonials",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
}
