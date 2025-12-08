import {
  Building2,
  Users,
  MessageSquare,
  Settings,
  LayoutDashboard,
  ImageIcon,
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
  navGroups: [
    {
      label: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: "Content",
      items: [
        {
          title: "Projects",
          url: "/dashboard/projects",
          icon: Building2,
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
      ],
    },
    {
      label: "System",
      items: [
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
          items: [
            {
              title: "General",
              url: "/dashboard/settings",
            },
            {
              title: "Contact",
              url: "/dashboard/settings/contact",
            },
            {
              title: "Social Media",
              url: "/dashboard/settings/social",
            },
          ],
        },
      ],
    },
  ],
}
