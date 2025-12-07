# Web Construction - Company Profile & Project Management

A modern web application for construction company profile and project management system built with Next.js 16, TypeScript, and PostgreSQL.

## Tech Stack

- **Framework**: Next.js 16.0.7 (App Router, Turbopack)
- **Language**: TypeScript 5.9.3
- **UI**: React 19.2.1, Tailwind CSS 4.1.17, Radix UI
- **Database**: PostgreSQL (Neon) + Drizzle ORM
- **File Upload**: UploadThing
- **Form**: React Hook Form + Zod
- **Animation**: GSAP

## Features

- Project management dashboard
- File upload (thumbnails & galleries)
- Dynamic breadcrumbs & navigation
- Responsive sidebar
- Project CRUD operations
- Image gallery management
- Type-safe database operations

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended)
- PostgreSQL database (Neon)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Copy environment variables:

```bash
cp .env.example .env.local
```

4. Configure your `.env.local`:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `UPLOADTHING_TOKEN`: Your UploadThing API token

5. Push database schema:

```bash
pnpm db:push
```

6. Run development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Open Drizzle Studio

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── api/              # API routes
│   └── _components/      # App-level components
├── features/              # Feature modules
│   └── project/          # Project feature
│       ├── services/     # Business logic
│       ├── types/        # TypeScript types
│       └── utils/        # Utilities
└── shared/               # Shared resources
    ├── components/       # Reusable components
    ├── db/              # Database schema
    ├── lib/             # Utilities
    └── styles/          # Global styles
```

## Database Schema

### Projects Table
- Project information (title, slug, client, location)
- Project type & status enums
- Date tracking (start, end, created, updated)
- JSON storage for images (thumbnail, gallery)
- Featured flag

## Deploy on Vercel

The easiest way to deploy is using [Vercel Platform](https://vercel.com/new):

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

For more details, check [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
