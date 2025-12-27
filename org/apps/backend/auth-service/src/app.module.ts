import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessagingModule } from '@hirenova/messaging';

@Module({
  imports: [PrismaModule, MessagingModule, AuthModule, UserModule, ProfileModule],
})
export class AppModule {}
