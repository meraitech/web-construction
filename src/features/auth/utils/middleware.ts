import { redirect } from "next/navigation"
import { getCurrentUser } from "@/features/auth/services/auth.actions"

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}
