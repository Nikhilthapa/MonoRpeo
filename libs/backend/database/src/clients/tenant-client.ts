import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/tenant/client'

const connectionString = process.env.TENANT_DATABASE_URL || process.env.DATABASE_URL || ''

const adapter = new PrismaPg({ connectionString })

const globalForPrisma = globalThis as unknown as {
  tenantPrisma: PrismaClient | undefined;
};

export const tenantPrisma =
  globalForPrisma.tenantPrisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.tenantPrisma = tenantPrisma;

export type TenantPrismaClient = PrismaClient;
export { PrismaClient as TenantPrismaClient } from './generated/tenant/client';
export * from './generated/tenant/client';
