import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { ArrowRight } from "lucide-react"

interface DashboardListCardProps<T> {
    title: string
    description: string
    viewAllHref: string
    items: T[]
    renderItem: (item: T) => React.ReactNode
    emptyMessage?: string
}

export function DashboardListCard<T>({
    title,
    description,
    viewAllHref,
    items,
    renderItem,
    emptyMessage = "Belum ada data",
}: DashboardListCardProps<T>) {
    if (items.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-8">
                        {emptyMessage}
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href={viewAllHref}>
                        Lihat Semua
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="border-b border-border last:border-0 pb-4 last:pb-0"
                        >
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
