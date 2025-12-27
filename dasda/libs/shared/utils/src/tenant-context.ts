import { TenantContext } from '@hirenova/shared-types';

export function extractTenantFromHeader(headers: Record<string, string | string[] | undefined>): string | null {
  const tenantId = headers['x-tenant-id'];
  if (typeof tenantId === 'string') {
    return tenantId;
  }
  if (Array.isArray(tenantId) && tenantId.length > 0) {
    return tenantId[0];
  }
  return null;
}

export function extractTenantFromSubdomain(host: string): string | null {
  const parts = host.split('.');
  if (parts.length >= 3) {
    return parts[0];
  }
  return null;
}

export function extractTenantFromJWT(token: string): string | null {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return payload.tenantId || null;
  } catch {
    return null;
  }
}

export function createTenantContext(
  tenantId: string,
  userId?: string,
  tenantSlug?: string
): TenantContext {
  return {
    tenantId,
    userId,
    tenantSlug,
  };
}
