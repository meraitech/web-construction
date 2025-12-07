import { TestimonialForm } from "../_components/TestimonialForm"

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tambah Testimonial</h1>
        <p className="text-muted-foreground">
          Tambahkan testimonial baru dari klien
        </p>
      </div>

      <TestimonialForm mode="create" />
    </div>
  )
}
