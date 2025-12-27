import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TenantServiceContract } from '@org/contracts';

@Injectable()
export class TenantClientService implements TenantServiceContract {
  private readonly baseUrl =
    process.env.TENANT_SERVICE_URL || 'http://localhost:3002';

  constructor(private readonly httpService: HttpService) {}

  async getTenant(tenantId: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/tenants/${tenantId}`),
    );
    return response.data;
  }

  async validateTenant(tenantId: string): Promise<any> {
    try {
      const tenant = await this.getTenant(tenantId);
      return {
        isValid: !!tenant && tenant.isActive,
        tenant,
      };
    } catch {
      return {
        isValid: false,
        error: 'Tenant not found',
      };
    }
  }

  async getTenantBySlug(slug: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/tenants/slug/${slug}`),
    );
    return response.data;
  }
}
