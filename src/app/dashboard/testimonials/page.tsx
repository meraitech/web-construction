import { Suspense } from "react"
import { PlusCircle } from "lucide-react"
import { getTestimonials } from "@/features/testimonial/services/testimonial.service"
import { TestimonialTable } from "./_components/TestimonialTable"
import { DashboardPageHeader } from "../_components/DashboardPageHeader"
import { DashboardTableSkeleton } from "../_components/DashboardTableSkeleton"

export default async function TestimonialsPage() {
  const { data: testimonials } = await getTestimonials()

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Testimonials"
        description="Manage testimonials from your clients"
        action={{
          label: "Add Testimonial",
          href: "/dashboard/testimonials/new",
          icon: PlusCircle,
        }}
      />

      {/* Table */}
      <Suspense fallback={<DashboardTableSkeleton />}>
        <TestimonialTable data={testimonials || []} />
      </Suspense>
    </div>
  )
}
