import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompany(id: string, tenantId?: string) {
    const company = await this.prisma.company.findFirst({
      where: {
        id,
        tenantId: tenantId || null,
        deletedAt: null,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async createCompany(createDto: CreateCompanyDto, tenantId?: string) {
    return this.prisma.company.create({
      data: {
        ...createDto,
        tenantId,
        version: 1,
      },
    });
  }

  async updateCompany(id: string, updateDto: UpdateCompanyDto, tenantId?: string) {
    const company = await this.prisma.company.findFirst({
      where: {
        id,
        tenantId: tenantId || null,
        deletedAt: null,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.prisma.company.update({
      where: { id },
      data: {
        ...updateDto,
        version: { increment: 1 },
      },
    });
  }
}
