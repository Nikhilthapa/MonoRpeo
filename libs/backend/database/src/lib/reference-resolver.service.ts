import { Injectable, Logger } from '@nestjs/common';
import { identityPrisma } from '../clients/identity-client';
import { tenantPrisma } from '../clients/tenant-client';
import { organizationPrisma } from '../clients/organization-client';

interface UserReference {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

interface TenantReference {
  id: string;
  name: string;
  slug: string;
}

interface CompanyReference {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class ReferenceResolverService {
  private readonly logger = new Logger(ReferenceResolverService.name);
  private userCache = new Map<string, UserReference>();
  private tenantCache = new Map<string, TenantReference>();
  private companyCache = new Map<string, CompanyReference>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private cacheTimestamps = new Map<string, number>();

  async resolveUser(userId: string): Promise<UserReference | null> {
    if (!userId) return null;

    const cached = this.userCache.get(userId);
    const cacheTime = this.cacheTimestamps.get(`user:${userId}`);
    
    if (cached && cacheTime && Date.now() - cacheTime < this.CACHE_TTL) {
      return cached;
    }

    try {
      const user = await identityPrisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });

      if (user) {
        this.userCache.set(userId, user);
        this.cacheTimestamps.set(`user:${userId}`, Date.now());
        return user;
      }
    } catch (error) {
      this.logger.error(`Failed to resolve user ${userId}:`, error);
    }

    return null;
  }

  async resolveUsers(userIds: string[]): Promise<Map<string, UserReference>> {
    const result = new Map<string, UserReference>();
    const uncachedIds: string[] = [];

    for (const userId of userIds) {
      const cached = this.userCache.get(userId);
      const cacheTime = this.cacheTimestamps.get(`user:${userId}`);
      
      if (cached && cacheTime && Date.now() - cacheTime < this.CACHE_TTL) {
        result.set(userId, cached);
      } else {
        uncachedIds.push(userId);
      }
    }

    if (uncachedIds.length > 0) {
      try {
        const users = await identityPrisma.user.findMany({
          where: { id: { in: uncachedIds } },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        });

        for (const user of users) {
          result.set(user.id, user);
          this.userCache.set(user.id, user);
          this.cacheTimestamps.set(`user:${user.id}`, Date.now());
        }
      } catch (error) {
        this.logger.error(`Failed to resolve users:`, error);
      }
    }

    return result;
  }

  async resolveTenant(tenantId: string): Promise<TenantReference | null> {
    if (!tenantId) return null;

    const cached = this.tenantCache.get(tenantId);
    const cacheTime = this.cacheTimestamps.get(`tenant:${tenantId}`);
    
    if (cached && cacheTime && Date.now() - cacheTime < this.CACHE_TTL) {
      return cached;
    }

    try {
      const tenant = await tenantPrisma.tenant.findUnique({
        where: { id: tenantId },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      });

      if (tenant) {
        this.tenantCache.set(tenantId, tenant);
        this.cacheTimestamps.set(`tenant:${tenantId}`, Date.now());
        return tenant;
      }
    } catch (error) {
      this.logger.error(`Failed to resolve tenant ${tenantId}:`, error);
    }

    return null;
  }

  async resolveCompany(companyId: string): Promise<CompanyReference | null> {
    if (!companyId) return null;

    const cached = this.companyCache.get(companyId);
    const cacheTime = this.cacheTimestamps.get(`company:${companyId}`);
    
    if (cached && cacheTime && Date.now() - cacheTime < this.CACHE_TTL) {
      return cached;
    }

    try {
      const company = await organizationPrisma.company.findUnique({
        where: { id: companyId },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (company) {
        this.companyCache.set(companyId, company);
        this.cacheTimestamps.set(`company:${companyId}`, Date.now());
        return company;
      }
    } catch (error) {
      this.logger.error(`Failed to resolve company ${companyId}:`, error);
    }

    return null;
  }

  getUserEmail(userId: string): Promise<string | null> {
    return this.resolveUser(userId).then(user => user?.email || null);
  }

  getUserName(userId: string): Promise<string | null> {
    return this.resolveUser(userId).then(user => {
      if (!user) return null;
      const parts = [user.firstName, user.lastName].filter(Boolean);
      return parts.length > 0 ? parts.join(' ') : null;
    });
  }

  clearCache(): void {
    this.userCache.clear();
    this.tenantCache.clear();
    this.companyCache.clear();
    this.cacheTimestamps.clear();
  }

  clearUserCache(userId?: string): void {
    if (userId) {
      this.userCache.delete(userId);
      this.cacheTimestamps.delete(`user:${userId}`);
    } else {
      const userKeys = Array.from(this.userCache.keys());
      userKeys.forEach(key => {
        this.userCache.delete(key);
        this.cacheTimestamps.delete(`user:${key}`);
      });
    }
  }
}
