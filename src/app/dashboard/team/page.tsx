import { Suspense } from "react"
import { Button } from "@/shared/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { getTeams } from "@/features/team/services/team.service"
import { TeamTable } from "./_components/TeamTable"

export default async function TeamPage() {
  const { data: teams } = await getTeams()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Kelola team member perusahaan Anda
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/team/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Team Member
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <TeamTable teams={teams} />
      </Suspense>
    </div>
  )
}
