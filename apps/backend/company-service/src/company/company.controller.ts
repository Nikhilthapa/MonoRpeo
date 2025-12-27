import { Controller, Get, Post, Put, Param, Body, Headers } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get(':id')
  async getCompany(@Param('id') id: string, @Headers('x-tenant-id') tenantId?: string) {
    return this.companyService.getCompany(id, tenantId);
  }

  @Post()
  async createCompany(@Body() createDto: CreateCompanyDto, @Headers('x-tenant-id') tenantId?: string) {
    return this.companyService.createCompany(createDto, tenantId);
  }

  @Put(':id')
  async updateCompany(@Param('id') id: string, @Body() updateDto: UpdateCompanyDto, @Headers('x-tenant-id') tenantId?: string) {
    return this.companyService.updateCompany(id, updateDto, tenantId);
  }
}
