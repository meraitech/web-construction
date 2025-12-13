export interface GeneralSettings {
  company_name: string
  company_description: string
  address: string
  phone: string
  email: string
}

export interface SocialMediaSettings {
  facebook: string
  instagram: string
  linkedin: string
  twitter: string
  youtube: string
  tiktok: string
}

export type SettingsKey = keyof GeneralSettings | keyof SocialMediaSettings
