import { z } from "zod"
import { ProjectStatus, ProjectType } from "../types/project.types"

// Schema reusable untuk uploaded file
export const uploadedFileSchema = z.object({
  url: z.string().url(),
  key: z.string(),
  name: z.string(),
  size: z.number(),
})

export const projectSchema = z.object({
  title: z.string().min(3, "Nama proyek minimal 3 karakter").max(200),
  client_name: z.string().optional(),
  location: z.string().min(2, "Lokasi harus diisi"),
  project_type: z.nativeEnum(ProjectType),
  status: z.nativeEnum(ProjectStatus),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  budget: z.string().optional(),
  short_description: z.string().min(10, "Minimal 10 karakter").max(300),
  description: z.string().min(50, "Minimal 50 karakter"),
  thumbnail: uploadedFileSchema.nullable().optional(),
  gallery: z.array(uploadedFileSchema).optional(),
  featured: z.boolean(),
})

export type ProjectFormData = z.infer<typeof projectSchema>
