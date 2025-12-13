import Link from "next/link"
import { Quote } from "lucide-react"
import type { Testimonial } from "@/shared/db/schema"
import { DashboardListCard } from "../DashboardListCard"

interface RecentTestimonialsProps {
  testimonials: Testimonial[]
}

export function RecentTestimonials({ testimonials }: RecentTestimonialsProps) {
  return (
    <DashboardListCard
      title="Recent Testimonials"
      description="5 most recently added testimonials"
      viewAllHref="/dashboard/testimonials"
      items={testimonials}
      emptyMessage="No testimonials yet"
      renderItem={(testimonial) => (
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Quote className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
            <p className="text-sm line-clamp-2 flex-1">
              {testimonial.message}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Link
                href={`/dashboard/testimonials/${testimonial.id}`}
                className="font-medium text-sm hover:underline"
              >
                {testimonial.client_name}
              </Link>
              <p className="text-xs text-muted-foreground">
                {testimonial.position}
              </p>
            </div>
          </div>
        </div>
      )}
    />
  )
}
