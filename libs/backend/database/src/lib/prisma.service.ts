import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Prisma } from '../clients'

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_MIN_BACKOFF = 1000; // 1 second
const DEFAULT_MAX_BACKOFF = 10000; // 10 seconds
const CONNECTION_RETRY_ATTEMPTS = 5;
const CONNECTION_RETRY_DELAY = 2000; // 2 seconds

type BackoffOptions = {
  min?: number;
  max?: number;
};

type RetryOptions = {
  maxRetries?: number;
  backoff?: boolean | BackoffOptions;
};

export class PrismaRetryError extends Error {
  constructor() {
    super('Prisma retry limit exceeded.');
    this.name = 'PrismaRetryError';
  }
}

export class PrismaConnectionError extends Error {
  constructor(message: string) {
    super(`Database connection error: ${message}`);
    this.name = 'PrismaConnectionError';
  }
}

interface AllOperationsParams<TArgs = unknown, TResult = unknown> {
  args: TArgs;
  query: (args: TArgs) => Promise<TResult>;
}

/**
 * Check if an error is a connection-related error that should be retried
 */
const isConnectionError = (error: any): boolean => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Database connection errors
    return ['P1001', 'P1002', 'P1008', 'P1009', 'P1010', 'P1017'].includes(
      error.code
    );
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true; // All initialization errors should be retried
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return true; // Rust panic errors should be retried
  }

  // Check for specific error messages that indicate connection issues
  const errorMessage = error?.message?.toLowerCase() || '';
  const connectionErrorPatterns = [
    'transport endpoint is not connected',
    'connection refused',
    'connection reset',
    'connection timeout',
    'connection lost',
    'network is unreachable',
    'host is unreachable',
    'broken pipe',
    'connection aborted',
    'connection closed',
    'connection pool timeout',
    'too many connections',
    'server has closed the connection',
    'database is not available',
    'connection string is invalid',
    'authentication failed',
    'prepared statement',
  ];

  return connectionErrorPatterns.some((pattern) =>
    errorMessage.includes(pattern)
  );
};

/**
 * Creates a Prisma client extension that will retry queries on connection errors
 */
export const RetryExtension = (options?: RetryOptions) => ({
  name: 'enhanced retry extension',
  query: {
    $allModels: {
      async $allOperations<TArgs = unknown, TResult = unknown>({
        args,
        query,
      }: AllOperationsParams<TArgs, TResult>): Promise<TResult> {
        const maxRetries = options?.maxRetries ?? DEFAULT_MAX_RETRIES;
        const backoff = options?.backoff ?? true;
        const minBackoff =
          (typeof options?.backoff === 'object' && options.backoff.min) ||
          DEFAULT_MIN_BACKOFF;
        const maxBackoff =
          (typeof options?.backoff === 'object' && options.backoff.max) ||
          DEFAULT_MAX_BACKOFF;

        if (minBackoff > maxBackoff) {
          throw new Error('Minimum backoff must be less than maximum backoff');
        }

        let retries = 0;
        do {
          try {
            return await query(args);
          } catch (err: any) {
            if (isConnectionError(err)) {
              retries++;

              let errorType = 'Unknown';
              if (err instanceof Prisma.PrismaClientKnownRequestError) {
                errorType = `Known Error (${err.code})`;
              } else if (
                err instanceof Prisma.PrismaClientInitializationError
              ) {
                errorType = 'Initialization Error';
              } else if (err instanceof Prisma.PrismaClientRustPanicError) {
                errorType = 'Rust Panic Error';
              } else {
                errorType = 'Network Error';
              }

              console.warn(
                `Prisma ${errorType}: Connection issue detected. Retry ${retries}/${maxRetries}. Error: ${err.message}`
              );

              if (retries >= maxRetries) {
                console.error(
                  `Prisma: All ${maxRetries} retry attempts failed. Last error: ${err.message}`
                );
                throw new PrismaRetryError();
              }

              if (backoff) {
                // Exponential backoff with jitter
                const delay = Math.min(
                  minBackoff * Math.pow(2, retries - 1),
                  maxBackoff
                );
                const jitter = Math.random() * 0.1 * delay; // 10% jitter
                await new Promise((resolve) =>
                  setTimeout(resolve, delay + jitter)
                );
              }
              continue;
            }
            throw err;
          }
        } while (retries < maxRetries);

        throw new PrismaRetryError();
      },
    },
  },
});

const convertFieldsToLowercase = (data: any) => {
  // if (data?.email) {
  //   data.email = data.email.toLowerCase();
  // }
  // if (data?.name) {
  //   data.name = cleanString(data.name);
  // }
  // if (data?.companyName) {
  //   // data.companyName = cleanString(data.companyName);
  //   // data.companyName = normalizeIndianCompanySuffix(data.companyName);
  // }
  // Add more fields as needed
};

