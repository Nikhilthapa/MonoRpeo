import { TenantInfo, TenantValidationResult } from '@hirenova/shared-types';

export interface TenantServiceContract {
  getTenant(tenantId: string): Promise<TenantInfo>;
  validateTenant(tenantId: string): Promise<TenantValidationResult>;
  getTenantBySlug(slug: string): Promise<TenantInfo>;
}
