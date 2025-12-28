import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateTenantDto, UpdateTenantDto } from '../dto/tenant.dto';

@ApiTags('Tenants')
@Controller('api/tenants')
export class TenantController {
  @Get(':id')
  @ApiOperation({ summary: 'Get tenant by ID', description: 'Retrieve tenant information by tenant ID' })
  @ApiParam({ name: 'id', description: 'Tenant ID' })
  @ApiResponse({ status: 200, description: 'Tenant information retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  async getTenant(@Param('id') id: string) {
    return { message: 'This endpoint is proxied to the tenant service' };
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get tenant by slug', description: 'Retrieve tenant information by tenant slug' })
  @ApiParam({ name: 'slug', description: 'Tenant slug' })
  @ApiResponse({ status: 200, description: 'Tenant information retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  async getTenantBySlug(@Param('slug') slug: string) {
    return { message: 'This endpoint is proxied to the tenant service' };
  }

  @Post()
  @ApiOperation({ summary: 'Create tenant', description: 'Create a new tenant' })
  @ApiBody({ type: CreateTenantDto })
  @ApiResponse({ status: 201, description: 'Tenant created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error or tenant already exists' })
  async createTenant(@Body() createTenantDto: CreateTenantDto) {
    return { message: 'This endpoint is proxied to the tenant service' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update tenant', description: 'Update tenant information' })
  @ApiParam({ name: 'id', description: 'Tenant ID' })
  @ApiBody({ type: UpdateTenantDto })
  @ApiResponse({ status: 200, description: 'Tenant updated successfully' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  async updateTenant(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return { message: 'This endpoint is proxied to the tenant service' };
  }
}
