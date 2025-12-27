export interface BaseEvent {
  eventId: string;
  eventType: string;
  timestamp: Date;
  tenantId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface DomainEvent<T = any> extends BaseEvent {
  payload: T;
}

export type EventHandler<T = any> = (event: DomainEvent<T>) => Promise<void> | void;
