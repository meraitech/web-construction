import { z } from "zod"

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  username: z.string().min(3, "Username minimal 3 karakter"),
})

export const changePasswordSchema = z.object({
  current_password: z.string().min(6, "Password minimal 6 karakter"),
  new_password: z.string().min(6, "Password baru minimal 6 karakter"),
  confirm_password: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Password baru dan konfirmasi tidak cocok",
  path: ["confirm_password"],
})

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
