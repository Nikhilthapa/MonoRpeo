import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface DatabaseHealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  isConnected: boolean;
  connectionAttempts: number;
  lastHealthCheck: Date;
  responseTime?: number;
  error?: string;
  details: {
    canConnect: boolean;
    canQuery: boolean;
    connectionPool?: {
      active: number;
      idle: number;
      waiting: number;
    };
  };
}

@Injectable()
export class DatabaseHealthService {
  private readonly logger = new Logger(DatabaseHealthService.name);
  private lastHealthCheck: Date = new Date();
  private lastHealthStatus: DatabaseHealthStatus['status'] = 'healthy';

  constructor(private prisma: PrismaService) {}

  async getDetailedHealthStatus(): Promise<DatabaseHealthStatus> {
    const startTime = Date.now();
    let canConnect = false;
    let canQuery = false;
    let error: string | undefined;

    try {
      // Test basic connectivity
      canConnect = await this.prisma.healthCheck();

      if (canConnect) {
        // Test query execution
        await this.prisma.$queryRaw`SELECT current_timestamp`;
        canQuery = true;
      }
    } catch (err: any) {
      error = err.message;
      this.logger.warn('Database health check failed:', error);
    }

    const responseTime = Date.now() - startTime;
    const connectionStatus = this.prisma.getConnectionStatus();
    this.lastHealthCheck = new Date();

    let status: DatabaseHealthStatus['status'] = 'healthy';
    if (!canConnect || !canQuery) {
      status = 'unhealthy';
    } else if (responseTime > 5000 || connectionStatus.attempts > 0) {
      status = 'degraded';
    }

    this.lastHealthStatus = status;

    return {
      status,
      isConnected: connectionStatus.isConnected,
      connectionAttempts: connectionStatus.attempts,
      lastHealthCheck: this.lastHealthCheck,
      responseTime,
      error,
      details: {
        canConnect,
        canQuery,
        // Connection pool info would need to be implemented if available
      },
    };
  }

  async getSimpleHealthStatus(): Promise<{ status: string; timestamp: Date }> {
    try {
      const isHealthy = await this.prisma.healthCheck();
      return {
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date(),
      };
    }
  }

  /**
   * Get historical health status
   */
  getLastKnownStatus(): {
    status: DatabaseHealthStatus['status'];
    lastCheck: Date;
  } {
    return {
      status: this.lastHealthStatus,
      lastCheck: this.lastHealthCheck,
    };
  }

  /**
   * Force a reconnection attempt
   */
  async forceReconnect(): Promise<{ success: boolean; error?: string }> {
    try {
      await this.prisma.reconnect();
      return { success: true };
    } catch (error: any) {
      this.logger.error('Force reconnect failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get database connection metrics
   */
  async getConnectionMetrics(): Promise<{
    activeConnections?: number;
    totalQueries?: number;
    averageQueryTime?: number;
    errors?: number;
  }> {
    try {
      // These queries might need to be adjusted based on your PostgreSQL setup
      const [connections, activity] = await Promise.all([
        this.prisma.$queryRaw`
          SELECT count(*) as active_connections
          FROM pg_stat_activity
          WHERE state = 'active'
        ` as Promise<Array<{ active_connections: bigint }>>,
        this.prisma.$queryRaw`
          SELECT
            sum(calls) as total_queries,
            round(avg(mean_exec_time)::numeric, 2) as avg_query_time
          FROM pg_stat_statements
          WHERE query NOT LIKE '%pg_stat%'
        ` as Promise<Array<{ total_queries: bigint; avg_query_time: number }>>,
      ]);

      return {
        activeConnections: Number(connections[0]?.active_connections || 0),
        totalQueries: Number(activity[0]?.total_queries || 0),
        averageQueryTime: activity[0]?.avg_query_time || 0,
      };
    } catch (error) {
      this.logger.warn('Could not fetch connection metrics:', error);
      return {};
    }
  }
}
