import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import {
  identityPrisma,
  tenantPrisma,
  organizationPrisma,
  jobPrisma,
  auditPrisma,
  workflowPrisma,
} from '../clients';

type PrismaClientInstance =
  | typeof identityPrisma
  | typeof tenantPrisma
  | typeof organizationPrisma
  | typeof jobPrisma
  | typeof auditPrisma
  | typeof workflowPrisma;

type DomainName =
  | 'identity'
  | 'tenant'
  | 'organization'
  | 'job'
  | 'audit'
  | 'workflow';

@Injectable()
export class DatabaseManager implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseManager.name);
  private clients: Map<DomainName, PrismaClientInstance> = new Map();
  private connectionPromises: Map<DomainName, Promise<any>> = new Map();
  private isShuttingDown = false;
  private shutdownPromise: Promise<void> | null = null;

  constructor() {
    this.clients.set('identity', identityPrisma);
    this.clients.set('tenant', tenantPrisma);
    this.clients.set('organization', organizationPrisma);
    this.clients.set('job', jobPrisma);
    this.clients.set('audit', auditPrisma);
    this.clients.set('workflow', workflowPrisma);
  }

  async getClient<T extends PrismaClientInstance>(
    domain: DomainName,
  ): Promise<T> {
    const client = this.clients.get(domain) as T;
    if (!client) {
      throw new Error(`Database client not found: ${domain}`);
    }

    if (this.connectionPromises.has(domain)) {
      await this.connectionPromises.get(domain);
    } else {
      const connectionPromise = client.$connect();
      this.connectionPromises.set(domain, connectionPromise);
      try {
        await connectionPromise;
      } catch (e) {
        this.connectionPromises.delete(domain);
        throw e;
      }
    }

    return client;
  }

  getIdentityClient() {
    return identityPrisma;
  }

  getTenantClient() {
    return tenantPrisma;
  }

  getOrganizationClient() {
    return organizationPrisma;
  }

  getJobClient() {
    return jobPrisma;
  }

  getAuditClient() {
    return auditPrisma;
  }

  getWorkflowClient() {
    return workflowPrisma;
  }

  async onApplicationShutdown(signal?: string) {
    if (this.isShuttingDown) {
      this.logger.debug(
        `Shutdown already in progress (signal: ${signal || 'undefined'}), skipping duplicate call`,
      );
      return this.shutdownPromise || Promise.resolve();
    }

    this.isShuttingDown = true;
    this.shutdownPromise = this.performShutdown(signal);
    return this.shutdownPromise;
  }

  private async performShutdown(signal?: string) {
    this.logger.log(
      `Shutting down database connections (signal: ${signal || 'undefined'})...`,
    );
    const shutdownPromises = Array.from(this.clients.values()).map((client) =>
      client.$disconnect(),
    );

    await Promise.all(shutdownPromises);
    this.logger.log('All active database connections have been closed.');
  }

  async healthCheck(
    domains: DomainName[],
  ): Promise<{ domain: DomainName; isConnected: boolean }[]> {
    const healthCheckPromises = domains.map(async (domain) => {
      const client = this.clients.get(domain);
      if (!client || !this.connectionPromises.has(domain)) {
        return { domain, isConnected: false };
      }
      try {
        await client.$queryRaw`SELECT 1`;
        return { domain, isConnected: true };
      } catch {
        return { domain, isConnected: false };
      }
    });

    return Promise.all(healthCheckPromises);
  }
}
