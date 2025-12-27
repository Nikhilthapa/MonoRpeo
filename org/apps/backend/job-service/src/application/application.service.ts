import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventBusService } from '@hirenova/messaging';
import { JOB_EVENTS, ApplicationCreatedPayload } from '@hirenova/shared-events';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService
  ) {}

  async getApplications(jobId: string, tenantId?: string) {
    return this.prisma.jobApplication.findMany({
      where: {
        jobId,
        deletedAt: null,
      },
    });
  }

  async createApplication(jobId: string, createDto: CreateApplicationDto, tenantId?: string, userId?: string) {
    const application = await this.prisma.jobApplication.create({
      data: {
        jobId,
        userId: userId || createDto.userId,
        coverLetter: createDto.coverLetter,
        version: 1,
      },
    });

    await this.eventBus.publish(JOB_EVENTS.APPLICATION_CREATED, {
      eventId: `application-created-${Date.now()}`,
      eventType: JOB_EVENTS.APPLICATION_CREATED,
      timestamp: new Date(),
      tenantId,
      userId: userId || createDto.userId,
      payload: {
        applicationId: application.id,
        jobId,
        userId: userId || createDto.userId,
        tenantId,
      } as ApplicationCreatedPayload,
    });

    return application;
  }
}
