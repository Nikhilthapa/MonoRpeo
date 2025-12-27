import { Module } from '@nestjs/common';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessagingModule } from '@hirenova/messaging';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, MessagingModule, HttpModule, JobModule, ApplicationModule],
})
export class AppModule {}
