import { Controller, Get, Post, Put, Param, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiHeader } from '@nestjs/swagger';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';

@ApiTags('Companies')
@Controller('api/companies')
export class CompanyController {
  @Get(':id')
  @ApiOperation({ summary: 'Get company by ID', description: 'Retrieve company information by company ID' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({ status: 200, description: 'Company information retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async getCompany(@Param('id') id: string, @Headers('x-tenant-id') tenantId?: string) {
    return { message: 'This endpoint is proxied to the company service' };
  }

  @Post()
  @ApiOperation({ summary: 'Create company', description: 'Create a new company' })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({ status: 201, description: 'Company created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async createCompany(@Body() createDto: CreateCompanyDto, @Headers('x-tenant-id') tenantId?: string) {
    return { message: 'This endpoint is proxied to the company service' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update company', description: 'Update company information' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({ status: 200, description: 'Company updated successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async updateCompany(@Param('id') id: string, @Body() updateDto: UpdateCompanyDto, @Headers('x-tenant-id') tenantId?: string) {
    return { message: 'This endpoint is proxied to the company service' };
  }
}
