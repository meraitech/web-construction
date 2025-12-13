import { Suspense } from "react"
import { PlusCircle } from "lucide-react"
import { getTeams } from "@/features/team/services/team.service"
import { TeamTable } from "./_components/TeamTable"
import { DashboardPageHeader } from "../_components/DashboardPageHeader"
import { DashboardTableSkeleton } from "../_components/DashboardTableSkeleton"

export default async function TeamPage() {
  const { data: teams } = await getTeams()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Team"
        description="Kelola team member perusahaan Anda"
        action={{
          label: "Tambah Member",
          href: "/dashboard/team/new",
          icon: PlusCircle,
        }}
      />

      {/* Table */}
      <Suspense fallback={<DashboardTableSkeleton />}>
        <TeamTable data={teams || []} />
      </Suspense>
    </div>
  )
}
