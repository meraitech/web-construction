import { notFound } from "next/navigation"
import { getTestimonialById } from "@/features/testimonial/services/testimonial.service"
import { TestimonialForm } from "../../_components/TestimonialForm"

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const testimonial = await getTestimonialById(id)

  if (!testimonial) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Testimonial</h1>
        <p className="text-muted-foreground">
          Update informasi testimonial
        </p>
      </div>

      <TestimonialForm mode="edit" initialData={testimonial} />
    </div>
  )
}
