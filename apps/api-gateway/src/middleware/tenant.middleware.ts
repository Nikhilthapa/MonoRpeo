import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {
  extractTenantFromHeader,
  extractTenantFromSubdomain,
} from '@org/utils';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId =
      extractTenantFromHeader(req.headers) ||
      extractTenantFromSubdomain(req.headers.host || '');

    if (tenantId) {
      req.headers['x-tenant-id'] = tenantId;
    }

    next();
  }
}
