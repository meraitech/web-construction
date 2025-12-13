export interface UploadedFile {
  url: string
  key: string
  name: string
  size: number
}

export type UploadEndpoint =
  | "singleImage"
  | "multipleImages"
  | "documents"
  | "videos"
