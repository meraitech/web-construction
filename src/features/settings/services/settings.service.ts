import { db } from "@/shared/db"
import { settings } from "@/shared/db/schema"
import { eq } from "drizzle-orm"

export async function getSetting(key: string): Promise<string | null> {
  const setting = await db.query.settings.findFirst({
    where: eq(settings.key, key),
  })

  return setting?.value || null
}

export async function getSettings(keys: string[]): Promise<Record<string, string>> {
  const settingsData = await db.query.settings.findMany()

  const result: Record<string, string> = {}

  keys.forEach((key) => {
    const setting = settingsData.find((s) => s.key === key)
    result[key] = setting?.value || ""
  })

  return result
}

export async function updateSetting(key: string, value: string) {
  const existingSetting = await db.query.settings.findFirst({
    where: eq(settings.key, key),
  })

  if (existingSetting) {
    await db
      .update(settings)
      .set({ value, updated_at: new Date() })
      .where(eq(settings.key, key))
  } else {
    await db.insert(settings).values({ key, value })
  }
}

export async function updateSettings(data: Record<string, string>) {
  for (const [key, value] of Object.entries(data)) {
    await updateSetting(key, value)
  }
}
