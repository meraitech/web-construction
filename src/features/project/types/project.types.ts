import { Project as DrizzleProject } from "@/shared/db/schema"
import { UploadedFile } from "@/shared/types/upload"

export enum ProjectStatus {
  PLANNING = "planning",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  ON_HOLD = "on_hold",
}

export enum ProjectType {
  RESIDENTIAL = "residential",
  COMMERCIAL = "commercial",
  RENOVATION = "renovation",
  INFRASTRUCTURE = "infrastructure",
}

export type ImageFile = UploadedFile

export type Project = DrizzleProject

export interface ProjectsResponse {
  data: Project[]
  total: number
  page: number
  limit: number
}
