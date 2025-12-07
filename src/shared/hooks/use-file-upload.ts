"use client"

import { UploadedFile } from "@/shared/components/upload/ImageUpload"
import { useRef } from "react"
import { deleteUploadedFiles, FileRenameConfig, renameUploadedFiles } from "../services/uploadthing.action"

interface UseFileUploadConfig {
  category: string
  getEntityName: () => string
}

export function useFileUpload({ category, getEntityName }: UseFileUploadConfig) {
  const deletedFilesRef = useRef<string[]>([])
  const isFormSubmittedRef = useRef(false)

  const trackDeletedFile = (fileKey: string) => {
    deletedFilesRef.current.push(fileKey)
  }

  const buildRenameConfigs = (
    files: Array<{ key: string; name: string; type: string; index?: number }>
  ): FileRenameConfig[] => {
    const entityName = getEntityName()

    const configs = files
      .filter(file => {
        const isTemp = file.name.startsWith('temp-')
        return isTemp
      })
      .map(file => ({
        key: file.key,
        category,
        type: file.type,
        entityName,
        index: file.index,
      }))

    return configs
  }

  const cleanupOnCancel = async (
    currentFiles: {
      thumbnail?: UploadedFile | null
      gallery?: UploadedFile[] | null
      [key: string]: any
    },
    initialFiles?: {
      thumbnail?: UploadedFile | null
      gallery?: UploadedFile[] | null
      [key: string]: any
    }
  ) => {
    const filesToDelete: string[] = [...deletedFilesRef.current]

    if (!isFormSubmittedRef.current) {
      if (currentFiles.thumbnail?.key) {
        const isNew = !initialFiles?.thumbnail ||
          initialFiles.thumbnail.key !== currentFiles.thumbnail.key
        if (isNew) {
          filesToDelete.push(currentFiles.thumbnail.key)
        }
      }

      if (currentFiles.gallery && currentFiles.gallery.length > 0) {
        const initialKeys = initialFiles?.gallery?.map(f => f.key) || []
        const newFiles = currentFiles.gallery.filter(f => !initialKeys.includes(f.key))
        filesToDelete.push(...newFiles.map(f => f.key))
      }

      Object.keys(currentFiles).forEach(key => {
        if (key !== 'thumbnail' && key !== 'gallery') {
          const current = currentFiles[key]
          const initial = initialFiles?.[key]

          if (Array.isArray(current)) {
            const initialKeys = Array.isArray(initial) ? initial.map((f: any) => f.key) : []
            const newFiles = current.filter((f: any) => f?.key && !initialKeys.includes(f.key))
            filesToDelete.push(...newFiles.map((f: any) => f.key))
          } else if (current?.key) {
            const isNew = !initial || initial.key !== current.key
            if (isNew) filesToDelete.push(current.key)
          }
        }
      })
    }

    if (filesToDelete.length > 0) {
      await deleteUploadedFiles(filesToDelete)
    }
  }

  const processOnSubmit = async (
    currentFiles: {
      thumbnail?: UploadedFile | null
      gallery?: UploadedFile[] | null
      [key: string]: any
    },
    initialFiles?: {
      thumbnail?: UploadedFile | null
      gallery?: UploadedFile[] | null
      [key: string]: any
    }
  ) => {
    isFormSubmittedRef.current = true

    // Delete removed files
    if (deletedFilesRef.current.length > 0) {
      await deleteUploadedFiles(deletedFilesRef.current)
    }

    // Collect files to rename
    const filesToRename: Array<{ key: string; name: string; type: string; index?: number }> = []

    // Thumbnail
    if (currentFiles.thumbnail?.key && currentFiles.thumbnail.name) {
      const isNew = !initialFiles?.thumbnail ||
        initialFiles.thumbnail.key !== currentFiles.thumbnail.key

      if (isNew && currentFiles.thumbnail.name.startsWith('temp-')) {
        filesToRename.push({
          key: currentFiles.thumbnail.key,
          name: currentFiles.thumbnail.name,
          type: 'thumbnail',
        })
      }
    }

    // Gallery
    if (currentFiles.gallery && currentFiles.gallery.length > 0) {
      const initialKeys = initialFiles?.gallery?.map(f => f.key) || []
      const newFiles = currentFiles.gallery.filter(f => !initialKeys.includes(f.key))

      newFiles.forEach((file, index) => {
        if (file.name.startsWith('temp-')) {
          filesToRename.push({
            key: file.key,
            name: file.name,
            type: 'gallery',
            index,
          })
        }
      })
    }

    // Rename files
    if (filesToRename.length > 0) {
      const renameConfigs = buildRenameConfigs(filesToRename)
      const result = await renameUploadedFiles(renameConfigs)

      if (!result.success) {
        throw new Error("Failed to rename files")
      }

      return result
    }

    return { success: true, renamedFiles: [] }
  }

  return {
    trackDeletedFile,
    cleanupOnCancel,
    processOnSubmit,
    isFormSubmitted: () => isFormSubmittedRef.current,
  }
}
