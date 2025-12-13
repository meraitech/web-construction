import { notFound } from "next/navigation"
import { getTestimonialById } from "@/features/testimonial/services/testimonial.service"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { ArrowLeft, Pencil } from "lucide-react"
import Link from "next/link"

export default async function TestimonialDetailPage({
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{testimonial.client_name}</h1>
            <p className="text-muted-foreground">{testimonial.position}</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/dashboard/testimonials/${testimonial.id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <Separator />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Testimonial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nama Klien</p>
              <p className="text-lg">{testimonial.client_name}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Posisi</p>
              <p className="text-lg">{testimonial.position}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pesan Testimonial</p>
              <p className="text-lg whitespace-pre-wrap">{testimonial.message}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Dibuat pada</p>
              <p className="text-lg">
                {new Date(testimonial.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
