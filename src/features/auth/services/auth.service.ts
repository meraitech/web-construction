import { db } from "@/shared/db"
import { adminUsers } from "@/shared/db/schema"
import { eq } from "drizzle-orm"

export async function verifyCredentials(username: string, password: string) {
  const user = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.username, username),
  })

  if (!user) {
    return null
  }

  if (user.password !== password) {
    return null
  }

  return {
    id: user.id,
    username: user.username,
    name: user.name,
  }
}
