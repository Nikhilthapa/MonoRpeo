# Prisma Single Database Architecture

This directory contains a unified Prisma schema organized by category (Auth, Job, Company, Vendor). All models are in a single database, allowing for cross-category relationships and queries while maintaining logical organization.

## Structure

```
prisma/
├── schema.prisma          # Unified schema with all models organized by category
├── seed.ts                # Unified seed script for all categories
├── clients/               # Prisma client wrapper
│   └── index.ts          # Single Prisma client instance
└── shared/                # Shared utilities (reference)
    ├── base.prisma
    └── enums.prisma
```

## Schema Organization

The `schema.prisma` file is organized into categories:

- **AUTH CATEGORY** - User authentication, system roles, permissions, and user profiles
- **JOB CATEGORY** - Job postings, applications, saved jobs, and skills
- **COMPANY CATEGORY** - Company management, company users, roles, and permissions
- **VENDOR CATEGORY** - Vendor management, vendor users, roles, and permissions

## Setup

### 1. Environment Variables

Create a `.env` file at the root with a single database URL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/hirenova?schema=public"
```

For production with connection pooling:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/hirenova?schema=public&connection_limit=10&pool_timeout=20"
```

### 2. Generate Prisma Client

```bash
npm run prisma:generate
```

### 3. Run Migrations

```bash
npm run prisma:migrate
```

### 4. Seed Database

```bash
npm run prisma:seed
```

This will create:
- System permissions and roles
- Company permissions
- Vendor permissions
- Super Admin role with all system permissions
- Super Admin user (email: `admin@hirenova.com`, password: `admin123`)
- Sample skills

**⚠️ Important**: Change the default super admin password after first login!

## Available Scripts

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Create and run migrations (development)
- `npm run prisma:migrate:deploy` - Deploy migrations (production)
- `npm run prisma:seed` - Seed the database
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:push` - Push schema changes to database (development)

## Usage in Code

Import the Prisma client in your application:

```typescript
import { prisma } from '@/prisma/clients';

// Access all models through single client
const user = await prisma.user.findUnique({ where: { email: '...' } });
const jobs = await prisma.job.findMany({ where: { status: 'PUBLISHED' } });
const company = await prisma.company.findUnique({ where: { id: '...' } });
const vendor = await prisma.vendor.findUnique({ where: { id: '...' } });

// Cross-category queries are possible
const jobWithCompany = await prisma.job.findUnique({
  where: { id: '...' },
  include: { company: true }
});

const userWithApplications = await prisma.user.findUnique({
  where: { id: '...' },
  include: {
    jobApplications: {
      include: { job: true }
    }
  }
});
```

## Category Responsibilities

### Auth Category
- User authentication and authorization
- System roles and permissions (SystemRole, SystemPermission)
- User profiles (skills, experience, education, resumes)

### Job Category
- Job postings
- Job applications
- Saved jobs
- Job skills (references shared Skill model)

### Company Category
- Company profiles
- Company users and roles
- Company-scoped permissions (CompanyPermission)

### Vendor Category
- Vendor profiles
- Vendor users and roles
- Vendor-scoped permissions (VendorPermission)

## Benefits

1. **Simplicity:** One database, one client, easier to manage
2. **Relationships:** Can maintain foreign key relationships across categories
3. **Transactions:** Cross-category transactions possible
4. **Performance:** Single connection pool
5. **Development:** Easier local development setup
6. **Queries:** Can easily query across categories with joins

## Model Relationships

- **User** ↔ **CompanyUser** ↔ **Company**
- **User** ↔ **VendorUser** ↔ **Vendor**
- **User** ↔ **JobApplication** ↔ **Job** ↔ **Company**
- **User** ↔ **UserSkill** ↔ **Skill** ↔ **JobSkill** ↔ **Job**
- **Company** ↔ **CompanyRole** ↔ **CompanyPermission**
- **Vendor** ↔ **VendorRole** ↔ **VendorPermission**

## Production Deployment

For production, use the deploy command:

```bash
npm run prisma:migrate:deploy
```

This will run migrations without prompting and is suitable for CI/CD pipelines.

## Prisma Studio

Open Prisma Studio to view and edit your database:

```bash
npm run prisma:studio
```

This opens a web interface where you can browse all tables across all categories.
