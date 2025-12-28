import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageModule as StorageLibModule } from '@hirenova/storage';

@Module({
  imports: [StorageLibModule],
  controllers: [StorageController],
})
export class StorageModule {}
