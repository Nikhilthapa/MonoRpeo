import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateCustomFieldDto } from '../dto/custom-field.dto';

@ApiTags('Custom Fields')
@Controller('api/tenants/:tenantId/custom-fields')
export class CustomFieldsController {
  @Get()
  @ApiOperation({ summary: 'Get custom fields', description: 'Retrieve custom fields for a tenant and entity type' })
  @ApiParam({ name: 'tenantId', description: 'Tenant ID' })
  @ApiQuery({ name: 'entityType', required: false, description: 'Entity type filter (e.g., Job, User, Company)' })
  @ApiResponse({ status: 200, description: 'Custom fields retrieved successfully' })
  async getCustomFields(@Param('tenantId') tenantId: string, @Body('entityType') entityType?: string) {
    return { message: 'This endpoint is proxied to the tenant service' };
  }

  @Post()
  @ApiOperation({ summary: 'Create custom field', description: 'Create a new custom field for a tenant' })
  @ApiParam({ name: 'tenantId', description: 'Tenant ID' })
  @ApiBody({ type: CreateCustomFieldDto })
  @ApiResponse({ status: 201, description: 'Custom field created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async createCustomField(@Param('tenantId') tenantId: string, @Body() createDto: CreateCustomFieldDto) {
    return { message: 'This endpoint is proxied to the tenant service' };
  }
}
