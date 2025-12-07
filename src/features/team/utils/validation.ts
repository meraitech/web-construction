import { z } from "zod"

export const teamSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(200, "Nama maksimal 200 karakter"),
  position: z.string().min(1, "Posisi wajib diisi").max(200, "Posisi maksimal 200 karakter"),
  profile: z.object({
    url: z.string(),
    key: z.string(),
    name: z.string(),
    size: z.number(),
  }).nullable(),
})

export type TeamFormData = z.infer<typeof teamSchema>
