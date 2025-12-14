import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import { projects } from "../schema"

const realisticProjects = [
    {
        title: "Eco-Green Residence Jakarta",
        slug: "eco-green-residence-jakarta",
        client_name: "PT Green Property Indo",
        location: "Jakarta Selatan, DKI Jakarta",
        project_type: "residential",
        status: "ongoing",
        start_date: new Date("2024-03-01"),
        end_date: new Date("2026-06-30"),
        budget: "IDR 45.000.000.000",
        short_description: "Hunian vertikal ramah lingkungan dengan konsep green living di jantung Jakarta Selatan.",
        description: "Eco-Green Residence adalah proyek apartemen 20 lantai yang mengusung konsep ramah lingkungan. Dilengkapi dengan panel surya, sistem pengolahan air hujan, dan area hijau vertikal yang luas. Proyek ini bertujuan untuk menyediakan hunian nyaman sekaligus mengurangi jejak karbon di perkotaan.",
        thumbnail: {
            url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
            key: "dummy-thumb-1",
            name: "eco-green-thumb.jpg",
            size: 102400
        },
        gallery: [
            {
                url: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1000&auto=format&fit=crop",
                key: "dummy-gal-1",
                name: "interior-view.jpg",
                size: 204800
            }
        ],
        featured: true
    },
    {
        title: "Grand Mall Surabaya Renovation",
        slug: "grand-mall-surabaya-renovation",
        client_name: "Surabaya Retail Group",
        location: "Surabaya, Jawa Timur",
        project_type: "renovation",
        status: "planning",
        start_date: new Date("2024-09-15"),
        end_date: new Date("2025-12-20"),
        budget: "IDR 12.500.000.000",
        short_description: "Revitalisasi area food court dan lobby utama Grand Mall Surabaya.",
        description: "Proyek renovasi ini mencakup peremajaan desain interior untuk area food court dengan konsep industrial modern, serta perluasan dan modernisasi lobby utama untuk meningkatkan kenyamanan pengunjung. Termasuk upgrade sistem pencahayaan dan HVAC.",
        thumbnail: {
            url: "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?q=80&w=1000&auto=format&fit=crop",
            key: "dummy-thumb-2",
            name: "mall-reno-thumb.jpg",
            size: 102400
        },
        gallery: [],
        featured: false
    },
    {
        title: "Trans-Sumatra Highway Section 4",
        slug: "trans-sumatra-highway-section-4",
        client_name: "Kementerian PUPR",
        location: "Lampung - Palembang",
        project_type: "infrastructure",
        status: "completed",
        start_date: new Date("2021-01-10"),
        end_date: new Date("2023-11-25"),
        budget: "IDR 250.000.000.000",
        short_description: "Pembangunan jalan tol ruas Terbanggi Besar - Pematang Panggang sejauh 50km.",
        description: "Bagian dari proyek strategis nasional Jalan Tol Trans-Sumatera. Seksi 4 ini menghubungkan area vital ekonomi di Lampung menuju Palembang. Konstruksi meliputi 4 jembatan layang dan 2 rest area.",
        thumbnail: {
            url: "https://images.unsplash.com/photo-1545193544-31290e25dfcd?q=80&w=1000&auto=format&fit=crop",
            key: "dummy-thumb-3",
            name: "highway-thumb.jpg",
            size: 102400
        },
        gallery: [],
        featured: true
    },
    {
        title: "Tech Valley Office Park",
        slug: "tech-valley-office-park",
        client_name: "Digital Nusantara Corp",
        location: "BSD City, Tangerang",
        project_type: "commercial",
        status: "ongoing",
        start_date: new Date("2024-05-01"),
        end_date: new Date("2025-10-30"),
        budget: "IDR 80.000.000.000",
        short_description: "Kompleks perkantoran modern untuk perusahaan teknologi dan startup.",
        description: "Pembangunan 3 tower perkantoran setinggi 12 lantai dengan fasilitas smart building. Dilengkapi dengan co-working space, gym, dan area relaksasi outdoor. Desain futuristik dengan fasad kaca hemat energi.",
        thumbnail: {
            url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
            key: "dummy-thumb-4",
            name: "office-park-thumb.jpg",
            size: 102400
        },
        gallery: [],
        featured: true
    },
    {
        title: "Bandung Heritage Hotel Restoration",
        slug: "bandung-heritage-hotel-restoration",
        client_name: "Heritage Hotels Indonesia",
        location: "Bandung, Jawa Barat",
        project_type: "renovation",
        status: "on_hold",
        start_date: new Date("2023-11-01"),
        end_date: null,
        budget: "IDR 8.000.000.000",
        short_description: "Restorasi bangunan cagar budaya menjadi butik hotel.",
        description: "Proyek pemugaran bangunan kolonial bersejarah di jalan Asia Afrika Bandung untuk dialihfungsikan menjadi butik hotel bintang 4. Mempertahankan arsitektur asli art deco sambil menambahkan fasilitas modern di interior.",
        thumbnail: {
            url: "https://images.unsplash.com/photo-1563294025-b46187760775?q=80&w=1000&auto=format&fit=crop",
            key: "dummy-thumb-5",
            name: "heritage-hotel-thumb.jpg",
            size: 102400
        },
        gallery: [],
        featured: false
    },
    {
        title: "Bali Beach Resort Expansion",
        slug: "bali-beach-resort-expansion",
        client_name: "Paradise Resorts Intl",
        location: "Nusa Dua, Bali",
        project_type: "commercial",
        status: "planning",
        start_date: new Date("2025-02-01"),
        end_date: new Date("2026-08-01"),
        budget: "IDR 150.000.000.000",
        short_description: "Penambahan 50 villa mewah dan private beach club.",
        description: "Ekspansi resort eksisting dengan menambahkan cluster villa privat yang masing-masing memiliki kolam renang pribadi. Termasuk pembangunan beach club baru dengan kapasitas 500 orang.",
        thumbnail: {
            url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop",
            key: "dummy-thumb-6",
            name: "resort-thumb.jpg",
            size: 102400
        },
        gallery: [],
        featured: true
    }
]

async function seed() {
    const { db } = await import("../index")
    console.log("🌱 Seeding projects...")

    try {
        // Optional: Clear existing projects? Or just append?
        // Let's just append for now, or check for duplicates if slug exists.
        // For simplicity in this seed, let's just insert.

        // We can loop and use onConflictDoNothing if we wanted to be safe, 
        // but the requirement is just to make a seeder.
        // Let's stick to simple insert. If run twice, it might fail on unique slug constraint.

        console.log(`Payload contains ${realisticProjects.length} projects. Inserting...`)

        // Using Promise.all to insert in parallel or just one big insert if DB supports it.
        // Drizzle insert().values([...]) supports array.

        // We'll cast the strings to the specific enum types if needed by TS, 
        // but Drizzle usually handles string matching to enum.

        await db.insert(projects).values(realisticProjects as any)

        console.log("✅ Projects seeded successfully!")
    } catch (error) {
        console.error("❌ Seed projects failed:", error)
        // Don't throw if it's just a duplicate key error for better DX? 
        // No, let's see the error.
    }

    process.exit(0)
}

seed()
