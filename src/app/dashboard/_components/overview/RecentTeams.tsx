import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import type { Team } from "@/shared/db/schema"
import { DashboardListCard } from "../DashboardListCard"

interface RecentTeamsProps {
  teams: Team[]
}

export function RecentTeams({ teams }: RecentTeamsProps) {
  return (
    <DashboardListCard
      title="Recent Team Members"
      description="5 most recently added team members"
      viewAllHref="/dashboard/team"
      items={teams}
      emptyMessage="No team members yet"
      renderItem={(team) => (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={team.profile?.url} alt={team.name} />
            <AvatarFallback>{team.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <Link
              href={`/dashboard/team/${team.id}`}
              className="font-medium hover:underline block"
            >
              {team.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {team.position}
            </p>
          </div>
        </div>
      )}
    />
  )
}
