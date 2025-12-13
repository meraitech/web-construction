"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Separator } from "@/shared/components/ui/separator"
import { useState } from "react"
import { Testimonial } from "@/features/testimonial/types/testimonial.types"
import { TestimonialFormData, testimonialSchema } from "@/features/testimonial/utils/validation"
import { createTestimonial, updateTestimonial } from "@/features/testimonial/services/testimonial.actions"

interface TestimonialFormProps {
  initialData?: Testimonial
  mode: "create" | "edit"
}

export function TestimonialForm({ initialData, mode }: TestimonialFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: initialData
      ? {
        client_name: initialData.client_name,
        position: initialData.position,
        message: initialData.message,
      }
      : {
        client_name: "",
        position: "",
        message: "",
      },
  })

  const handleCancel = () => {
    router.back()
  }

  async function onSubmit(data: TestimonialFormData) {
    setIsSubmitting(true)

    try {
      let result
      if (mode === "edit" && initialData) {
        result = await updateTestimonial(initialData.id, data)
      } else {
        result = await createTestimonial(data)
      }

      if (result.success) {
        router.push("/dashboard/testimonials")
        router.refresh()
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert("Failed to save testimonial. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Testimonial Information</h2>

          <FormField
            control={form.control}
            name="client_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Client name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. CEO PT ABC, Homeowner" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Testimonial Message *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your testimonial here..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : mode === "edit" ? "Update" : "Save"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
