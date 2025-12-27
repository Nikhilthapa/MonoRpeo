import { Injectable, Logger, BadGatewayException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthClientService } from '../clients/auth-client.service';
import { TenantClientService } from '../clients/tenant-client.service';
import {
  extractTenantFromHeader,
  extractTenantFromSubdomain,
} from '@hirenova/shared-utils';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);
  private readonly serviceRoutes: Map<string, string> = new Map([
    ['/api/auth', process.env.AUTH_SERVICE_URL || 'http://localhost:3001'],
    ['/api/tenants', process.env.TENANT_SERVICE_URL || 'http://localhost:3002'],
    ['/api/jobs', process.env.JOB_SERVICE_URL || 'http://localhost:3003'],
    [
      '/api/companies',
      process.env.COMPANY_SERVICE_URL || 'http://localhost:3004',
    ],
    ['/api/audit', process.env.AUDIT_SERVICE_URL || 'http://localhost:3005'],
  ]);

  constructor(
    private readonly authClient: AuthClientService,
    private readonly tenantClient: TenantClientService,
  ) {}

  async route(req: Request, res: Response, tenantId?: string): Promise<void> {
    const path = req.path;
    const serviceUrl = this.getServiceUrl(path);

    if (!serviceUrl) {
      res
        .status(404)
        .json({ error: { code: 'NOT_FOUND', message: 'Service not found' } });
      return;
    }

    const resolvedTenantId = await this.resolveTenantId(req, tenantId);

    if (resolvedTenantId) {
      req.headers['x-tenant-id'] = resolvedTenantId;
    }

    try {
      await this.proxyRequest(req, res, serviceUrl);
    } catch (error) {
      this.logger.error(`Error proxying request to ${serviceUrl}:`, error);
      throw new BadGatewayException('Service unavailable');
    }
  }

  private getServiceUrl(path: string): string | null {
    for (const [routePrefix, serviceUrl] of this.serviceRoutes) {
      if (path.startsWith(routePrefix)) {
        return serviceUrl;
      }
    }
    return null;
  }

  private async resolveTenantId(
    req: Request,
    headerTenantId?: string,
  ): Promise<string | null> {
    if (headerTenantId) {
      return headerTenantId;
    }

    const tenantFromHeader = extractTenantFromHeader(req.headers);
    if (tenantFromHeader) {
      return tenantFromHeader;
    }

    const host = req.headers.host;
    if (host) {
      const tenantFromSubdomain = extractTenantFromSubdomain(host);
      if (tenantFromSubdomain) {
        return tenantFromSubdomain;
      }
    }

    return null;
  }

  private async proxyRequest(
    req: Request,
    res: Response,
    serviceUrl: string,
  ): Promise<void> {
    const url = `${serviceUrl}${req.path.replace('/api', '')}${req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : ''}`;

    try {
      const axios = (await import('axios')).default;
      const response = await axios({
        method: req.method,
        url,
        headers: {
          ...(req.headers as Record<string, string>),
          'content-type': req.headers['content-type'] || 'application/json',
        },
        data:
          req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
        validateStatus: () => true,
      });

      res.status(response.status);
      Object.keys(response.headers).forEach((key) => {
        res.setHeader(key, response.headers[key] as string);
      });

      res.json(response.data);
    } catch (error: any) {
      this.logger.error(`Proxy error: ${error.message}`);
      res
        .status(500)
        .json({
          error: { code: 'PROXY_ERROR', message: 'Failed to proxy request' },
        });
    }
  }
}
