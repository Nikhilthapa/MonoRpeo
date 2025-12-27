import { Controller, Get, Post, Put, Param, Body, Headers } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('jobs/:jobId/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  async getApplications(@Param('jobId') jobId: string, @Headers('x-tenant-id') tenantId?: string) {
    return this.applicationService.getApplications(jobId, tenantId);
  }

  @Post()
  async createApplication(
    @Param('jobId') jobId: string,
    @Body() createDto: CreateApplicationDto,
    @Headers('x-tenant-id') tenantId?: string,
    @Headers('x-user-id') userId?: string
  ) {
    return this.applicationService.createApplication(jobId, createDto, tenantId, userId);
  }
}
