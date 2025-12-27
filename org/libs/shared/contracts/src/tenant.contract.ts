import { TenantInfo, TenantValidationResult } from '@org/types';

export interface TenantServiceContract {
  getTenant(tenantId: string): Promise<TenantInfo>;
  validateTenant(tenantId: string): Promise<TenantValidationResult>;
  getTenantBySlug(slug: string): Promise<TenantInfo>;
}
