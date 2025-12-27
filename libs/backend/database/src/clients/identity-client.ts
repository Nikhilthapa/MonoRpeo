import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/identity/client'

const connectionString = process.env.IDENTITY_DATABASE_URL || process.env.DATABASE_URL || ''

const adapter = new PrismaPg({ connectionString })

const globalForPrisma = globalThis as unknown as {
  identityPrisma: PrismaClient | undefined;
};

export const identityPrisma =
  globalForPrisma.identityPrisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.identityPrisma = identityPrisma;

export type IdentityPrismaClient = PrismaClient;
export { PrismaClient as IdentityPrismaClient } from './generated/identity/client';
export * from './generated/identity/client';
