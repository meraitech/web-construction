import {
  Briefcase,
  Building2,
  LayoutDashboard,
  Settings,
} from "lucide-react"
import { SidebarData } from "../_types"

export const sidebarData: SidebarData = {
  user: {
    name: "Admin Konstruksi",
    email: "admin@konstruksi.com",
    avatar: "/avatars/admin.jpg",
  },
  company: {
    name: "Merai",
    logo: Building2,
    plan: "Construction",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Portfolio & Proyek",
      url: "#",
      icon: Building2,
      items: [
        { title: "Semua Proyek", url: "/dashboard/projects" },
        { title: "Tambah Proyek", url: "/dashboard/projects/new" },
        { title: "Kategori", url: "/dashboard/projects/categories" },
      ],
    },
    {
      title: "Layanan & Konten",
      url: "#",
      icon: Briefcase,
      items: [
        { title: "Testimoni Klien", url: "/dashboard/testimonials" },
      ],
    },
    {
      title: "Pengaturan Web",
      url: "#",
      icon: Settings,
      items: [
        { title: "Profil Perusahaan", url: "/dashboard/settings/company" },
        { title: "Tim & Partner", url: "/dashboard/settings/team" },
      ],
    },
  ],
}
