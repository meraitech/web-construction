import { db } from "@/shared/db"
import { projects, teams, testimonials } from "@/shared/db/schema"
import { eq, desc, count } from "drizzle-orm"

export async function getDashboardStats() {
  const [
    projectsCount,
    teamsCount,
    testimonialsCount,
    activeProjectsCount,
    completedProjectsCount
  ] = await Promise.all([
    db.select({ count: count() }).from(projects),
    db.select({ count: count() }).from(teams),
    db.select({ count: count() }).from(testimonials),
    db.select({ count: count() }).from(projects).where(eq(projects.status, "ongoing")),
    db.select({ count: count() }).from(projects).where(eq(projects.status, "completed")),
  ])

  return {
    totalProjects: projectsCount[0]?.count || 0,
    activeProjects: activeProjectsCount[0]?.count || 0,
    completedProjects: completedProjectsCount[0]?.count || 0,
    totalTeams: teamsCount[0]?.count || 0,
    totalTestimonials: testimonialsCount[0]?.count || 0,
  }
}

export async function getRecentProjects(limit: number = 5) {
  return await db.query.projects.findMany({
    orderBy: [desc(projects.created_at)],
    limit,
  })
}

export async function getRecentTeams(limit: number = 5) {
  return await db.query.teams.findMany({
    orderBy: [desc(teams.created_at)],
    limit,
  })
}

export async function getRecentTestimonials(limit: number = 5) {
  return await db.query.testimonials.findMany({
    orderBy: [desc(testimonials.created_at)],
    limit,
  })
}
