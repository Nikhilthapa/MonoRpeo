import { Module } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';
import { CustomFieldsModule } from './custom-fields/custom-fields.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, TenantModule, CustomFieldsModule],
})
export class AppModule {}
