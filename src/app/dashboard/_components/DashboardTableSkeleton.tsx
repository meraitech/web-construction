export function DashboardTableSkeleton() {
    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-pulse">
            <div className="p-4 space-y-4">
                <div className="h-12 bg-slate-100 rounded" />
                <div className="h-16 bg-slate-50 rounded" />
                <div className="h-16 bg-slate-50 rounded" />
                <div className="h-16 bg-slate-50 rounded" />
            </div>
        </div>
    )
}
