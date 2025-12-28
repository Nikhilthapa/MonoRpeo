import { Controller, Get, Query, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Audit')
@Controller('api/audit')
export class AuditController {
  @Get('logs')
  @ApiOperation({
    summary: 'Get audit logs',
    description: 'Retrieve audit logs with optional filters',
  })
  @ApiQuery({
    name: 'entityType',
    required: false,
    description: 'Filter by entity type',
  })
  @ApiQuery({
    name: 'entityId',
    required: false,
    description: 'Filter by entity ID',
  })
  @ApiQuery({
    name: 'action',
    required: false,
    description: 'Filter by action type',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter by user ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Audit logs retrieved successfully',
  })
  async getAuditLogs(@Query() query: any) {
    return { message: 'This endpoint is proxied to the audit service' };
  }

  @Get('logs/:entityType/:entityId')
  @ApiOperation({
    summary: 'Get entity audit logs',
    description: 'Retrieve audit logs for a specific entity',
  })
  @ApiParam({
    name: 'entityType',
    description: 'Entity type (e.g., Job, User, Company)',
  })
  @ApiParam({ name: 'entityId', description: 'Entity ID' })
  @ApiResponse({
    status: 200,
    description: 'Entity audit logs retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Entity not found' })
  async getEntityAuditLogs(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    return { message: 'This endpoint is proxied to the audit service' };
  }

  @Get('version-history/:entityType/:entityId')
  @ApiOperation({
    summary: 'Get version history',
    description: 'Retrieve version history for a specific entity',
  })
  @ApiParam({
    name: 'entityType',
    description: 'Entity type (e.g., Job, User, Company)',
  })
  @ApiParam({ name: 'entityId', description: 'Entity ID' })
  @ApiResponse({
    status: 200,
    description: 'Version history retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Entity not found' })
  async getVersionHistory(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    return { message: 'This endpoint is proxied to the audit service' };
  }
}
