import { Module, Global } from '@nestjs/common';
import { DatabaseManager } from './database-manager.service';
import { DatabaseHealthController } from './health/database-health.controller';
import { DatabaseHealthService } from './health/database-health.service';
import { PrismaService } from './prisma.service';
import { ReferenceResolverService } from './reference-resolver.service';

@Global()
@Module({
  controllers: [DatabaseHealthController],
  providers: [
    DatabaseManager,
    DatabaseHealthService,
    PrismaService,
    ReferenceResolverService,
  ],
  exports: [
    DatabaseManager,
    DatabaseHealthService,
    PrismaService,
    ReferenceResolverService,
  ],
})
export class DatabaseModule {}
