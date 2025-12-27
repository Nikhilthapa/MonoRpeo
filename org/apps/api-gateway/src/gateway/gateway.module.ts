import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule } from '../clients/clients.module';
import { TenantMiddleware } from '../middleware/tenant.middleware';

@Module({
  imports: [ClientsModule],
  controllers: [GatewayController],
  providers: [GatewayService, TenantMiddleware],
})
export class GatewayModule {}
