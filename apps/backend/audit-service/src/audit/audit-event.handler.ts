import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@hirenova/messaging';
import { AuditService } from './audit.service';
import { AUTH_EVENTS, JOB_EVENTS } from '@hirenova/shared-events';

@Injectable()
export class AuditEventHandler implements OnModuleInit {
  constructor(
    private readonly eventBus: EventBusService,
    private readonly auditService: AuditService
  ) {}

  async onModuleInit() {
    this.eventBus.subscribe(AUTH_EVENTS.USER_CREATED, async (event) => {
      await this.auditService.createAuditLog({
        tenantId: event.tenantId,
        entityType: 'User',
        entityId: event.payload.userId,
        action: 'CREATE',
        userId: event.userId,
        metadata: { email: event.payload.email },
      });
    });

    this.eventBus.subscribe(AUTH_EVENTS.USER_UPDATED, async (event) => {
      await this.auditService.createAuditLog({
        tenantId: event.tenantId,
        entityType: 'User',
        entityId: event.payload.userId,
        action: 'UPDATE',
        changes: event.payload.changes,
        userId: event.userId,
      });
    });

    this.eventBus.subscribe(JOB_EVENTS.JOB_CREATED, async (event) => {
      await this.auditService.createAuditLog({
        tenantId: event.tenantId,
        entityType: 'Job',
        entityId: event.payload.jobId,
        action: 'CREATE',
        userId: event.userId,
        metadata: { companyId: event.payload.companyId },
      });
    });

    this.eventBus.subscribe(JOB_EVENTS.APPLICATION_CREATED, async (event) => {
      await this.auditService.createAuditLog({
        tenantId: event.tenantId,
        entityType: 'JobApplication',
        entityId: event.payload.applicationId,
        action: 'CREATE',
        userId: event.userId,
        metadata: { jobId: event.payload.jobId },
      });
    });
  }
}
