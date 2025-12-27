import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthClientService } from './auth-client.service';
import { TenantClientService } from './tenant-client.service';

@Module({
  imports: [HttpModule],
  providers: [AuthClientService, TenantClientService],
  exports: [AuthClientService, TenantClientService],
})
export class ClientsModule {}
