"use client"

import { useState } from "react"
import { useUploadThing } from "@/shared/lib/uploadthing"
import { Button } from "@/shared/components/ui/button"
import { X, Upload, Loader2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/shared/lib/utils"

export interface UploadedFile {
  url: string
  key: string
  name: string
  size: number
}

interface ImageUploadProps {
  value?: UploadedFile | UploadedFile[] | null
  onChange: (value: UploadedFile | UploadedFile[] | null | undefined) => void
  onDelete?: (fileKey: string) => void
  multiple?: boolean
  maxFiles?: number
  endpoint?: "singleImage" | "multipleImages"
  disabled?: boolean
}

export function ImageUpload({
  value,
  onChange,
  onDelete,
  multiple = false,
  maxFiles = 10,
  endpoint,
  disabled = false
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const selectedEndpoint = endpoint || (multiple ? "multipleImages" : "singleImage")
  const { startUpload } = useUploadThing(selectedEndpoint)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (multiple) {
      const current = Array.isArray(value) ? value : []
      const totalFiles = current.length + files.length
      if (totalFiles > maxFiles) {
        alert(`Maksimal ${maxFiles} gambar`)
        return
      }
    }

    setUploading(true)
    try {
      const uploaded = await startUpload(Array.from(files))
      if (!uploaded) throw new Error("Upload failed")

      const imageData: UploadedFile[] = uploaded.map((file) => {
        const actualFileName = (file.serverData as any)?.uploadedFileName || file.name

        return {
          url: file.ufsUrl,
          key: file.key,
          name: actualFileName,
          size: file.size,
        }
      })

      if (multiple) {
        const current = Array.isArray(value) ? value : []
        onChange([...current, ...imageData])
      } else {
        onChange(imageData[0])
      }
    } catch (error) {
      alert("Gagal upload gambar")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = (index?: number) => {
    if (multiple && typeof index === "number") {
      const current = Array.isArray(value) ? value : []
      const fileToRemove = current[index]

      if (onDelete && fileToRemove) {
        onDelete(fileToRemove.key)
      }

      onChange(current.filter((_, i) => i !== index))
    } else {
      if (onDelete && value && !Array.isArray(value)) {
        onDelete(value.key)
      }

      onChange(null)
    }
  }

  const images: UploadedFile[] = multiple
    ? (Array.isArray(value) ? value : [])
    : (value && !Array.isArray(value) ? [value] : [])

  const canUploadMore = multiple ? images.length < maxFiles : images.length === 0

  return (
    <div className="space-y-4">
      <div className={cn(
        "grid gap-4",
        multiple
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : "grid-cols-1"
      )}>
        {images.map((img, idx) => (
          <div
            key={img.key}
            className={cn(
              "relative rounded-lg overflow-hidden border group",
              multiple
                ? "aspect-square"
                : "aspect-video max-w-3xl"
            )}
          >
            <Image
              src={img.url}
              alt={img.name}
              fill
              className="object-cover"
              sizes={multiple
                ? "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                : "(max-width: 768px) 100vw, 900px"
              }
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(multiple ? idx : undefined)}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {img.name}
            </div>
          </div>
        ))}

        {canUploadMore && (
          <label
            className={cn(
              "relative rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 hover:border-primary transition-all",
              multiple
                ? "aspect-square"
                : "aspect-video max-w-3xl"
            )}
          >
            <input
              type="file"
              accept="image/*"
              multiple={multiple}
              onChange={handleUpload}
              disabled={uploading || disabled}
              className="hidden"
            />
            {uploading ? (
              <>
                <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                <span className="text-xs font-medium text-muted-foreground">
                  Click to upload
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {multiple ? "" : "PNG, JPG up to 4MB"}
                </span>
              </>
            )}
          </label>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Max 4MB per file. {multiple ? `Maksimal ${maxFiles} gambar.` : "Rasio 16:9 recommended."}
        </span>
        {images.length > 0 && (
          <span className="font-medium">
            {images.length} {multiple ? "files" : "file"} uploaded
          </span>
        )}
      </div>
    </div>
  )
}
