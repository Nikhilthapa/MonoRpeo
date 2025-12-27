import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/workflow/client'

const connectionString = process.env.WORKFLOW_DATABASE_URL || process.env.DATABASE_URL || ''

const adapter = new PrismaPg({ connectionString })

const globalForPrisma = globalThis as unknown as {
  workflowPrisma: PrismaClient | undefined;
};

export const workflowPrisma =
  globalForPrisma.workflowPrisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.workflowPrisma = workflowPrisma;

export type WorkflowPrismaClient = PrismaClient;
export { PrismaClient as WorkflowPrismaClient } from './generated/workflow/client';
export * from './generated/workflow/client';
