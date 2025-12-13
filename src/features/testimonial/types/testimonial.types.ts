import { Testimonial } from "@/shared/db/schema"

export type { Testimonial }

export interface TestimonialFormData {
  client_name: string
  position: string
  message: string
}

export interface TestimonialsResponse {
  data: Testimonial[]
  total: number
  page: number
  limit: number
}
