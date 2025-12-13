import { Building2, Users, MessageSquare, CheckCircle, Clock } from "lucide-react"
import { StatsCard } from "./_components/overview/StatsCard"
import { RecentProjects } from "./_components/overview/RecentProjects"
import { RecentTeams } from "./_components/overview/RecentTeams"
import { RecentTestimonials } from "./_components/overview/RecentTestimonials"
import { getDashboardStats, getRecentProjects, getRecentTeams, getRecentTestimonials } from "./_services/dashboard.service"

export default async function DashboardPage() {
  const [stats, recentProjects, recentTeams, recentTestimonials] = await Promise.all([
    getDashboardStats(),
    getRecentProjects(5),
    getRecentTeams(5),
    getRecentTestimonials(5),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Summary of your website activity and statistics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          description="All projects"
          icon={Building2}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          description="In progress"
          icon={Clock}
          iconColor="text-yellow-600"
        />
        <StatsCard
          title="Completed Projects"
          value={stats.completedProjects}
          description="Completed"
          icon={CheckCircle}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Team Members"
          value={stats.totalTeams}
          description="Total members"
          icon={Users}
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Testimonials"
          value={stats.totalTestimonials}
          description="Total testimonials"
          icon={MessageSquare}
          iconColor="text-orange-600"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <RecentProjects projects={recentProjects} />
        <RecentTeams teams={recentTeams} />
      </div>

      <div className="grid gap-4">
        <RecentTestimonials testimonials={recentTestimonials} />
      </div>
    </div>
  )
}