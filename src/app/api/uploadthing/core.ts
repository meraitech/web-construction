import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UTFiles } from "uploadthing/server"
import { requireAuth } from "@/features/auth/utils/middleware"

const f = createUploadthing()

/**
 * Generate temporary filename
 */
function generateTempFilename(originalName: string): string {
  const extension = originalName.split('.').pop()
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `temp-${timestamp}-${random}.${extension}`
}

export const ourFileRouter = {
  // Single image upload
  singleImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ files }) => {
      const user = await requireAuth()
      const fileOverrides = files.map((file) => {
        const tempName = generateTempFilename(file.name)
        return { ...file, name: tempName }
      })

      return {
        [UTFiles]: fileOverrides,
        renamedFiles: fileOverrides.map(f => f.name),
        userId: user.id
      }
    })
    .onUploadComplete(async ({ file, metadata }) => {

      return {
        url: file.ufsUrl,
        uploadedFileName: file.name,
        uploadedBy: metadata.userId
      }
    }),

  // Multiple images upload
  multipleImages: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 20,
    },
  })
    .middleware(async ({ files }) => {
      const user = await requireAuth()
      const fileOverrides = files.map((file) => {
        const tempName = generateTempFilename(file.name)
        return { ...file, name: tempName }
      })

      return {
        [UTFiles]: fileOverrides,
        renamedFiles: fileOverrides.map(f => f.name),
        userId: user.id
      }
    })
    .onUploadComplete(async ({ file, metadata }) => {

      return {
        url: file.ufsUrl,
        uploadedFileName: file.name,
        uploadedBy: metadata.userId
      }
    }),

  // Documents
  documents: f({
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 5,
    },
  })
    .middleware(async ({ files }) => {
      const user = await requireAuth()
      const fileOverrides = files.map((file) => {
        const tempName = generateTempFilename(file.name)
        return { ...file, name: tempName }
      })

      return { [UTFiles]: fileOverrides, userId: user.id }
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return {
        url: file.ufsUrl,
        uploadedFileName: file.name,
        uploadedBy: metadata.userId
      }
    }),

  // Videos
  videos: f({
    video: {
      maxFileSize: "64MB",
      maxFileCount: 3,
    },
  })
    .middleware(async ({ files }) => {
      const user = await requireAuth()
      const fileOverrides = files.map((file) => {
        const tempName = generateTempFilename(file.name)
        return { ...file, name: tempName }
      })

      return { [UTFiles]: fileOverrides, userId: user.id }
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return {
        url: file.ufsUrl,
        uploadedFileName: file.name,
        uploadedBy: metadata.userId
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
