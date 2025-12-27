import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DomainEvent, EventHandler } from '@hirenova/shared-events';
import { IEventBus } from './event-bus.interface';

@Injectable()
export class EventBusService implements IEventBus, OnModuleInit {
  private readonly logger = new Logger(EventBusService.name);
  private handlers: Map<string, Set<EventHandler>> = new Map();

  async onModuleInit() {
    this.logger.log('EventBusService initialized (in-memory implementation)');
  }

  async publish<T = any>(eventType: string, event: DomainEvent<T>): Promise<void> {
    this.logger.debug(`Publishing event: ${eventType}`, { eventId: event.eventId });

    const handlers = this.handlers.get(eventType);
    if (!handlers || handlers.size === 0) {
      this.logger.debug(`No handlers registered for event: ${eventType}`);
      return;
    }

    const promises = Array.from(handlers).map(async (handler) => {
      try {
        await handler(event);
      } catch (error) {
        this.logger.error(`Error handling event ${eventType}:`, error);
      }
    });

    await Promise.allSettled(promises);
  }

  subscribe<T = any>(eventType: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);
    this.logger.debug(`Subscribed to event: ${eventType}`);
  }

  unsubscribe(eventType: string, handler: EventHandler): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.handlers.delete(eventType);
      }
    }
    this.logger.debug(`Unsubscribed from event: ${eventType}`);
  }
}
