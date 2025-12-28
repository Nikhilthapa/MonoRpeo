import { DatabaseModule } from '@org/database';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { StorageModule } from './storage/storage.module';
import { MessagingModule } from '@org/messaging';

@Module({
  imports: [
    DatabaseModule,
    MessagingModule,
    AuthModule,
    UserModule,
    ProfileModule,
    StorageModule,
  ],
})
export class AppModule {}
