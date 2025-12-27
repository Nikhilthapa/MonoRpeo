export interface TenantContext {
  tenantId: string;
  tenantSlug?: string;
  userId?: string;
}

export interface TenantInfo {
  id: string;
  name: string;
  slug: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  subscriptionPlan?: string;
  subscriptionStatus?: string;
}

export interface TenantValidationResult {
  isValid: boolean;
  tenant?: TenantInfo;
  error?: string;
}
