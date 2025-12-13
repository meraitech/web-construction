import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { ArrowRight, Quote } from "lucide-react"
import type { Testimonial } from "@/shared/db/schema"

interface RecentTestimonialsProps {
  testimonials: Testimonial[]
}

export function RecentTestimonials({ testimonials }: RecentTestimonialsProps) {
  if (testimonials.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Testimoni Terbaru</CardTitle>
          <CardDescription>5 testimoni terbaru yang ditambahkan</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Belum ada testimoni
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Testimoni Terbaru</CardTitle>
          <CardDescription>5 testimoni terbaru yang ditambahkan</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/testimonials">
            Lihat Semua
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="border-b last:border-0 pb-4 last:pb-0 space-y-2"
            >
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
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
