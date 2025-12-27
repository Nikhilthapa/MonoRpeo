import { Controller, Get, Query, Param } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('logs')
  async getAuditLogs(@Query() query: any) {
    return this.auditService.getAuditLogs(query);
  }

  @Get('logs/:entityType/:entityId')
  async getEntityAuditLogs(@Param('entityType') entityType: string, @Param('entityId') entityId: string) {
    return this.auditService.getEntityAuditLogs(entityType, entityId);
  }

  @Get('version-history/:entityType/:entityId')
  async getVersionHistory(@Param('entityType') entityType: string, @Param('entityId') entityId: string) {
    return this.auditService.getVersionHistory(entityType, entityId);
  }
}
