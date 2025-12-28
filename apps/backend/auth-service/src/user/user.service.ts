import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseManager, PrismaService } from '@org/database';
import { EventBusService } from '@org/messaging';
import { AUTH_EVENTS, UserUpdatedPayload } from '@org/events';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly eventBus: EventBusService,
    private readonly databaseManager: DatabaseManager,
  ) {}

  get prisma() {
    return this.databaseManager.getIdentityClient();
  }

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

  async updateUser(
    userId: string,
    updateDto: UpdateUserDto,
    tenantId?: string,
  ) {
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

  async getProfileStatus(userId: string, tenantId?: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        tenantId: tenantId || null,
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        profileStatus: true,
        emailVerified: true,
        currentJobFunction: true,
        preferredLocation: true,
        yearsOfExperience: true,
        currentAnnualSalary: true,
        resumes: {
          where: { deletedAt: null },
          select: {
            id: true,
            fileName: true,
            isPrimary: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      userId: user.id,
      email: user.email,
      profileStatus: user.profileStatus,
      emailVerified: user.emailVerified,
      profileComplete: {
        hasJobFunction: !!user.currentJobFunction,
        hasLocation: !!user.preferredLocation,
        hasExperience: !!user.yearsOfExperience,
        hasSalary: !!user.currentAnnualSalary,
        hasResume: user.resumes.length > 0,
      },
      resumeCount: user.resumes.length,
    };
  }
}
