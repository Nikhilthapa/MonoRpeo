import { DomainEvent } from './event.types';

export interface JobCreatedPayload {
  jobId: string;
  companyId: string;
  tenantId?: string;
  createdBy: string;
}

export interface JobUpdatedPayload {
  jobId: string;
  changes: Record<string, any>;
}

export interface JobPublishedPayload {
  jobId: string;
  publishedAt: Date;
}

export interface ApplicationCreatedPayload {
  applicationId: string;
  jobId: string;
  userId: string;
  tenantId?: string;
}

export interface ApplicationStatusChangedPayload {
  applicationId: string;
  jobId: string;
  userId: string;
  oldStatus: string;
  newStatus: string;
}

export type JobCreatedEvent = DomainEvent<JobCreatedPayload>;
export type JobUpdatedEvent = DomainEvent<JobUpdatedPayload>;
export type JobPublishedEvent = DomainEvent<JobPublishedPayload>;
export type ApplicationCreatedEvent = DomainEvent<ApplicationCreatedPayload>;
export type ApplicationStatusChangedEvent = DomainEvent<ApplicationStatusChangedPayload>;

export const JOB_EVENTS = {
  JOB_CREATED: 'job.created',
  JOB_UPDATED: 'job.updated',
  JOB_PUBLISHED: 'job.published',
  APPLICATION_CREATED: 'application.created',
  APPLICATION_STATUS_CHANGED: 'application.status-changed',
} as const;
