import "dotenv/config"
import { db } from "../index"
import { adminUsers } from "../schema"

async function seed() {
  console.log("🌱 Seeding database...")

  try {
    const existingUser = await db.query.adminUsers.findFirst()

    if (existingUser) {
      console.log("⚠️  Admin user already exists, skipping seed...")
      return
    }

    await db.insert(adminUsers).values({
      username: "admin",
      password: "admin123",
      name: "Administrator",
    })

    console.log("✅ Seed completed successfully!")
    console.log("\n📝 Dummy Admin User:")
    console.log("   Username: admin")
    console.log("   Password: admin123")
    console.log("\n⚠️  IMPORTANT: Change this password in production!")
  } catch (error) {
    console.error("❌ Seed failed:", error)
    throw error
  }

  process.exit(0)
}

seed()