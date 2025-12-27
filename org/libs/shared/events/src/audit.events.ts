import { DomainEvent } from './event.types';

export interface AuditLogPayload {
  entityType: string;
  entityId: string;
  action: string;
  changes?: Record<string, any>;
  metadata?: Record<string, any>;
}

export type AuditLogEvent = DomainEvent<AuditLogPayload>;

export const AUDIT_EVENTS = {
  AUDIT_LOG: 'audit.log',
} as const;
