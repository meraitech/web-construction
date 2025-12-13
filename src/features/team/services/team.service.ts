import { db } from "@/shared/db"
import { teams } from "@/shared/db/schema"
import { eq, desc, count } from "drizzle-orm"
import { Team, TeamsResponse } from "../types/team.types"

export async function getTeams(filters?: {
  page?: number
  limit?: number
}): Promise<TeamsResponse> {
  const page = filters?.page || 1
  const limit = filters?.limit || 10
  const offset = (page - 1) * limit

  const [data, totalResult] = await Promise.all([
    db
      .select()
      .from(teams)
      .orderBy(desc(teams.created_at))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(teams),
  ])

  return {
    data: data as Team[],
    total: totalResult[0]?.count || 0,
    page,
    limit,
  }
}

export async function getTeamById(id: string): Promise<Team | null> {
  const result = await db.select().from(teams).where(eq(teams.id, id)).limit(1)
  return (result[0] as Team) || null
}
