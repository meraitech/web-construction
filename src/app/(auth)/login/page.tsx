"use client"

import { useState } from "react"
import { loginAction } from "@/features/auth/services/auth.actions"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"

export default function LoginPage() {
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")

    const result = await loginAction(formData)

    if (result && !result.success) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Login Dashboard</h1>
        <p className="text-gray-600 text-sm">Masukkan kredensial Anda untuk melanjutkan</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form action={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
            Username
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Masukkan username"
            required
            autoComplete="username"
            className="h-11"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Masukkan password"
            required
            autoComplete="current-password"
            className="h-11"
          />
        </div>

        <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  )
}