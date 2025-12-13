import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { ArrowRight } from "lucide-react"
import type { Team } from "@/shared/db/schema"

interface RecentTeamsProps {
  teams: Team[]
}

export function RecentTeams({ teams }: RecentTeamsProps) {
  if (teams.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tim Terbaru</CardTitle>
          <CardDescription>5 anggota tim terbaru yang ditambahkan</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Belum ada anggota tim
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Tim Terbaru</CardTitle>
          <CardDescription>5 anggota tim terbaru yang ditambahkan</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/team">
            Lihat Semua
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex items-center gap-4 border-b last:border-0 pb-4 last:pb-0"
            >
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
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
