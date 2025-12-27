import { SetMetadata } from '@nestjs/common';

export const EVENT_HANDLER_KEY = 'event_handler';
export const EventHandler = (eventType: string) => SetMetadata(EVENT_HANDLER_KEY, eventType);
