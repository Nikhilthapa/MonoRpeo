import 'dotenv/config'

// Multi-database Prisma configuration
// Each domain has its own schema and database

export const prismaSchemas = {
  identity: {
    schema: 'prisma/schemas/identity/schema.prisma',
    migrations: 'prisma/migrations/identity',
    databaseUrl: process.env.IDENTITY_DATABASE_URL || process.env.DATABASE_URL,
  },
  tenant: {
    schema: 'prisma/schemas/tenant/schema.prisma',
    migrations: 'prisma/migrations/tenant',
    databaseUrl: process.env.TENANT_DATABASE_URL || process.env.DATABASE_URL,
  },
  organization: {
    schema: 'prisma/schemas/organization/schema.prisma',
    migrations: 'prisma/migrations/organization',
    databaseUrl: process.env.ORGANIZATION_DATABASE_URL || process.env.DATABASE_URL,
  },
  job: {
    schema: 'prisma/schemas/job/schema.prisma',
    migrations: 'prisma/migrations/job',
    databaseUrl: process.env.JOB_DATABASE_URL || process.env.DATABASE_URL,
  },
  audit: {
    schema: 'prisma/schemas/audit/schema.prisma',
    migrations: 'prisma/migrations/audit',
    databaseUrl: process.env.AUDIT_DATABASE_URL || process.env.DATABASE_URL,
  },
  workflow: {
    schema: 'prisma/schemas/workflow/schema.prisma',
    migrations: 'prisma/migrations/workflow',
    databaseUrl: process.env.WORKFLOW_DATABASE_URL || process.env.DATABASE_URL,
  },
} as const

export type DomainName = keyof typeof prismaSchemas

// Default config (for backward compatibility)
export default {
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
}
