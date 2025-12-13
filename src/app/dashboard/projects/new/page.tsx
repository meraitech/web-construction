import { ProjectForm } from "../_components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Project</h1>
        <p className="text-muted-foreground">
          Fill in the form below to add a construction project
        </p>
      </div>

      <ProjectForm mode="create" />
    </div>
  )
}

