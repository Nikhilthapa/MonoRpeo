import { Controller, Get, Post, Put, Param, Body, Query, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery, ApiHeader } from '@nestjs/swagger';
import { CreateJobDto, UpdateJobDto } from '../dto/job.dto';

@ApiTags('Jobs')
@Controller('api/jobs')
export class JobController {
  @Get()
  @ApiOperation({ summary: 'Get jobs', description: 'Retrieve list of jobs with optional filters' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by job status' })
  @ApiQuery({ name: 'companyId', required: false, description: 'Filter by company ID' })
  @ApiResponse({ status: 200, description: 'Jobs retrieved successfully' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async getJobs(@Query() query: any, @Headers('x-tenant-id') tenantId?: string) {
    return { message: 'This endpoint is proxied to the job service' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by ID', description: 'Retrieve job information by job ID' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @ApiResponse({ status: 200, description: 'Job information retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async getJob(@Param('id') id: string, @Headers('x-tenant-id') tenantId?: string) {
    return { message: 'This endpoint is proxied to the job service' };
  }

  @Post()
  @ApiOperation({ summary: 'Create job', description: 'Create a new job posting' })
  @ApiBody({ type: CreateJobDto })
  @ApiResponse({ status: 201, description: 'Job created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  @ApiHeader({ name: 'x-user-id', required: false, description: 'User ID (creator)' })
  async createJob(@Body() createJobDto: CreateJobDto, @Headers('x-tenant-id') tenantId?: string, @Headers('x-user-id') userId?: string) {
    return { message: 'This endpoint is proxied to the job service' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update job', description: 'Update job information' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @ApiBody({ type: UpdateJobDto })
  @ApiResponse({ status: 200, description: 'Job updated successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async updateJob(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @Headers('x-tenant-id') tenantId?: string) {
    return { message: 'This endpoint is proxied to the job service' };
  }
}
