import Link from "next/link"
import { Button } from "@/shared/components/ui/button"
import { LucideIcon } from "lucide-react"

interface DashboardPageHeaderProps {
    title: string
    description: string
    action?: {
        label: string
        href: string
        icon?: LucideIcon
    }
}

export function DashboardPageHeader({ title, description, action }: DashboardPageHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {title}
                </h1>
                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>
            {action && (
                <Button asChild className="shadow-sm w-fit">
                    <Link href={action.href} className="flex items-center gap-2">
                        {action.icon && <action.icon className="w-4 h-4" />}
                        {action.label}
                    </Link>
                </Button>
            )}
        </div>
    )
}
