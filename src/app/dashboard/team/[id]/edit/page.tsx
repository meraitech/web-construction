import { notFound } from "next/navigation"
import { getTeamById } from "@/features/team/services/team.service"
import { TeamForm } from "../../_components/TeamForm"

export default async function EditTeamPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const team = await getTeamById(id)

  if (!team) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Team Member</h1>
        <p className="text-muted-foreground">
          Update team member information
        </p>
      </div>

      <TeamForm mode="edit" initialData={team} />
    </div>
  )
}
