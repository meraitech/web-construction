"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db } from "@/shared/db"
import { projects } from "@/shared/db/schema"
import { deleteUploadedFiles } from "@/shared/services/uploadthing.action"
import { ProjectFormData } from "../utils/validation"
import { generateSlug } from "@/shared/utils/slug"

export async function createProject(data: ProjectFormData) {
  try {
    const slug = generateSlug(data.title)

    await db.insert(projects).values({
      title: data.title,
      slug,
      client_name: data.client_name || null,
      location: data.location,
      project_type: data.project_type,
      status: data.status,
      start_date: data.start_date ? new Date(data.start_date) : null,
      end_date: data.end_date ? new Date(data.end_date) : null,
      budget: data.budget || null,
      short_description: data.short_description,
      description: data.description,
      thumbnail: data.thumbnail || null,
      gallery: data.gallery || null,
      featured: data.featured,
    })

    revalidatePath("/dashboard/projects")
    return { success: true, message: "Proyek berhasil ditambahkan" }
  } catch (error) {
    return { success: false, message: "Gagal menambahkan proyek" }
  }
}

export async function updateProject(id: string, data: ProjectFormData) {
  try {
    // Get old project data
    const oldProject = await db.query.projects.findFirst({
      where: eq(projects.id, id),
    })

    if (!oldProject) {
      return {
        success: false,
        message: "Project not found",
      }
    }

    // Track old files that will be replaced
    const filesToDelete: string[] = []

    // Check if thumbnail changed
    if (oldProject.thumbnail && typeof oldProject.thumbnail === 'object') {
      const oldThumb = oldProject.thumbnail as { key: string }
      const newThumb = data.thumbnail as any

      // If thumbnail replaced (different key)
      if (oldThumb.key && newThumb?.key && oldThumb.key !== newThumb.key) {
        filesToDelete.push(oldThumb.key)
      }
    }

    // Check if gallery changed
    if (oldProject.gallery && Array.isArray(oldProject.gallery)) {
      const oldGalleryKeys = oldProject.gallery.map((img: any) => img?.key).filter(Boolean)
      const newGalleryKeys = (data.gallery || []).map((img: any) => img?.key).filter(Boolean)

      // Find removed gallery images
      const removedKeys = oldGalleryKeys.filter(oldKey => !newGalleryKeys.includes(oldKey))

      if (removedKeys.length > 0) {
        filesToDelete.push(...removedKeys)
      }
    }

    // Update slug if title changed
    const slug = data.title !== oldProject.title
      ? generateSlug(data.title)
      : oldProject.slug

    // Update database
    const [updatedProject] = await db
      .update(projects)
      .set({
        title: data.title,
        slug,
        client_name: data.client_name || null,
        location: data.location,
        project_type: data.project_type,
        status: data.status,
        start_date: data.start_date ? new Date(data.start_date) : null,
        end_date: data.end_date ? new Date(data.end_date) : null,
        budget: data.budget || null,
        short_description: data.short_description,
        description: data.description,
        thumbnail: data.thumbnail || null,
        gallery: data.gallery || null,
        featured: data.featured,
        updated_at: new Date(),
      })
      .where(eq(projects.id, id))
      .returning()

    // Delete old files from Uploadthing
    if (filesToDelete.length > 0) {
      const deleteResult = await deleteUploadedFiles(filesToDelete)

      if (!deleteResult.success) {
      }
    }

    revalidatePath("/dashboard/projects")
    revalidatePath(`/dashboard/projects/${id}`)

    return {
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to update project",
    }
  }
}

export async function deleteProject(id: string) {
  try {
    // Step 1: Get project data to collect file keys
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, id),
    })

    if (!project) {
      return {
        success: false,
        message: "Project not found",
      }
    }

    // Step 2: Collect all file keys to delete
    const fileKeysToDelete: string[] = []

    // Add thumbnail
    if (project.thumbnail && typeof project.thumbnail === 'object') {
      const thumb = project.thumbnail as { key: string }
      if (thumb.key) {
        fileKeysToDelete.push(thumb.key)
      }
    }

    // Add gallery images
    if (project.gallery && Array.isArray(project.gallery)) {
      const galleryKeys = project.gallery
        .map((img: any) => img?.key)
        .filter((key): key is string => !!key)

      fileKeysToDelete.push(...galleryKeys)
    }

    // Step 3: Delete from database first
    await db.delete(projects).where(eq(projects.id, id))

    // Step 4: Delete files from Uploadthing
    if (fileKeysToDelete.length > 0) {
      const deleteResult = await deleteUploadedFiles(fileKeysToDelete)

      if (!deleteResult.success) {
      } else {
      }
    }

    revalidatePath("/dashboard/projects")

    return {
      success: true,
      message: "Project deleted successfully",
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete project",
    }
  }
}
