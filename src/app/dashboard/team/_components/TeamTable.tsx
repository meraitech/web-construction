// features/team/_components/TeamTable.tsx
"use client"

import { Pencil, Trash2, User, Mail, Phone } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Team } from "@/features/team/types/team.types"
import { deleteTeam } from "@/features/team/services/team.actions"
import { DataTable, DataTableAction, DataTableColumn } from "../../_components/DataTable"

interface TeamTableProps {
  data: Team[]
}

export function TeamTable({ data }: TeamTableProps) {
  const router = useRouter()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const columns: DataTableColumn<Team>[] = [
    {
      header: "Team Member",
      headerClassName: "w-[280px]",
      className: "py-4",
      cell: (team) => (
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 ring-1 ring-slate-200 group-hover:ring-slate-300 transition-all">
            {team.profile?.url ? (
              <Image
                src={team.profile.url}
                alt={team.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-6 h-6 text-slate-400" />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-slate-900 group-hover:text-slate-950 transition-colors">
              {team.name}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Position",
      cell: (team) => (
        <span className="text-sm text-slate-700 capitalize">
          {team.position}
        </span>
      ),
    },
  ]

  const actions: DataTableAction<Team>[] = [
    {
      icon: Pencil,
      label: "Edit Team Member",
      onClick: (team) => {
        router.push(`/dashboard/team/${team.id}/edit`)
      },
    },
    {
      icon: Trash2,
      label: "Delete Team Member",
      variant: "destructive",
      onClick: async (team) => {
        if (!confirm(`Are you sure you want to delete team member "${team.name}"?`))
          return
        const result = await deleteTeam(team.id)
        if (result.success) {
          router.refresh()
        } else {
          alert(result.message)
        }
      },
    },
  ]

  return (
    <DataTable
      data={data}
      columns={columns}
      actions={actions}
      onRowClick={(team) => router.push(`/dashboard/team/${team.id}`)}
      emptyState={{
        icon: User,
        title: "No team members yet",
        action: {
          label: "Add First Team Member",
          href: "/dashboard/team/new",
        },
      }}
      keyExtractor={(team) => team.id}
    />
  )
}
