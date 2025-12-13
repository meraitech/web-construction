"use server"

import { UTApi } from "uploadthing/server"
import { generateSlug } from "@/shared/utils/slug"

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
})

/**
 * Generic file rename configuration
 */
export interface FileRenameConfig {
  key: string
  category: string // e.g., 'project', 'team', 'testimonial', 'blog'
  type: string // e.g., 'thumbnail', 'gallery', 'profile', 'avatar'
  entityName: string // e.g., project title, team member name
  index?: number
}

/**
 * Server Action: Rename uploaded files (GENERIC & REUSABLE)
 * @param files - Array of file rename configurations
 */
export async function renameUploadedFiles(files: FileRenameConfig[]) {
  try {
    const timestamp = Date.now()

    const renamePromises = files.map(async (file) => {
      // Get original file info
      const fileData = await utapi.getFileUrls(file.key)
      const originalUrl = fileData.data[0]?.url || ''
      const extension = originalUrl.split('.').pop()?.split('?')[0] || 'jpg'

      // Generate new name with pattern: {category}-{entitySlug}-{type}-{index?}-{timestamp}.ext
      const entitySlug = generateSlug(file.entityName)
      const categorySlug = generateSlug(file.category)
      const typeSlug = generateSlug(file.type)

      let newName: string
      if (file.index !== undefined) {
        // For multiple files (gallery, etc)
        newName = `${categorySlug}-${entitySlug}-${typeSlug}-${file.index + 1}-${timestamp}.${extension}`
      } else {
        // For single files (thumbnail, avatar, etc)
        newName = `${categorySlug}-${entitySlug}-${typeSlug}-${timestamp}.${extension}`
      }

      // Rename file
      await utapi.renameFiles({
        fileKey: file.key,
        newName: newName,
      })

      return { key: file.key, oldName: originalUrl.split('/').pop(), newName }
    })

    const results = await Promise.all(renamePromises)

    return { success: true, renamedFiles: results }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }
  }
}

/**
 * Server Action: Delete files from Uploadthing storage
 */
export async function deleteUploadedFiles(fileKeys: string[]) {
  if (!fileKeys || fileKeys.length === 0) {
    return { success: true }
  }

  try {
    const utapi = new UTApi({
      token: process.env.UPLOADTHING_TOKEN,
    })

    await utapi.deleteFiles(fileKeys)

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }
  }
}
