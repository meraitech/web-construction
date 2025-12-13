"use client"

import { useState } from "react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { changePassword } from "@/features/auth/services/account.actions"
import { Eye, EyeOff } from "lucide-react"

export function ChangePasswordForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setMessage(null)

    const result = await changePassword(formData)

    if (result.success) {
      setMessage({ type: "success", text: result.message! })
      const form = document.getElementById("password-form") as HTMLFormElement
      form?.reset()
    } else {
      setMessage({ type: "error", text: result.error! })
    }

    setLoading(false)
  }

  return (
    <form id="password-form" action={handleSubmit} className="space-y-6">
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
          <label htmlFor="current_password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password Saat Ini
          </label>
          <div className="relative">
            <Input
              id="current_password"
              name="current_password"
              type={showPasswords.current ? "text" : "password"}
              placeholder="Masukkan password saat ini"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="new_password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password Baru
          </label>
          <div className="relative">
            <Input
              id="new_password"
              name="new_password"
              type={showPasswords.new ? "text" : "password"}
              placeholder="Masukkan password baru"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirm_password" className="block text-sm font-semibold text-gray-700 mb-2">
            Konfirmasi Password Baru
          </label>
          <div className="relative">
            <Input
              id="confirm_password"
              name="confirm_password"
              type={showPasswords.confirm ? "text" : "password"}
              placeholder="Konfirmasi password baru"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full md:w-auto">
        {loading ? "Mengubah..." : "Ubah Password"}
      </Button>
    </form>
  )
}
