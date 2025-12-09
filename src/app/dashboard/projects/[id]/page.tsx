import { notFound } from "next/navigation"
import { getProjectById } from "@/features/project/services/project.service"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { Pencil, Calendar, MapPin, DollarSign } from "lucide-react"
import Image from "next/image"

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {project.location}
            </span>
            {project.start_date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(project.start_date).toLocaleDateString("id-ID")}
              </span>
            )}
            {project.budget && (
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {project.budget}
              </span>
            )}
          </div>
        </div>
        <Button asChild>
          <Link href={`/dashboard/projects/${project.id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Proyek
          </Link>
        </Button>
      </div>

      {/* Thumbnail */}
      {project.thumbnail?.url && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
          <Image
            src={project.thumbnail.url}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Info Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Status</h3>
            <Badge className="capitalize">{project.status.replace("_", " ")}</Badge>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tipe Proyek</h3>
            <p className="capitalize">{project.project_type.replace("_", " ")}</p>
          </div>

          {project.client_name && (
            <div>
              <h3 className="font-semibold mb-2">Klien</h3>
              <p>{project.client_name}</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Deskripsi Singkat</h3>
          <p className="text-muted-foreground">{project.short_description}</p>
        </div>
      </div>

      {/* Deskripsi Lengkap */}
      <div>
        <h3 className="font-semibold mb-2">Deskripsi Lengkap</h3>
        <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>
      </div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">Galeri Foto</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.gallery.map((image, idx) => (
              <div key={image.key} className="relative aspect-square rounded-lg overflow-hidden border">
                <Image
                  src={image.url}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
