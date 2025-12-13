import { notFound } from "next/navigation"
import { getTeamById } from "@/features/team/services/team.service"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import {
  ArrowLeft,
  Pencil,
  User,
  Briefcase,
  Clock,
} from "lucide-react"
import Image from "next/image"

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const team = await getTeamById(id)

  if (!team) {
    notFound()
  }

  // Helper function to format date
  const formatDate = (date: Date | string | null) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {team.name}
                  </h1>
                </div>
                <p className="text-gray-500">{team.position}</p>
              </div>
            </div>
            <Link href={`/dashboard/team/${team.id}/edit`}>
              <Button>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Picture */}
            {team.profile && (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={team.profile.url}
                  alt={team.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Team Info Card */}
            <div className="bg-white rounded-lg p-6 border space-y-4">
              <h3 className="font-semibold text-gray-900">Team Member Information</h3>

              {/* Name */}
              <div className="flex items-center gap-3 py-3 border-t">
                <User className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-900">
                    {team.name}
                  </p>
                </div>
              </div>

              {/* Position */}
              <div className="flex items-center gap-3 py-3 border-t">
                <Briefcase className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Position</p>
                  <p className="text-sm font-medium text-gray-900">
                    {team.position}
                  </p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-center gap-3 py-3 border-t">
                <Clock className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(team.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
