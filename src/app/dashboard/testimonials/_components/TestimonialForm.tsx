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
          <h2 className="text-lg font-semibold">Informasi Testimonial</h2>

          <FormField
            control={form.control}
            name="client_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Klien *</FormLabel>
                <FormControl>
                  <Input placeholder="Nama klien" {...field} />
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
                <FormLabel>Posisi *</FormLabel>
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
                <FormLabel>Pesan Testimonial *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tulis pesan testimonial di sini..."
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
            {isSubmitting ? "Menyimpan..." : mode === "edit" ? "Update" : "Simpan"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Batal
          </Button>
        </div>
      </form>
    </Form>
  )
}
