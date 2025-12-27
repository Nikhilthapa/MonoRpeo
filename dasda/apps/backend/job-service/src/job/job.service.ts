import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventBusService } from '@hirenova/messaging';
import { JOB_EVENTS, JobCreatedPayload } from '@hirenova/shared-events';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService,
    private readonly httpService: HttpService
  ) {}

  async getJobs(tenantId?: string, filters?: any) {
    return this.prisma.job.findMany({
      where: {
        tenantId: tenantId || null,
        deletedAt: null,
        ...filters,
      },
      orderBy: { createdAt: 'desc' },
      take: filters?.limit || 20,
      skip: filters?.offset || 0,
    });
  }

  async getJob(id: string, tenantId?: string) {
    const job = await this.prisma.job.findFirst({
      where: {
        id,
        tenantId: tenantId || null,
        deletedAt: null,
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  async createJob(createJobDto: CreateJobDto, tenantId?: string, userId?: string) {
    if (userId) {
      const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
      try {
        await firstValueFrom(
          this.httpService.get(`${authServiceUrl}/users/${userId}`, {
            headers: tenantId ? { 'x-tenant-id': tenantId } : {},
          })
        );
      } catch {
        throw new NotFoundException('User not found');
      }
    }

    const job = await this.prisma.job.create({
      data: {
        ...createJobDto,
        tenantId,
        createdBy: userId,
        version: 1,
      },
    });

    await this.eventBus.publish(JOB_EVENTS.JOB_CREATED, {
      eventId: `job-created-${Date.now()}`,
      eventType: JOB_EVENTS.JOB_CREATED,
      timestamp: new Date(),
      tenantId: job.tenantId || undefined,
      userId: userId,
      payload: {
        jobId: job.id,
        companyId: job.companyId,
        tenantId: job.tenantId || undefined,
        createdBy: userId || '',
      } as JobCreatedPayload,
    });

    return job;
  }

  async updateJob(id: string, updateJobDto: UpdateJobDto, tenantId?: string) {
    const job = await this.prisma.job.findFirst({
      where: {
        id,
        tenantId: tenantId || null,
        deletedAt: null,
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return this.prisma.job.update({
      where: { id },
      data: {
        ...updateJobDto,
        version: { increment: 1 },
      },
    });
  }
}
