export function DashboardTableSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden animate-pulse">
            <div className="p-4 space-y-4">
                <div className="h-12 bg-muted rounded" />
                <div className="h-16 bg-muted/50 rounded" />
                <div className="h-16 bg-muted/50 rounded" />
                <div className="h-16 bg-muted/50 rounded" />
            </div>
        </div>
    )
}
