import { Suspense } from "react"
import { Button } from "@/shared/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { getTestimonials } from "@/features/testimonial/services/testimonial.service"
import { TestimonialTable } from "./_components/TestimonialTable"

export default async function TestimonialsPage() {
  const { data: testimonials } = await getTestimonials()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">
            Kelola testimonial dari klien Anda
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/testimonials/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Testimonial
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <TestimonialTable testimonials={testimonials} />
      </Suspense>
    </div>
  )
}
