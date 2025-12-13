"use client"

import { Badge } from "@/shared/components/ui/badge"
import { Pencil, Trash2, ImageIcon, MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Project, ProjectStatus } from "@/features/project/types/project.types"
import { deleteProject } from "@/features/project/services/project.actions"
import { DataTable, DataTableAction, DataTableColumn } from "../../_components/DataTable"

interface ProjectTableProps {
  projects: Project[]
}

const getStatusBadge = (status: ProjectStatus) => {
  const variants: Record<ProjectStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive"; className: string }> = {
    [ProjectStatus.PLANNING]: {
      label: "Planning",
      variant: "secondary",
      className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
    },
    [ProjectStatus.ONGOING]: {
      label: "Ongoing",
      variant: "default",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
    },
    [ProjectStatus.COMPLETED]: {
      label: "Completed",
      variant: "outline",
      className: "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
    },
    [ProjectStatus.ON_HOLD]: {
      label: "On Hold",
      variant: "destructive",
      className: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
    },
  }
  return variants[status]
}

export function ProjectTable({ projects }: ProjectTableProps) {
  const router = useRouter()

  const columns: DataTableColumn<Project>[] = [
    {
      header: "Project",
      headerClassName: "w-[280px]",
      className: "py-4",
      cell: (project) => (
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 ring-1 ring-slate-200 group-hover:ring-slate-300 transition-all">
            {project.thumbnail?.url ? (
              <Image
                src={project.thumbnail.url}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-slate-400" />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-slate-900 group-hover:text-slate-950 transition-colors">
              {project.title}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Location",
      cell: (project) => (
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span className="text-sm">{project.location}</span>
        </div>
      ),
    },
    {
      header: "Type",
      cell: (project) => (
        <span className="text-sm text-slate-700 capitalize">
          {project.project_type.replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (project) => {
        const statusBadge = getStatusBadge(project.status as ProjectStatus)
        return (
          <Badge
            variant={statusBadge.variant}
            className={`${statusBadge.className} font-medium border`}
          >
            {statusBadge.label}
          </Badge>
        )
      },
    },
    {
      header: "Start Date",
      cell: (project) => (
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-sm">
            {project.start_date
              ? new Date(project.start_date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              : "-"}
          </span>
        </div>
      ),
    },
  ]

  const actions: DataTableAction<Project>[] = [
    {
      icon: Pencil,
      label: "Edit Project",
      onClick: (project) => {
        router.push(`/dashboard/projects/${project.id}/edit`)
      },
    },
    {
      icon: Trash2,
      label: "Delete Project",
      variant: "destructive",
      onClick: async (project) => {
        if (!confirm(`Are you sure you want to delete project "${project.title}"?`)) return
        const result = await deleteProject(project.id)
        if (result.success) {
          router.refresh()
        } else {
          alert(result.message)
        }
      },
    },
  ]

  return (
    <DataTable
      data={projects}
      columns={columns}
      actions={actions}
      onRowClick={(project) => router.push(`/dashboard/projects/${project.id}`)}
      emptyState={{
        icon: ImageIcon,
        title: "No projects created yet",
        action: {
          label: "Add First Project",
          href: "/dashboard/projects/new",
        },
      }}
      keyExtractor={(project) => project.id}
    />
  )
}