/**
 * Creates a Prisma client extension for soft delete functionality
 * Uses Prisma 7 client extensions (replaces deprecated $use middleware)
 * 
 * Note: Delete operations are handled via query interception.
 * Since extensions can't change operation types, delete operations
 * should use update() with deletedAt in application code, or be
 * handled via service-level wrappers.
 */
export const SoftDeleteExtension = () => ({
  name: 'soft delete extension',
  query: {
    $allModels: {
      async $allOperations<TArgs = unknown, TResult = unknown>({
        model,
        operation,
        args,
        query,
      }: {
        model: string | undefined;
        operation: string;
        args: TArgs;
        query: (args: TArgs) => Promise<TResult>;
      }): Promise<TResult> {
        const modelLc = model?.toLowerCase() || '';
        const typedArgs = args as any;

        // Soft delete: filter out deleted records for find queries unless withDeleted is true
        const findActions = [
          'findUnique',
          'findFirst',
          'findMany',
          'count',
          'aggregate',
          'groupBy',
        ];

        if (findActions.includes(operation)) {
          const findExclude = new Set([
            'leadqualificationresult',
            'leadassignee',
          ]);

          if (findExclude.has(modelLc)) {
            convertFieldsToLowercase(typedArgs?.data);
            return query(args);
          }

          const withDeleted = typedArgs?.withDeleted;

          if (!withDeleted) {
            const where = typedArgs?.where || {};
            if (typeof where.deletedAt === 'undefined') {
              convertFieldsToLowercase(typedArgs?.data);
              return query({
                ...typedArgs,
                where: {
                  ...where,
                  deletedAt: null,
                },
              } as TArgs);
            }
          } else {
            // Remove the custom flag
            const { withDeleted: _, ...restArgs } = typedArgs;
            convertFieldsToLowercase(restArgs?.data);
            return query(restArgs as TArgs);
          }
        }

        convertFieldsToLowercase(typedArgs?.data);
        return query(args);
      },
    },
  },
});

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private connectionAttempts = 0;
  private maxConnectionAttempts = CONNECTION_RETRY_ATTEMPTS;
  private isConnected = false;

  constructor() {
    const connectionString = `${process.env.DATABASE_URL}`;
    const adapter = new PrismaPg({ connectionString });

    super({
      adapter,
      log: process.env.NODE_ENV === 'development' 
        ? [
            { emit: 'event', level: 'query' },
            { emit: 'event', level: 'error' },
            { emit: 'event', level: 'info' },
            { emit: 'event', level: 'warn' },
          ]
        : [{ emit: 'event', level: 'error' }],
      datasources: {
        db: {
          url: connectionString,
        },
      },
      // Connection pooling configuration
      __internal: {
        engine: {
          connectTimeout: 60000, // 60 seconds
          pool: {
            max: 30, // Maximum number of connections in the pool
            min: 5, // Minimum number of connections in the pool
            idleTimeoutMillis: 30000, // 30 seconds
            acquireTimeoutMillis: 60000, // 60 seconds
            createTimeoutMillis: 60000, // 60 seconds
            destroyTimeoutMillis: 5000, // 5 seconds
            reapIntervalMillis: 1000, // 1 second
            createRetryIntervalMillis: 200, // 200ms
          },
        },
      },
    } as any);

    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Event listeners removed due to TypeScript compatibility issues
    // Health monitoring is handled via the healthCheck method instead
    this.logger.debug('PrismaService initialized with enhanced error handling');
  }

  /**
   * Health check method to verify database connectivity
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      this.isConnected = true;
      return true;
    } catch (error) {
      this.logger.error('Database health check failed:', error);
      this.isConnected = false;
      return false;
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): { isConnected: boolean; attempts: number } {
    return {
      isConnected: this.isConnected,
      attempts: this.connectionAttempts,
    };
  }

  /**
   * Force reconnection to the database
   */
  async reconnect(): Promise<void> {
    try {
      await this.$disconnect();
      await this.$connect();
      this.isConnected = true;
      this.connectionAttempts = 0;
      this.logger.log('Successfully reconnected to database');
    } catch (error) {
      this.logger.error('Failed to reconnect to database:', error);
      throw new PrismaConnectionError('Failed to reconnect to database');
    }
  }

  /**
   * Creates a record with automatic handling of ID constraint errors
   * This method will automatically retry with a different ID if a unique constraint error occurs
   * @param model The model to create the record in (e.g., 'user', 'product')
   * @param data The data to create the record with
   * @param options Optional Prisma options
   * @returns The created record
   */
  async createWithUniqueId(
    model: string,
    data: any, // Use any to allow for dynamic property access
    options?: any,
    maxRetries = 3
  ): Promise<any> {
    let retries = 0;

    while (retries <= maxRetries) {
      try {
        // Dynamic access to the model using bracket notation
        return await (this as any)[model].create({
          data,
          ...options,
        });
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002' &&
          error.meta &&
          typeof error.meta === 'object' &&
          'target' in error.meta &&
          Array.isArray(error.meta['target']) &&
          error.meta['target'].includes('id')
        ) {
          retries++;
          this.logger.warn(
            `Unique constraint failed on id field for ${model}, retry attempt ${retries}`
          );

          // For the retry, either remove the ID or generate a new one
          if ('id' in data) {
            if (typeof data['id'] === 'string') {
              // For UUID/string IDs, let Prisma generate a new one
              delete data['id'];
            } else if (typeof data['id'] === 'number') {
              // For numeric IDs, increment to avoid collision
              data['id'] = data['id'] + Math.floor(Math.random() * 1000) + 1;
            }
          }

          if (retries > maxRetries) {
            this.logger.error(
              `Failed to resolve ID constraint after ${maxRetries} retries`
            );
            throw error;
          }
        } else {
          // Not an ID constraint error, rethrow
          throw error;
        }
      }
    }
  }

  /**
   * Helper method to retry an operation with a new ID when a unique constraint error occurs
   * This can be used directly in your service methods
   */
  async tryWithDifferentId<T>(
    modelName: string,
    callback: () => Promise<T>
  ): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        error.meta &&
        typeof error.meta === 'object' &&
        'target' in error.meta &&
        Array.isArray(error.meta['target']) &&
        error.meta['target'].includes('id')
      ) {
        this.logger.warn(
          `Unique constraint failed on id field for ${modelName}. You should retry with a different ID.`
        );
      }
      throw error;
    }
  }

  /**
   * Soft delete helper - converts delete operations to update with deletedAt
   * Use this instead of direct delete() calls for models that support soft delete
   */
  async softDelete(modelName: string, where: any): Promise<any> {
    const deleteExclude = new Set([
      'userrole',
      'rolepermission',
      'roleresourceaccess',
      'leadsourceresponse',
      'mailercampaign',
      'scrapercampaign',
      'scrapedresult',
      'leadqualificationresult',
      'projectmilestone',
      'leadassignee',
    ]);

    if (deleteExclude.has(modelName.toLowerCase())) {
      return (this as any)[modelName].delete({ where });
    }

    return (this as any)[modelName].update({
      where,
      data: { deletedAt: new Date() },
    });
  }

  /**
   * Soft delete many helper - converts deleteMany operations to updateMany with deletedAt
   */
  async softDeleteMany(modelName: string, where: any): Promise<any> {
    const deleteExclude = new Set([
      'userrole',
      'rolepermission',
      'roleresourceaccess',
      'leadsourceresponse',
      'mailercampaign',
      'scrapercampaign',
      'scrapedresult',
      'leadqualificationresult',
      'projectmilestone',
      'leadassignee',
    ]);

    if (deleteExclude.has(modelName.toLowerCase())) {
      return (this as any)[modelName].deleteMany({ where });
    }

    return (this as any)[modelName].updateMany({
      where,
      data: { deletedAt: new Date() },
    });
  }

  async onModuleInit() {
    await this.connectWithRetry();

    // Apply client extensions (replaces deprecated $use middleware)
    this.$extends(
      RetryExtension({
        maxRetries: 5,
        backoff: {
          min: 1000, // 1 second
          max: 30000, // 30 seconds
        },
      })
    );

    this.$extends(SoftDeleteExtension());

    // Start periodic health checks
    this.startHealthCheckInterval();
  }

  private async connectWithRetry(): Promise<void> {
    while (this.connectionAttempts < this.maxConnectionAttempts) {
      try {
        this.connectionAttempts++;
        this.logger.log(
          `Attempting to connect to database (attempt ${this.connectionAttempts}/${this.maxConnectionAttempts})`
        );

        await this.$connect();
        this.isConnected = true;
        this.connectionAttempts = 0; // Reset on successful connection
        this.logger.log('Successfully connected to database');
        return;
      } catch (error: any) {
        this.logger.error(
          `Database connection attempt ${this.connectionAttempts} failed:`,
          error.message
        );

        if (this.connectionAttempts >= this.maxConnectionAttempts) {
          this.logger.error(
            `Failed to connect to database after ${this.maxConnectionAttempts} attempts`
          );
          throw new PrismaConnectionError(
            `Failed to connect to database after ${this.maxConnectionAttempts} attempts: ${error.message}`
          );
        }

        // Wait before retrying
        await new Promise((resolve) =>
          setTimeout(resolve, CONNECTION_RETRY_DELAY * this.connectionAttempts)
        );
      }
    }
  }

  private startHealthCheckInterval(): void {
    // Run health check every 30 seconds
    setInterval(async () => {
      const isHealthy = await this.healthCheck();
      if (!isHealthy && this.isConnected) {
        this.logger.warn(
          'Database health check failed, marking as disconnected'
        );
        this.isConnected = false;
      }
    }, 30000);
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.isConnected = false;
      this.logger.log('Disconnected from database');
    } catch (error) {
      this.logger.error('Error disconnecting from database:', error);
    }
  }
}
