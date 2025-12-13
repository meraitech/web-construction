import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/shared/db/schema"

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
  if (projects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Proyek Terbaru</CardTitle>
          <CardDescription>5 proyek terbaru yang ditambahkan</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Belum ada proyek
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Proyek Terbaru</CardTitle>
          <CardDescription>5 proyek terbaru yang ditambahkan</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/projects">
            Lihat Semua
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
            >
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
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
