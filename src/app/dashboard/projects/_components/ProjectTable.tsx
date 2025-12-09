"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Pencil, Trash2, ImageIcon, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Project, ProjectStatus } from "@/features/project/types/project.types"
import { deleteProject } from "@/features/project/services/project.actions"

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
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation() // Prevent row click
    if (!confirm(`Yakin ingin menghapus proyek "${title}"?`)) return
    setIsDeleting(id)
    const result = await deleteProject(id)
    if (result.success) {
      router.refresh()
    } else {
      alert(result.message)
    }
    setIsDeleting(null)
  }

  const handleRowClick = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}`)
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <ImageIcon className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-slate-500 mb-6 text-center">Belum ada proyek yang dibuat</p>
        <Button asChild className="shadow-sm">
          <Link href="/dashboard/projects/new">Tambah Proyek Pertama</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden px-2">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50 border-b border-slate-200">
            <TableHead className="font-semibold text-slate-700 w-[280px]">Proyek</TableHead>
            <TableHead className="font-semibold text-slate-700">Lokasi</TableHead>
            <TableHead className="font-semibold text-slate-700">Tipe</TableHead>
            <TableHead className="font-semibold text-slate-700">Status</TableHead>
            <TableHead className="font-semibold text-slate-700">Tanggal Mulai</TableHead>
            <TableHead className="font-semibold text-slate-700 text-right w-[120px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            const statusBadge = getStatusBadge(project.status as ProjectStatus)

            return (
              <TableRow
                key={project.id}
                onClick={() => handleRowClick(project.id)}
                className="group border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer"
              >
                <TableCell className="py-4">
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
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm text-slate-700 capitalize">
                    {project.project_type.replace("_", " ")}
                  </span>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={statusBadge.variant}
                    className={`${statusBadge.className} font-medium border`}
                  >
                    {statusBadge.label}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">
                      {project.start_date
                        ? new Date(project.start_date).toLocaleDateString("id-ID", {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })
                        : "-"}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/dashboard/projects/${project.id}/edit`)
                      }}
                      title="Edit Proyek"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                      onClick={(e) => handleDelete(e, project.id, project.title)}
                      disabled={isDeleting === project.id}
                      title="Hapus Proyek"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
