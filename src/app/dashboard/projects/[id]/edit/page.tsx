import { notFound } from "next/navigation"
import { getProjectById } from "@/features/project/services/project.service"
import { ProjectForm } from "../../_components/ProjectForm"

export default async function EditProjectPage({
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Proyek</h1>
        <p className="text-muted-foreground">
          Perbarui informasi proyek: {project.title}
        </p>
      </div>

      <ProjectForm mode="edit" initialData={project} />
    </div>
  )
}
