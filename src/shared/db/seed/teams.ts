import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import { teams } from "../schema"

const realisticTeams = [
    {
        name: "John Anderson",
        slug: "john-anderson",
        position: "Chief Executive Officer",
        profile: {
            url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
            key: "dummy-profile-1",
            name: "john-anderson.jpg",
            size: 51200
        }
    },
    {
        name: "Sarah Mitchell",
        slug: "sarah-mitchell",
        position: "Chief Operating Officer",
        profile: {
            url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
            key: "dummy-profile-2",
            name: "sarah-mitchell.jpg",
            size: 51200
        }
    },
    {
        name: "Michael Chen",
        slug: "michael-chen",
        position: "Project Director",
        profile: {
            url: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&auto=format&fit=crop",
            key: "dummy-profile-3",
            name: "michael-chen.jpg",
            size: 51200
        }
    },
    {
        name: "Emily Rodriguez",
        slug: "emily-rodriguez",
        position: "Head of Design & Architecture",
        profile: {
            url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
            key: "dummy-profile-4",
            name: "emily-rodriguez.jpg",
            size: 51200
        }
    },
    {
        name: "David Thompson",
        slug: "david-thompson",
        position: "Senior Project Manager",
        profile: {
            url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
            key: "dummy-profile-5",
            name: "david-thompson.jpg",
            size: 51200
        }
    },
    {
        name: "Jessica Wang",
        slug: "jessica-wang",
        position: "Chief Financial Officer",
        profile: {
            url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=400&auto=format&fit=crop",
            key: "dummy-profile-6",
            name: "jessica-wang.jpg",
            size: 51200
        }
    },
    {
        name: "Robert Kumar",
        slug: "robert-kumar",
        position: "Head of Engineering",
        profile: {
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
            key: "dummy-profile-7",
            name: "robert-kumar.jpg",
            size: 51200
        }
    },
    {
        name: "Amanda Foster",
        slug: "amanda-foster",
        position: "Quality Assurance Manager",
        profile: {
            url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
            key: "dummy-profile-8",
            name: "amanda-foster.jpg",
            size: 51200
        }
    },
    {
        name: "Christopher Lee",
        slug: "christopher-lee",
        position: "Safety & Compliance Director",
        profile: {
            url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
            key: "dummy-profile-9",
            name: "christopher-lee.jpg",
            size: 51200
        }
    }
]

async function seed() {
    const { db } = await import("../index")
    console.log("🌱 Seeding teams...")

    try {
        console.log(`Payload contains ${realisticTeams.length} team members. Inserting...`)

        await db.insert(teams).values(realisticTeams as any)

        console.log("✅ Teams seeded successfully!")
    } catch (error) {
        console.error("❌ Seed teams failed:", error)
    }

    process.exit(0)
}

seed()
