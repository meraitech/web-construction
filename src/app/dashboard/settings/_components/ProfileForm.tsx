"use client"

import { useState } from "react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { updateProfile } from "@/features/auth/services/account.actions"

interface ProfileFormProps {
  initialData: {
    name: string
    username: string
  }
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setMessage(null)

    const result = await updateProfile(formData)

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
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Masukkan nama lengkap"
            defaultValue={initialData.name}
            required
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
            Username
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Masukkan username"
            defaultValue={initialData.username}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full md:w-auto">
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </form>
  )
}
