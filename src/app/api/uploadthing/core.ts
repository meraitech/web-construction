import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UTFiles } from "uploadthing/server"

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
      const fileOverrides = files.map((file) => {
        const tempName = generateTempFilename(file.name)
        return { ...file, name: tempName }
      })

      return {
        [UTFiles]: fileOverrides,
        renamedFiles: fileOverrides.map(f => f.name),
      }
    })
    .onUploadComplete(async ({ file, metadata }) => {

      return {
        url: file.ufsUrl,
        uploadedFileName: file.name,
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
      const fileOverrides = files.map((file) => {
        const tempName = generateTempFilename(file.name)
        return { ...file, name: tempName }
      })

      return {
        [UTFiles]: fileOverrides,
        renamedFiles: fileOverrides.map(f => f.name),
      }
    })
    .onUploadComplete(async ({ file, metadata }) => {

      return {
        url: file.ufsUrl,
        uploadedFileName: file.name,
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
      const fileOverrides = files.map((file) => {
        const tempName = generateTempFilename(file.name)
        return { ...file, name: tempName }
      })

      return { [UTFiles]: fileOverrides }
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
        uploadedFileName: file.name,
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
      const fileOverrides = files.map((file) => {
        const tempName = generateTempFilename(file.name)
        return { ...file, name: tempName }
      })

      return { [UTFiles]: fileOverrides }
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
        uploadedFileName: file.name,
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
