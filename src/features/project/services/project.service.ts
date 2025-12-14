import { db } from "@/shared/db"
import { projects } from "@/shared/db/schema"
import { eq, desc, count } from "drizzle-orm"
import { Project, ProjectsResponse, ProjectStatus, ProjectType } from "../types/project.types"

export async function getProjects(filters?: {
  status?: ProjectStatus
  type?: ProjectType
  page?: number
  limit?: number
}): Promise<ProjectsResponse> {
  const page = filters?.page || 1
  const limit = filters?.limit || 10
  const offset = (page - 1) * limit

  const whereClause = filters?.status ? eq(projects.status, filters.status) : undefined

  const [data, totalResult] = await Promise.all([
    db
      .select()
      .from(projects)
      .where(whereClause)
      .orderBy(desc(projects.created_at))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(projects)
      .where(whereClause),
  ])

  return {
    data: data as Project[],
    total: totalResult[0]?.count || 0,
    page,
    limit,
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1)
  return (result[0] as Project) || null
}
