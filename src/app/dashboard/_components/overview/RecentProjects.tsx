import Link from "next/link"
import { Badge } from "@/shared/components/ui/badge"
import type { Project } from "@/shared/db/schema"
import { DashboardListCard } from "../DashboardListCard"

interface RecentProjectsProps {
  projects: Project[]
}

const statusColors = {
  planning: "bg-blue-100 text-blue-800",
  ongoing: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  on_hold: "bg-gray-100 text-gray-800",
}

const statusLabels = {
  planning: "Perencanaan",
  ongoing: "Berjalan",
  completed: "Selesai",
  on_hold: "Ditunda",
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <DashboardListCard
      title="Proyek Terbaru"
      description="5 proyek terbaru yang ditambahkan"
      viewAllHref="/dashboard/projects"
      items={projects}
      emptyMessage="Belum ada proyek"
      renderItem={(project) => (
        <div className="flex items-center justify-between">
          <div className="space-y-1 flex-1">
            <Link
              href={`/dashboard/projects/${project.id}`}
              className="font-medium hover:underline"
            >
              {project.title}
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {project.short_description}
            </p>
          </div>
          <Badge className={statusColors[project.status]} variant="secondary">
            {statusLabels[project.status]}
          </Badge>
        </div>
      )}
    />
  )
}
