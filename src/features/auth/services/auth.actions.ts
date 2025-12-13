"use server"

import { redirect } from "next/navigation"
import { verifyCredentials } from "./auth.service"
import { createSession, destroySession, getSession } from "../utils/session"
import { loginSchema } from "../utils/validation"

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  const validation = loginSchema.safeParse({ username, password })

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.errors[0].message,
    }
  }

  const user = await verifyCredentials(username, password)

  if (!user) {
    return {
      success: false,
      error: "Username atau password salah",
    }
  }

  await createSession({
    id: user.id,
    username: user.username,
    name: user.name,
  })

  redirect("/dashboard")
}

export async function logoutAction() {
  await destroySession()
  redirect("/login")
}

export async function getCurrentUser() {
  return await getSession()
}
