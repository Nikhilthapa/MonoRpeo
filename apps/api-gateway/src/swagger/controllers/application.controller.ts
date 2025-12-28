import { Controller, Get, Post, Param, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiHeader } from '@nestjs/swagger';
import { CreateApplicationDto } from '../dto/application.dto';

@ApiTags('Job Applications')
@Controller('api/jobs/:jobId/applications')
export class ApplicationController {
  @Get()
  @ApiOperation({ summary: 'Get job applications', description: 'Retrieve all applications for a specific job' })
  @ApiParam({ name: 'jobId', description: 'Job ID' })
  @ApiResponse({ status: 200, description: 'Applications retrieved successfully' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async getApplications(@Param('jobId') jobId: string, @Headers('x-tenant-id') tenantId?: string) {
    return { message: 'This endpoint is proxied to the job service' };
  }

  @Post()
  @ApiOperation({ summary: 'Create job application', description: 'Submit an application for a job' })
  @ApiParam({ name: 'jobId', description: 'Job ID' })
  @ApiBody({ type: CreateApplicationDto })
  @ApiResponse({ status: 201, description: 'Application created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error or already applied' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  @ApiHeader({ name: 'x-user-id', required: false, description: 'User ID (applicant)' })
  async createApplication(
    @Param('jobId') jobId: string,
    @Body() createDto: CreateApplicationDto,
    @Headers('x-tenant-id') tenantId?: string,
    @Headers('x-user-id') userId?: string
  ) {
    return { message: 'This endpoint is proxied to the job service' };
  }
}
