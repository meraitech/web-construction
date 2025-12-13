"use server"

import { revalidatePath } from "next/cache"
import { updateSettings, getSettings } from "./settings.service"
import { generalSettingsSchema, socialMediaSettingsSchema } from "../utils/validation"
import type { GeneralSettings, SocialMediaSettings } from "../types/settings.types"

export async function getGeneralSettings(): Promise<GeneralSettings> {
  const keys = ["company_name", "company_description", "address", "phone", "email"]
  const data = await getSettings(keys)

  return {
    company_name: data.company_name || "",
    company_description: data.company_description || "",
    address: data.address || "",
    phone: data.phone || "",
    email: data.email || "",
  }
}

export async function updateGeneralSettings(formData: FormData) {
  const data = {
    company_name: formData.get("company_name") as string,
    company_description: formData.get("company_description") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
  }

  const validation = generalSettingsSchema.safeParse(data)

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.errors[0].message,
    }
  }

  try {
    await updateSettings(data)
    revalidatePath("/dashboard/settings")

    return {
      success: true,
      message: "Pengaturan umum berhasil diperbarui",
    }
  } catch (error) {
    return {
      success: false,
      error: "Gagal memperbarui pengaturan",
    }
  }
}

export async function getSocialMediaSettings(): Promise<SocialMediaSettings> {
  const keys = ["facebook", "instagram", "linkedin", "twitter", "youtube", "tiktok"]
  const data = await getSettings(keys)

  return {
    facebook: data.facebook || "",
    instagram: data.instagram || "",
    linkedin: data.linkedin || "",
    twitter: data.twitter || "",
    youtube: data.youtube || "",
    tiktok: data.tiktok || "",
  }
}

export async function updateSocialMediaSettings(formData: FormData) {
  const data = {
    facebook: formData.get("facebook") as string,
    instagram: formData.get("instagram") as string,
    linkedin: formData.get("linkedin") as string,
    twitter: formData.get("twitter") as string,
    youtube: formData.get("youtube") as string,
    tiktok: formData.get("tiktok") as string,
  }

  const validation = socialMediaSettingsSchema.safeParse(data)

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.errors[0].message,
    }
  }

  try {
    await updateSettings(data)
    revalidatePath("/dashboard/settings/social")

    return {
      success: true,
      message: "Pengaturan media sosial berhasil diperbarui",
    }
  } catch (error) {
    return {
      success: false,
      error: "Gagal memperbarui pengaturan",
    }
  }
}
