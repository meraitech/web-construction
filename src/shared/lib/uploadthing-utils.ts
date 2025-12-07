import { UTApi } from "uploadthing/server"

/**
 * Get UTApi instance (server-side only)
 */
function getUTApi() {
  return new UTApi({
    token: process.env.UPLOADTHING_TOKEN,
  })
}

/**
 * Delete files from Uploadthing storage
 * @param fileKeys - Array of file keys to delete
 */
export async function deleteUploadthingFiles(fileKeys: string[]) {
  try {
    const utapi = getUTApi()
    await utapi.deleteFiles(fileKeys)
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * Delete a single file from Uploadthing storage
 * @param fileKey - File key to delete
 */
export async function deleteUploadthingFile(fileKey: string) {
  return deleteUploadthingFiles([fileKey])
}
