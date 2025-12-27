// Domain-based Prisma Clients
// Each domain has its own database and Prisma client

export * from './identity-client';
export * from './tenant-client';
export * from './organization-client';
export * from './job-client';
export * from './audit-client';
export * from './workflow-client';

// Legacy exports for backward compatibility
export { identityPrisma as prisma } from './identity-client';
export type { IdentityPrismaClient as PrismaClientType } from './identity-client';
