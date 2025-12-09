import { Team } from "@/shared/db/schema"

export type { Team }

export interface TeamFormData {
  name: string
  position: string
  profile: {
    url: string
    key: string
    name: string
    size: number
  } | null
}

export interface TeamsResponse {
  data: Team[]
  total: number
  page: number
  limit: number
}
