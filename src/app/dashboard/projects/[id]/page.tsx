import { notFound } from "next/navigation";
import { getProjectById } from "@/features/project/services/project.service";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Calendar,
  MapPin,
  DollarSign,
  Building2,
  Clock,
  Star,
} from "lucide-react";
import Image from "next/image";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to format date
  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "ongoing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "planning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "on_hold":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

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
                    {project.title}
                  </h1>
                  {project.featured && (
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <p className="text-gray-500">{project.short_description}</p>
              </div>
            </div>
            <Link href={`/dashboard/projects/${project.id}/edit`}>
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
            {/* Thumbnail */}
            {project.thumbnail && (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={project.thumbnail.url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Project Description
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap wrap-break-word">
                {project.description}
              </p>
            </div>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="bg-white rounded-lg p-6 border">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Image
                        src={image.url}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Project Info Card */}
            <div className="bg-white rounded-lg p-6 border space-y-4">
              <h3 className="font-semibold text-gray-900">Project Information</h3>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <Badge
                  variant="outline"
                  className={getStatusColor(project.status)}
                >
                  {project.status.replace("_", " ")}
                </Badge>
              </div>

              {/* Type */}
              <div className="flex items-center gap-3 py-3 border-t">
                <Building2 className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {project.project_type.replace("_", " ")}
                  </p>
                </div>
              </div>

              {/* Client */}
              {project.client_name && (
                <div className="flex items-center gap-3 py-3 border-t">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Client</p>
                    <p className="text-sm font-medium text-gray-900">
                      {project.client_name}
                    </p>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="flex items-center gap-3 py-3 border-t">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-900">
                    {project.location}
                  </p>
                </div>
              </div>

              {/* Budget */}
              {project.budget && (
                <div className="flex items-center gap-3 py-3 border-t">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(Number(project.budget))}
                    </p>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="flex items-center gap-3 py-3 border-t">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Timeline</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(project.start_date)} -{" "}
                    {formatDate(project.end_date)}
                  </p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-center gap-3 py-3 border-t">
                <Clock className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(project.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
