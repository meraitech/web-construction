import { db } from "@/shared/db"
import { testimonials } from "@/shared/db/schema"
import { eq, desc, count } from "drizzle-orm"
import { Testimonial, TestimonialsResponse } from "../types/testimonial.types"

export async function getTestimonials(filters?: {
  page?: number
  limit?: number
}): Promise<TestimonialsResponse> {
  const page = filters?.page || 1
  const limit = filters?.limit || 10
  const offset = (page - 1) * limit

  const [data, totalResult] = await Promise.all([
    db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.created_at))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(testimonials),
  ])

  return {
    data: data as Testimonial[],
    total: totalResult[0]?.count || 0,
    page,
    limit,
  }
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const result = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1)
  return (result[0] as Testimonial) || null
}
