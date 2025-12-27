import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/audit/client'

const connectionString = process.env.AUDIT_DATABASE_URL || process.env.DATABASE_URL || ''

const adapter = new PrismaPg({ connectionString })

const globalForPrisma = globalThis as unknown as {
  auditPrisma: PrismaClient | undefined;
};

export const auditPrisma =
  globalForPrisma.auditPrisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.auditPrisma = auditPrisma;

export type AuditPrismaClient = PrismaClient;
export { PrismaClient as AuditPrismaClient } from './generated/audit/client';
export * from './generated/audit/client';
