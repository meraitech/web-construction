"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/shared/db"
import { adminUsers } from "@/shared/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "./auth.actions"
import { updateProfileSchema, changePasswordSchema } from "../utils/account-validation"

export async function updateProfile(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: "Anda harus login terlebih dahulu",
    }
  }

  const data = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
  }

  const validation = updateProfileSchema.safeParse(data)

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.errors[0].message,
    }
  }

  try {
    const existingUser = await db.query.adminUsers.findFirst({
      where: eq(adminUsers.username, data.username),
    })

    if (existingUser && existingUser.id !== user.id) {
      return {
        success: false,
        error: "Username sudah digunakan",
      }
    }

    await db
      .update(adminUsers)
      .set({
        name: data.name,
        username: data.username,
        updated_at: new Date(),
      })
      .where(eq(adminUsers.id, user.id))

    revalidatePath("/dashboard/settings/account")

    return {
      success: true,
      message: "Profil berhasil diperbarui",
    }
  } catch (error) {
    return {
      success: false,
      error: "Gagal memperbarui profil",
    }
  }
}

export async function changePassword(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: "Anda harus login terlebih dahulu",
    }
  }

  const data = {
    current_password: formData.get("current_password") as string,
    new_password: formData.get("new_password") as string,
    confirm_password: formData.get("confirm_password") as string,
  }

  const validation = changePasswordSchema.safeParse(data)

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.errors[0].message,
    }
  }

  try {
    const currentUser = await db.query.adminUsers.findFirst({
      where: eq(adminUsers.id, user.id),
    })

    if (!currentUser || currentUser.password !== data.current_password) {
      return {
        success: false,
        error: "Password saat ini salah",
      }
    }

    await db
      .update(adminUsers)
      .set({
        password: data.new_password,
        updated_at: new Date(),
      })
      .where(eq(adminUsers.id, user.id))

    revalidatePath("/dashboard/settings/account")

    return {
      success: true,
      message: "Password berhasil diubah",
    }
  } catch (error) {
    return {
      success: false,
      error: "Gagal mengubah password",
    }
  }
}

export async function getAdminProfile() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const adminUser = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.id, user.id),
  })

  if (!adminUser) {
    return null
  }

  return {
    id: adminUser.id,
    name: adminUser.name,
    username: adminUser.username,
  }
}
