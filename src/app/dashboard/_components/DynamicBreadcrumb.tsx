"use client"

import { usePathname } from "next/navigation"
import { Fragment } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"

// Mapping untuk nama yang lebih readable
const pathNameMap: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
  team: "Team",
  testimonials: "Testimonials",
  blog: "Blog",
  settings: "Settings",
  new: "Create New",
  edit: "Edit",
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()

  // Split path dan filter empty strings
  const segments = pathname.split("/").filter(Boolean)

  // Jika hanya /dashboard, tampilkan breadcrumb sederhana
  if (segments.length <= 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  // Build breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const isLast = index === segments.length - 1

    // Cek apakah segment adalah UUID (untuk detail page)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)

    // Get readable name
    let label = pathNameMap[segment] || segment
    if (isUUID) {
      label = "Detail"
    }

    return {
      href,
      label: label.charAt(0).toUpperCase() + label.slice(1),
      isLast,
    }
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.href}>
            <BreadcrumbItem className="hidden md:block">
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator className="hidden md:block" />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

