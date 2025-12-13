import { cookies } from "next/headers"
import { AuthSession } from "../types/auth.types"

const SESSION_COOKIE_NAME = "admin_session"

export async function createSession(session: AuthSession) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  })
}

export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (!sessionCookie) {
    return null
  }

  try {
    return JSON.parse(sessionCookie.value)
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
