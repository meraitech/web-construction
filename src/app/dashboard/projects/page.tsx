import { Suspense } from "react"
import { PlusCircle } from "lucide-react"
import { getProjects } from "@/features/project/services/project.service"
import { ProjectTable } from "./_components/ProjectTable"
import { DashboardPageHeader } from "../_components/DashboardPageHeader"
import { DashboardTableSkeleton } from "../_components/DashboardTableSkeleton"

export default async function ProjectsPage() {
  const { data: projects } = await getProjects()

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <DashboardPageHeader
          title="Projects"
          description="Manage all your construction projects"
          action={{
            label: "Add Project",
            href: "/dashboard/projects/new",
            icon: PlusCircle,
          }}
        />

        {/* Table Section */}
        <Suspense fallback={<DashboardTableSkeleton />}>
          <ProjectTable projects={projects || []} />
        </Suspense>
      </div>
    </div>
  )
}
