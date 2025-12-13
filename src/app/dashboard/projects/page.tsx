import { Suspense } from "react"
import { Button } from "@/shared/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { getProjects } from "@/features/project/services/project.service"
import { ProjectTable } from "./_components/ProjectTable"

export default async function ProjectsPage() {
  const { data: projects } = await getProjects()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Kelola semua proyek konstruksi Anda
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Proyek
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ProjectTable projects={projects} />
      </Suspense>
    </div>
  )
}

