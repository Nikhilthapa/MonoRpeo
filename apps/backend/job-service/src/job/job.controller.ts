import { Controller, Get, Post, Put, Param, Body, Headers, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async getJobs(@Query() query: any, @Headers('x-tenant-id') tenantId?: string) {
    return this.jobService.getJobs(tenantId, query);
  }

  @Get(':id')
  async getJob(@Param('id') id: string, @Headers('x-tenant-id') tenantId?: string) {
    return this.jobService.getJob(id, tenantId);
  }

  @Post()
  async createJob(@Body() createJobDto: CreateJobDto, @Headers('x-tenant-id') tenantId?: string, @Headers('x-user-id') userId?: string) {
    return this.jobService.createJob(createJobDto, tenantId, userId);
  }

  @Put(':id')
  async updateJob(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @Headers('x-tenant-id') tenantId?: string) {
    return this.jobService.updateJob(id, updateJobDto, tenantId);
  }
}
