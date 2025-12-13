import { z } from "zod"

export const generalSettingsSchema = z.object({
  company_name: z.string().min(1, "Nama perusahaan wajib diisi"),
  company_description: z.string().min(1, "Deskripsi perusahaan wajib diisi"),
  address: z.string().min(1, "Alamat wajib diisi"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  email: z.string().email("Email tidak valid"),
})

export const socialMediaSettingsSchema = z.object({
  facebook: z.string().url("URL Facebook tidak valid").or(z.literal("")),
  instagram: z.string().url("URL Instagram tidak valid").or(z.literal("")),
  linkedin: z.string().url("URL LinkedIn tidak valid").or(z.literal("")),
  twitter: z.string().url("URL Twitter tidak valid").or(z.literal("")),
  youtube: z.string().url("URL YouTube tidak valid").or(z.literal("")),
  tiktok: z.string().url("URL TikTok tidak valid").or(z.literal("")),
})

export type GeneralSettingsFormData = z.infer<typeof generalSettingsSchema>
export type SocialMediaSettingsFormData = z.infer<typeof socialMediaSettingsSchema>
