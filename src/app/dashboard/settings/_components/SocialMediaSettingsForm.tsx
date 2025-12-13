"use client"

import { useState } from "react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { updateSocialMediaSettings } from "@/features/settings/services/settings.actions"
import type { SocialMediaSettings } from "@/features/settings/types/settings.types"
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

interface SocialMediaSettingsFormProps {
  initialData: SocialMediaSettings
}

export function SocialMediaSettingsForm({ initialData }: SocialMediaSettingsFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setMessage(null)

    const result = await updateSocialMediaSettings(formData)

    if (result.success) {
      setMessage({ type: "success", text: result.message! })
    } else {
      setMessage({ type: "error", text: result.error! })
    }

    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="facebook" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Facebook className="w-4 h-4" />
            Facebook
          </label>
          <Input
            id="facebook"
            name="facebook"
            type="url"
            placeholder="https://facebook.com/username"
            defaultValue={initialData.facebook}
          />
        </div>

        <div>
          <label htmlFor="instagram" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Instagram
          </label>
          <Input
            id="instagram"
            name="instagram"
            type="url"
            placeholder="https://instagram.com/username"
            defaultValue={initialData.instagram}
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </label>
          <Input
            id="linkedin"
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/company/username"
            defaultValue={initialData.linkedin}
          />
        </div>

        <div>
          <label htmlFor="twitter" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Twitter className="w-4 h-4" />
            Twitter / X
          </label>
          <Input
            id="twitter"
            name="twitter"
            type="url"
            placeholder="https://twitter.com/username"
            defaultValue={initialData.twitter}
          />
        </div>

        <div>
          <label htmlFor="youtube" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Youtube className="w-4 h-4" />
            YouTube
          </label>
          <Input
            id="youtube"
            name="youtube"
            type="url"
            placeholder="https://youtube.com/@username"
            defaultValue={initialData.youtube}
          />
        </div>

        <div>
          <label htmlFor="tiktok" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            TikTok
          </label>
          <Input
            id="tiktok"
            name="tiktok"
            type="url"
            placeholder="https://tiktok.com/@username"
            defaultValue={initialData.tiktok}
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full md:w-auto">
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </form>
  )
}
