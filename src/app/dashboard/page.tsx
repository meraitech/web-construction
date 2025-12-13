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
          Ringkasan aktivitas dan statistik website Anda
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Total Proyek"
          value={stats.totalProjects}
          description="Semua proyek"
          icon={Building2}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Proyek Aktif"
          value={stats.activeProjects}
          description="Sedang berjalan"
          icon={Clock}
          iconColor="text-yellow-600"
        />
        <StatsCard
          title="Proyek Selesai"
          value={stats.completedProjects}
          description="Telah diselesaikan"
          icon={CheckCircle}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Anggota Tim"
          value={stats.totalTeams}
          description="Total anggota"
          icon={Users}
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Testimoni"
          value={stats.totalTestimonials}
          description="Total testimoni"
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