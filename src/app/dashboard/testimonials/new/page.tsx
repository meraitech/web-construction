import { TestimonialForm } from "../_components/TestimonialForm"

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Testimonial</h1>
        <p className="text-muted-foreground">
          Add a new testimonial from client
        </p>
      </div>

      <TestimonialForm mode="create" />
    </div>
  )
}
