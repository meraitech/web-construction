import { ProjectForm } from "../_components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tambah Proyek Baru</h1>
        <p className="text-muted-foreground">
          Isi form di bawah untuk menambahkan proyek konstruksi
        </p>
      </div>

      <div className="max-w-2xl">
        <ProjectForm mode="create" />
      </div>
    </div>
  )
}

