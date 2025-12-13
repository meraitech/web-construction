CREATE TYPE "public"."project_status" AS ENUM('planning', 'ongoing', 'completed', 'on_hold');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('residential', 'commercial', 'renovation', 'infrastructure');--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"name" varchar(200) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(200) NOT NULL,
	"slug" varchar(250) NOT NULL,
	"client_name" varchar(200),
	"location" varchar(200) NOT NULL,
	"project_type" "project_type" NOT NULL,
	"status" "project_status" NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp,
	"budget" varchar(100),
	"short_description" text NOT NULL,
	"description" text NOT NULL,
	"thumbnail" jsonb,
	"gallery" jsonb,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"slug" varchar(250) NOT NULL,
	"position" varchar(200) NOT NULL,
	"profile" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "teams_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_name" varchar(200) NOT NULL,
	"slug" varchar(250) NOT NULL,
	"position" varchar(200) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "testimonials_slug_unique" UNIQUE("slug")
);
