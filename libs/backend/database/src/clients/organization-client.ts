import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/organization/client'

const connectionString = process.env.ORGANIZATION_DATABASE_URL || process.env.DATABASE_URL || ''

const adapter = new PrismaPg({ connectionString })

const globalForPrisma = globalThis as unknown as {
  organizationPrisma: PrismaClient | undefined;
};

export const organizationPrisma =
  globalForPrisma.organizationPrisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.organizationPrisma = organizationPrisma;

export type OrganizationPrismaClient = PrismaClient;
export { PrismaClient as OrganizationPrismaClient } from './generated/organization/client';
export * from './generated/organization/client';
