// src/features/project/components/project-table.tsx
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { MoreHorizontal, Eye, Pencil, Trash2, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { useRouter } from "next/navigation"
import { Project, ProjectStatus } from "@/features/project/types/project.types"
import { deleteProject } from "@/features/project/services/project.actions"

interface ProjectTableProps {
  projects: Project[]
}

const getStatusBadge = (status: ProjectStatus) => {
  const variants: Record<ProjectStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    [ProjectStatus.PLANNING]: { label: "Planning", variant: "secondary" },
    [ProjectStatus.ONGOING]: { label: "Ongoing", variant: "default" },
    [ProjectStatus.COMPLETED]: { label: "Completed", variant: "outline" },
    [ProjectStatus.ON_HOLD]: { label: "On Hold", variant: "destructive" },
  }
  return variants[status]
}

export function ProjectTable({ projects }: ProjectTableProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string, title: string) => {
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

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">Belum ada proyek.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/projects/new">Tambah Proyek Pertama</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Thumbnail</TableHead>
            <TableHead>Nama Proyek</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal Mulai</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            const statusBadge = getStatusBadge(project.status as ProjectStatus)
            return (
              <TableRow key={project.id}>
                <TableCell>
                  {project.thumbnail?.url ? (
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <Image
                        src={project.thumbnail.url}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded bg-muted flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell className="capitalize">
                  {project.project_type.replace("_", " ")}
                </TableCell>
                <TableCell>
                  <Badge variant={statusBadge.variant}>
                    {statusBadge.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {project.start_date
                    ? new Date(project.start_date).toLocaleDateString("id-ID")
                    : "-"
                  }
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        disabled={isDeleting === project.id}
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/projects/${project.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/projects/${project.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(project.id, project.title)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
