import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    console.log('Audit Service initialized');
  }

  async getAuditLogs(filters?: any) {
    return this.prisma.auditLog.findMany({
      where: {
        ...filters,
      },
      orderBy: { createdAt: 'desc' },
      take: filters?.limit || 100,
      skip: filters?.offset || 0,
    });
  }

  async getEntityAuditLogs(entityType: string, entityId: string) {
    return this.prisma.auditLog.findMany({
      where: {
        entityType,
        entityId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getVersionHistory(entityType: string, entityId: string) {
    return this.prisma.versionHistory.findMany({
      where: {
        entityType,
        entityId,
      },
      orderBy: { version: 'desc' },
    });
  }

  async createAuditLog(data: {
    tenantId?: string;
    entityType: string;
    entityId: string;
    action: string;
    changes?: any;
    metadata?: any;
    userId?: string;
    userEmail?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.auditLog.create({
      data: {
        ...data,
        action: data.action as any,
      },
    });
  }
}
