"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db } from "@/shared/db"
import { teams } from "@/shared/db/schema"
import { deleteUploadedFiles } from "@/shared/services/uploadthing.action"
import { TeamFormData } from "../utils/validation"
import { generateSlug } from "@/shared/utils/slug"

export async function createTeam(data: TeamFormData) {
  try {
    const slug = generateSlug(data.name)

    await db.insert(teams).values({
      name: data.name,
      slug,
      position: data.position,
      profile: data.profile || null,
    })

    revalidatePath("/dashboard/team")
    return { success: true, message: "Team member berhasil ditambahkan" }
  } catch (error) {
    return { success: false, message: "Gagal menambahkan team member" }
  }
}

export async function updateTeam(id: string, data: TeamFormData) {
  try {
    const oldTeam = await db.query.teams.findFirst({
      where: eq(teams.id, id),
    })

    if (!oldTeam) {
      return {
        success: false,
        message: "Team member not found",
      }
    }

    const filesToDelete: string[] = []

    if (oldTeam.profile && typeof oldTeam.profile === 'object') {
      const oldProfile = oldTeam.profile as { key: string }
      const newProfile = data.profile as any

      if (oldProfile.key && newProfile?.key && oldProfile.key !== newProfile.key) {
        filesToDelete.push(oldProfile.key)
      }
    }

    const slug = data.name !== oldTeam.name
      ? generateSlug(data.name)
      : oldTeam.slug

    const [updatedTeam] = await db
      .update(teams)
      .set({
        name: data.name,
        slug,
        position: data.position,
        profile: data.profile || null,
        updated_at: new Date(),
      })
      .where(eq(teams.id, id))
      .returning()

    if (filesToDelete.length > 0) {
      const deleteResult = await deleteUploadedFiles(filesToDelete)

      if (!deleteResult.success) {
      }
    }

    revalidatePath("/dashboard/team")
    revalidatePath(`/dashboard/team/${id}`)

    return {
      success: true,
      message: "Team member updated successfully",
      data: updatedTeam,
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to update team member",
    }
  }
}

export async function deleteTeam(id: string) {
  try {
    const team = await db.query.teams.findFirst({
      where: eq(teams.id, id),
    })

    if (!team) {
      return {
        success: false,
        message: "Team member not found",
      }
    }

    const fileKeysToDelete: string[] = []

    if (team.profile && typeof team.profile === 'object') {
      const profile = team.profile as { key: string }
      if (profile.key) {
        fileKeysToDelete.push(profile.key)
      }
    }

    await db.delete(teams).where(eq(teams.id, id))

    if (fileKeysToDelete.length > 0) {
      const deleteResult = await deleteUploadedFiles(fileKeysToDelete)

      if (!deleteResult.success) {
      } else {
      }
    }

    revalidatePath("/dashboard/team")

    return {
      success: true,
      message: "Team member deleted successfully",
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete team member",
    }
  }
}
