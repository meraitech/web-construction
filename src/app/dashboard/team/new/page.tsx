import { TeamForm } from "../_components/TeamForm"

export default function NewTeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tambah Team Member</h1>
        <p className="text-muted-foreground">
          Tambahkan anggota team baru
        </p>
      </div>

      <TeamForm mode="create" />
    </div>
  )
}
