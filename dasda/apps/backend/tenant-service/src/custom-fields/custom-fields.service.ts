import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';

@Injectable()
export class CustomFieldsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCustomFields(tenantId: string, entityType: string) {
    return this.prisma.customField.findMany({
      where: {
        tenantId: tenantId || null,
        entityType,
        deletedAt: null,
        isVisible: true,
      },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async createCustomField(tenantId: string, createDto: CreateCustomFieldDto) {
    return this.prisma.customField.create({
      data: {
        ...createDto,
        tenantId: tenantId || null,
      },
    });
  }
}
