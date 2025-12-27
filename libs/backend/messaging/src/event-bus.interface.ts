import { DomainEvent, EventHandler } from '@hirenova/shared-events';

export interface IEventBus {
  publish<T = any>(eventType: string, event: DomainEvent<T>): Promise<void>;
  subscribe<T = any>(eventType: string, handler: EventHandler<T>): void;
  unsubscribe(eventType: string, handler: EventHandler): void;
}
