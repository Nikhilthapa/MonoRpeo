import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventBusService } from '@hirenova/messaging';
import { AUTH_EVENTS, UserUpdatedPayload } from '@hirenova/shared-events';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService
  ) {}

  async getUser(userId: string, tenantId?: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        tenantId: tenantId || null,
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatarUrl: true,
        tenantId: true,
        emailVerified: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(userId: string, updateDto: UpdateUserDto, tenantId?: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        tenantId: tenantId || null,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...updateDto,
        version: { increment: 1 },
      },
    });

    await this.eventBus.publish(AUTH_EVENTS.USER_UPDATED, {
      eventId: `user-updated-${Date.now()}`,
      eventType: AUTH_EVENTS.USER_UPDATED,
      timestamp: new Date(),
      tenantId: updatedUser.tenantId || undefined,
      userId: updatedUser.id,
      payload: {
        userId: updatedUser.id,
        changes: updateDto,
      } as UserUpdatedPayload,
    });

    return updatedUser;
  }
}
