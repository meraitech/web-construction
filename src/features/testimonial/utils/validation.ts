import { z } from "zod"

export const testimonialSchema = z.object({
  client_name: z.string().min(1, "Nama klien wajib diisi").max(200, "Nama maksimal 200 karakter"),
  position: z.string().min(1, "Posisi wajib diisi").max(200, "Posisi maksimal 200 karakter"),
  message: z.string().min(1, "Pesan testimoni wajib diisi").min(10, "Pesan minimal 10 karakter"),
})

export type TestimonialFormData = z.infer<typeof testimonialSchema>
