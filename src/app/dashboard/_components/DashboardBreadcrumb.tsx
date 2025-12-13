"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import React from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"

const routeNameMap: Record<string, string> = {
    dashboard: "Dashboard",
    projects: "Projects",
    team: "Team",
    testimonials: "Testimonials",
    settings: "Settings",
    new: "Tambah",
    edit: "Edit",
}

export function DashboardBreadcrumb() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter((segment) => segment !== "")

    // Don't show breadcrumb on root dashboard
    if (segments.length <= 1) return null

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {segments.map((segment, index) => {
                    const isLast = index === segments.length - 1
                    const href = `/${segments.slice(0, index + 1).join("/")}`

                    // Format label: use map or capitalize
                    const label = routeNameMap[segment] ||
                        (segment.length > 20 ? `${segment.slice(0, 8)}...` :
                            segment.charAt(0).toUpperCase() + segment.slice(1))

                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={href}>{label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
