import {
  Controller,
  Get,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  DatabaseHealthService,
  DatabaseHealthStatus,
} from './database-health.service';

@Controller('database/health')
export class DatabaseHealthController {
  constructor(private readonly healthService: DatabaseHealthService) {}

  /**
   * Simple health check endpoint
   * Returns 200 if database is healthy, 503 if unhealthy
   */
  @Get()
  async health(): Promise<{ status: string; timestamp: Date }> {
    const result = await this.healthService.getSimpleHealthStatus();

    if (result.status === 'unhealthy') {
      throw new HttpException(
        { status: 'unhealthy', timestamp: result.timestamp },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }

    return result;
  }

  /**
   * Detailed health check with comprehensive status information
   */
  @Get('detailed')
  async detailedHealth(): Promise<DatabaseHealthStatus> {
    const result = await this.healthService.getDetailedHealthStatus();

    if (result.status === 'unhealthy') {
      throw new HttpException(result, HttpStatus.SERVICE_UNAVAILABLE);
    }

    return result;
  }

  /**
   * Get the last known health status without performing a new check
   */
  @Get('status')
  async getStatus(): Promise<{
    status: DatabaseHealthStatus['status'];
    lastCheck: Date;
  }> {
    return this.healthService.getLastKnownStatus();
  }

  /**
   * Get database connection metrics
   */
  @Get('metrics')
  async getMetrics(): Promise<{
    activeConnections?: number;
    totalQueries?: number;
    averageQueryTime?: number;
    errors?: number;
  }> {
    try {
      return await this.healthService.getConnectionMetrics();
    } catch (error: any) {
      throw new HttpException(
        { message: 'Failed to fetch metrics', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Force a database reconnection
   * Use this endpoint when you need to manually trigger a reconnection
   */
  @Post('reconnect')
  async forceReconnect(): Promise<{ success: boolean; error?: string }> {
    const result = await this.healthService.forceReconnect();

    if (!result.success) {
      throw new HttpException(
        { message: 'Reconnection failed', error: result.error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return result;
  }

  /**
   * Liveness probe endpoint for Kubernetes
   * Returns 200 if the service is running (even if database is down)
   */
  @Get('live')
  async liveness(): Promise<{ status: 'alive'; timestamp: Date }> {
    return {
      status: 'alive',
      timestamp: new Date(),
    };
  }

  /**
   * Readiness probe endpoint for Kubernetes
   * Returns 200 only if database is ready to accept requests
   */
  @Get('ready')
  async readiness(): Promise<{ status: 'ready'; timestamp: Date }> {
    const result = await this.healthService.getSimpleHealthStatus();

    if (result.status === 'unhealthy') {
      throw new HttpException(
        { status: 'not ready', timestamp: result.timestamp },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }

    return {
      status: 'ready',
      timestamp: result.timestamp,
    };
  }
}
