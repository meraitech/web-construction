import { Suspense } from "react"
import { Button } from "@/shared/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { getTeams } from "@/features/team/services/team.service"
import { TeamTable } from "./_components/TeamTable"

export default async function TeamPage() {
  const { data: teams } = await getTeams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Kelola team member perusahaan Anda
          </p>
        </div>
        <Link href="/dashboard/team/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Member
          </Button>
        </Link>
      </div>

      {/* Table */}
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <TeamTable data={teams || []} />
      </Suspense>
    </div>
  )
}
