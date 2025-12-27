import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { HirenovaMyNestLibModule } from '@hirenova/my-nest-lib';

@Module({
  imports: [HirenovaMyNestLibModule],
})
export class AppModule {}
