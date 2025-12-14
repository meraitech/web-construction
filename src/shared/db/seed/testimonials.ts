import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import { testimonials } from "../schema"

const realisticTestimonials = [
  {
    client_name: "Budi Santoso",
    slug: "budi-santoso",
    position: "CEO PT Green Property Indo",
    message: "Highly professional construction team that delivers on time. The Eco-Green Residence project was executed with perfect attention to detail. Their communication is excellent and they always provide regular progress updates. Highly recommended!"
  },
  {
    client_name: "Sarah Wijaya",
    slug: "sarah-wijaya",
    position: "Project Manager Surabaya Retail Group",
    message: "The Grand Mall renovation went smoothly thanks to this team's expertise. They managed to complete the project without disrupting mall operations. The final result exceeded our expectations, especially the food court area which now looks very modern and comfortable."
  },
  {
    client_name: "Ir. Ahmad Fauzi",
    slug: "ahmad-fauzi",
    position: "Project Director Ministry of Public Works",
    message: "Working together on the Trans-Sumatra Highway project was highly satisfying. They demonstrated high competence in large-scale infrastructure. The quality of work and adherence to safety standards were excellent."
  },
  {
    client_name: "Linda Kurniawan",
    slug: "linda-kurniawan",
    position: "VP Operations Digital Nusantara Corp",
    message: "Tech Valley Office Park was our dream project and this team made it a perfect reality. The smart building concept they implemented is very innovative. Their after-sales service is also very responsive."
  },
  {
    client_name: "Drs. Bambang Setiawan",
    slug: "bambang-setiawan",
    position: "Owner Heritage Hotels Indonesia",
    message: "Heritage building restoration requires extra precision and this team understands that very well. They showed great respect for the building's historical value while delivering modern comfort. Outstanding work!"
  },
  {
    client_name: "Michael Anderson",
    slug: "michael-anderson",
    position: "Regional Director Paradise Resorts Intl",
    message: "We've worked with many construction firms across Asia, and this team stands out for their professionalism and attention to detail. The Bali Beach Resort expansion is being executed flawlessly. Their understanding of luxury resort requirements is exceptional."
  },
  {
    client_name: "Siti Nurhaliza",
    slug: "siti-nurhaliza",
    position: "Property Developer",
    message: "I've entrusted them with 3 residential projects and the results are always satisfying. Premium quality materials, excellent workmanship, and timeline always on track. A partner you can truly rely on!"
  },
  {
    client_name: "David Tan",
    slug: "david-tan",
    position: "CEO Tangerang Commercial Estate",
    message: "Their expertise in commercial buildings is remarkable. From design consultation to final handover, everything was handled professionally. The building they constructed for us has become a landmark in BSD area."
  },
  {
    client_name: "Dewi Anggraini",
    slug: "dewi-anggraini",
    position: "Homeowner",
    message: "My home renovation was executed exceptionally well. Their team is very friendly, work area cleanliness was maintained, and the renovation result is exactly what I wanted. Budget was transparent with no hidden costs. Thank you!"
  },
  {
    client_name: "Ir. Hendra Gunawan",
    slug: "hendra-gunawan",
    position: "Consulting Engineer PT Konstruksi Prima",
    message: "As an engineering consultant, I greatly appreciate this team's professionalism. They are open to technical input and always prioritize quality. Very productive collaboration on several infrastructure projects."
  },
  {
    client_name: "Jennifer Lee",
    slug: "jennifer-lee",
    position: "Interior Designer",
    message: "Working with this construction team is always a pleasure. They understand design concepts quickly and execute them perfectly. The coordination between construction and interior finishing is seamless."
  },
  {
    client_name: "Agus Prasetyo",
    slug: "agus-prasetyo",
    position: "Director PT Maju Makmur",
    message: "Our head office construction went very smoothly. They anticipated all potential issues and provided the right solutions. Their project management is very solid. Extremely satisfied with the results!"
  }
]

async function seed() {
  const { db } = await import("../index")
  console.log("🌱 Seeding testimonials...")

  try {
    console.log(`Payload contains ${realisticTestimonials.length} testimonials. Inserting...`)

    await db.insert(testimonials).values(realisticTestimonials as any)

    console.log("✅ Testimonials seeded successfully!")
  } catch (error) {
    console.error("❌ Seed testimonials failed:", error)
  }

  process.exit(0)
}

seed()
