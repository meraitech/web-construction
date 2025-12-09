import { Suspense } from "react"
import { Button } from "@/shared/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { getProjects } from "@/features/project/services/project.service"
import { ProjectTable } from "./_components/ProjectTable"

export default async function ProjectsPage() {
  const { data: projects } = await getProjects()

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Projects
            </h1>
            <p className="text-slate-500">
              Kelola semua proyek konstruksi Anda
            </p>
          </div>
          <Button asChild className="shadow-sm w-fit">
            <Link href="/dashboard/projects/new" className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Tambah Proyek
            </Link>
          </Button>
        </div>

        {/* Table Section */}
        <Suspense fallback={<TableSkeleton />}>
          <ProjectTable projects={projects || []} />
        </Suspense>
      </div>
    </div>
  )
}

// Loading skeleton component
function TableSkeleton() {
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
