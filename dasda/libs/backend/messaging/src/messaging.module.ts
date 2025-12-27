import { Module, Global } from '@nestjs/common';
import { EventBusService } from './event-bus.service';
import { IEventBus } from './event-bus.interface';

@Global()
@Module({
  providers: [
    {
      provide: 'IEventBus',
      useClass: EventBusService,
    },
    EventBusService,
  ],
  exports: ['IEventBus', EventBusService],
})
export class MessagingModule {}
