import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import {
  jobClient,
  scraperClient,
  researchClient,
  crmClient,
  contentClient,
  emailClient,
} from '..';

type PrismaClientInstance =
  | typeof jobClient
  | typeof scraperClient
  | typeof researchClient
  | typeof crmClient
  | typeof contentClient
  | typeof emailClient;

type ClientName = 'job' | 'scraper' | 'research' | 'crm' | 'content' | 'email';

@Injectable()
export class DatabaseManager implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseManager.name);
  private clients: Map<ClientName, PrismaClientInstance> = new Map();
  private connectionPromises: Map<ClientName, Promise<any>> = new Map();
  private isShuttingDown = false;
  private shutdownPromise: Promise<void> | null = null;

  constructor() {
    this.clients.set('job', jobClient);
    this.clients.set('scraper', scraperClient);
    this.clients.set('research', researchClient);
    this.clients.set('crm', crmClient);
    this.clients.set('content', contentClient);
    this.clients.set('email', emailClient);
  }

  async getClient<T extends PrismaClientInstance>(
    name: ClientName
  ): Promise<T> {
    const client = this.clients.get(name) as T;
    if (!client) {
      throw new Error(`Database client not found: ${name}`);
    }

    if (this.connectionPromises.has(name)) {
      await this.connectionPromises.get(name);
    } else {
      const connectionPromise = client.connect();
      this.connectionPromises.set(name, connectionPromise);
      try {
        await connectionPromise;
      } catch (e) {
        this.connectionPromises.delete(name);
        throw e;
      }
    }

    return client;
  }

  async onApplicationShutdown(signal?: string) {
    // Prevent duplicate shutdown calls
    if (this.isShuttingDown) {
      this.logger.debug(
        `Shutdown already in progress (signal: ${signal || 'undefined'}), skipping duplicate call`
      );
      return this.shutdownPromise || Promise.resolve();
    }

    this.isShuttingDown = true;
    this.shutdownPromise = this.performShutdown(signal);
    return this.shutdownPromise;
  }

  private async performShutdown(signal?: string) {
    this.logger.log(
      `Shutting down database connections (signal: ${signal || 'undefined'})...`
    );
    const shutdownPromises = Array.from(this.connectionPromises.keys()).map(
      (name) => this.clients.get(name)?.disconnect()
    );

    await Promise.all(shutdownPromises);
    this.logger.log('All active database connections have been closed.');
  }

  async healthCheck(
    clientNames: ClientName[]
  ): Promise<{ name: ClientName; isConnected: boolean }[]> {
    const healthCheckPromises = clientNames.map(async (name) => {
      const client = this.clients.get(name);
      if (!client || !this.connectionPromises.has(name)) {
        return { name, isConnected: false };
      }
      const isConnected = await client.healthCheck();
      return { name, isConnected };
    });

    return Promise.all(healthCheckPromises);
  }
}
