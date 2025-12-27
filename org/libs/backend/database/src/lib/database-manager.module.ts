import { Module, Global } from '@nestjs/common';
import { DatabaseManager } from './database-manager.service';

@Global()
@Module({
  controllers: [],
  providers: [DatabaseManager],
  exports: [DatabaseManager],
})
export class DatabaseManagerModule {}
