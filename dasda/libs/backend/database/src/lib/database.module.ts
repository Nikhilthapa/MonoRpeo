import { Module, Global } from '@nestjs/common';
import { DatabaseManager } from './database-manager.service';
import { DatabaseHealthController } from './health/database-health.controller';
import { DatabaseHealthService } from './health/database-health.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  controllers: [DatabaseHealthController],
  providers: [DatabaseManager, DatabaseHealthService, PrismaService],
  exports: [DatabaseManager, DatabaseHealthService, PrismaService],
})
export class DatabaseModule {}
