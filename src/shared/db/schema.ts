import { pgTable, uuid, varchar, text, timestamp, boolean, pgEnum, jsonb } from "drizzle-orm/pg-core"

// Enums
export const projectTypeEnum = pgEnum("project_type", [
  "residential",
  "commercial",
  "renovation",
  "infrastructure",
])

export const projectStatusEnum = pgEnum("project_status", [
  "planning",
  "ongoing",
  "completed",
  "on_hold",
])

// Tabel Projects
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 250 }).notNull().unique(),
  client_name: varchar("client_name", { length: 200 }),
  location: varchar("location", { length: 200 }).notNull(),
  project_type: projectTypeEnum("project_type").notNull(),
  status: projectStatusEnum("status").notNull(),
  start_date: timestamp("start_date"),
  end_date: timestamp("end_date"),
  budget: varchar("budget", { length: 100 }),
  short_description: text("short_description").notNull(),
  description: text("description").notNull(),

  // Simpan metadata gambar sebagai JSON
  thumbnail: jsonb("thumbnail").$type<{
    url: string
    key: string
    name: string
    size: number
  }>(),

  gallery: jsonb("gallery").$type<Array<{
    url: string
    key: string
    name: string
    size: number
  }>>(),

  featured: boolean("featured").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

// Tabel Teams
export const teams = pgTable("teams", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 250 }).notNull().unique(),
  position: varchar("position", { length: 200 }).notNull(),

  profile: jsonb("profile").$type<{
    url: string
    key: string
    name: string
    size: number
  }>(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

// Tabel Testimonials
export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  client_name: varchar("client_name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 250 }).notNull().unique(),
  position: varchar("position", { length: 200 }).notNull(),
  message: text("message").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

// Export types
export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type Team = typeof teams.$inferSelect
export type NewTeam = typeof teams.$inferInsert
export type Testimonial = typeof testimonials.$inferSelect
export type NewTestimonial = typeof testimonials.$inferInsert
