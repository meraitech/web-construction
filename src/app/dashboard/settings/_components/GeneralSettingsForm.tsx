"use client"

import { useState } from "react"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Button } from "@/shared/components/ui/button"
import { updateGeneralSettings } from "@/features/settings/services/settings.actions"
import type { GeneralSettings } from "@/features/settings/types/settings.types"

interface GeneralSettingsFormProps {
  initialData: GeneralSettings
}

export function GeneralSettingsForm({ initialData }: GeneralSettingsFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setMessage(null)

    const result = await updateGeneralSettings(formData)

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
          className={`p-4 rounded-lg border ${message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
            }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="company_name" className="block text-sm font-semibold text-gray-700 mb-2">
            Company Name
          </label>
          <Input
            id="company_name"
            name="company_name"
            type="text"
            placeholder="e.g. Construction Co Ltd"
            defaultValue={initialData.company_name}
            required
          />
        </div>

        <div>
          <label htmlFor="company_description" className="block text-sm font-semibold text-gray-700 mb-2">
            Company Description
          </label>
          <Textarea
            id="company_description"
            name="company_description"
            placeholder="Brief description of your company"
            defaultValue={initialData.company_description}
            required
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
            Address
          </label>
          <Textarea
            id="address"
            name="address"
            placeholder="Full company address"
            defaultValue={initialData.address}
            required
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 234 567 890"
            defaultValue={initialData.phone}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="info@company.com"
            defaultValue={initialData.email}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full md:w-auto">
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
