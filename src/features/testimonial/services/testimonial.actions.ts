"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db } from "@/shared/db"
import { testimonials } from "@/shared/db/schema"
import { TestimonialFormData } from "../utils/validation"
import { generateSlug } from "@/shared/utils/slug"

export async function createTestimonial(data: TestimonialFormData) {
  try {
    const slug = generateSlug(data.client_name)

    await db.insert(testimonials).values({
      client_name: data.client_name,
      slug,
      position: data.position,
      message: data.message,
    })

    revalidatePath("/dashboard/testimonials")
    return { success: true, message: "Testimonial berhasil ditambahkan" }
  } catch (error) {
    return { success: false, message: "Gagal menambahkan testimonial" }
  }
}

export async function updateTestimonial(id: string, data: TestimonialFormData) {
  try {
    const oldTestimonial = await db.query.testimonials.findFirst({
      where: eq(testimonials.id, id),
    })

    if (!oldTestimonial) {
      return {
        success: false,
        message: "Testimonial not found",
      }
    }

    const slug = data.client_name !== oldTestimonial.client_name
      ? generateSlug(data.client_name)
      : oldTestimonial.slug

    const [updatedTestimonial] = await db
      .update(testimonials)
      .set({
        client_name: data.client_name,
        slug,
        position: data.position,
        message: data.message,
        updated_at: new Date(),
      })
      .where(eq(testimonials.id, id))
      .returning()

    revalidatePath("/dashboard/testimonials")
    revalidatePath(`/dashboard/testimonials/${id}`)

    return {
      success: true,
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to update testimonial",
    }
  }
}

export async function deleteTestimonial(id: string) {
  try {
    const testimonial = await db.query.testimonials.findFirst({
      where: eq(testimonials.id, id),
    })

    if (!testimonial) {
      return {
        success: false,
        message: "Testimonial not found",
      }
    }

    await db.delete(testimonials).where(eq(testimonials.id, id))

    revalidatePath("/dashboard/testimonials")

    return {
      success: true,
      message: "Testimonial deleted successfully",
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete testimonial",
    }
  }
}
