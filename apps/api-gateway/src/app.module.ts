import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [GatewayModule, SwaggerModule],
})
export class AppModule {}
