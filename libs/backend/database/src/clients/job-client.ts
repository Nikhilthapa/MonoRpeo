import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/job/client'

const connectionString = process.env.JOB_DATABASE_URL || process.env.DATABASE_URL || ''

const adapter = new PrismaPg({ connectionString })

const globalForPrisma = globalThis as unknown as {
  jobPrisma: PrismaClient | undefined;
};

export const jobPrisma =
  globalForPrisma.jobPrisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.jobPrisma = jobPrisma;

export type JobPrismaClient = PrismaClient;
export { PrismaClient as JobPrismaClient } from './generated/job/client';
export * from './generated/job/client';
