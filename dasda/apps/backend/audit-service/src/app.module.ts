import { Module } from '@nestjs/common';
import { AuditModule } from './audit/audit.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessagingModule } from '@hirenova/messaging';

@Module({
  imports: [PrismaModule, MessagingModule, AuditModule],
})
export class AppModule {}
