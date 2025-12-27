import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseHealthService } from './database-health.service';
import { PrismaService } from '../prisma.service';

describe('DatabaseHealthService', () => {
  let service: DatabaseHealthService;
  let prismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const mockPrismaService = {
      healthCheck: jest.fn(),
      getConnectionStatus: jest.fn(),
      reconnect: jest.fn(),
      $queryRaw: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseHealthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DatabaseHealthService>(DatabaseHealthService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSimpleHealthStatus', () => {
    it('should return healthy when database is accessible', async () => {
      prismaService.healthCheck.mockResolvedValue(true);

      const result = await service.getSimpleHealthStatus();

      expect(result.status).toBe('healthy');
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should return unhealthy when database is not accessible', async () => {
      prismaService.healthCheck.mockRejectedValue(
        new Error('Connection failed')
      );

      const result = await service.getSimpleHealthStatus();

      expect(result.status).toBe('unhealthy');
      expect(result.timestamp).toBeInstanceOf(Date);
    });
  });

  describe('getDetailedHealthStatus', () => {
    it('should return healthy status when everything works', async () => {
      prismaService.healthCheck.mockResolvedValue(true);
      prismaService.getConnectionStatus.mockReturnValue({
        isConnected: true,
        attempts: 0,
      });
      prismaService.$queryRaw.mockResolvedValue([
        { current_timestamp: new Date() },
      ]);

      const result = await service.getDetailedHealthStatus();

      expect(result.status).toBe('healthy');
      expect(result.isConnected).toBe(true);
      expect(result.details.canConnect).toBe(true);
      expect(result.details.canQuery).toBe(true);
      expect(result.responseTime).toBeGreaterThan(0);
    });

    it('should return unhealthy status when connection fails', async () => {
      prismaService.healthCheck.mockResolvedValue(false);
      prismaService.getConnectionStatus.mockReturnValue({
        isConnected: false,
        attempts: 3,
      });

      const result = await service.getDetailedHealthStatus();

      expect(result.status).toBe('unhealthy');
      expect(result.isConnected).toBe(false);
      expect(result.details.canConnect).toBe(false);
      expect(result.details.canQuery).toBe(false);
    });

    it('should return degraded status when response time is high', async () => {
      prismaService.healthCheck.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(true), 6000))
      );
      prismaService.getConnectionStatus.mockReturnValue({
        isConnected: true,
        attempts: 0,
      });
      prismaService.$queryRaw.mockResolvedValue([
        { current_timestamp: new Date() },
      ]);

      const result = await service.getDetailedHealthStatus();

      expect(result.status).toBe('degraded');
      expect(result.responseTime).toBeGreaterThan(5000);
    }, 10000);
  });

  describe('forceReconnect', () => {
    it('should return success when reconnection works', async () => {
      prismaService.reconnect.mockResolvedValue(undefined);

      const result = await service.forceReconnect();

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return failure when reconnection fails', async () => {
      const error = new Error('Reconnection failed');
      prismaService.reconnect.mockRejectedValue(error);

      const result = await service.forceReconnect();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Reconnection failed');
    });
  });

  describe('getLastKnownStatus', () => {
    it('should return the last known status', () => {
      const result = service.getLastKnownStatus();

      expect(result.status).toBeDefined();
      expect(result.lastCheck).toBeInstanceOf(Date);
    });
  });
});
