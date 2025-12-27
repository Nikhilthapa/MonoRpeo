import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CustomFieldsService } from './custom-fields.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';

@Controller('tenants/:tenantId/custom-fields')
export class CustomFieldsController {
  constructor(private readonly customFieldsService: CustomFieldsService) {}

  @Get()
  async getCustomFields(@Param('tenantId') tenantId: string, @Body('entityType') entityType: string) {
    return this.customFieldsService.getCustomFields(tenantId, entityType);
  }

  @Post()
  async createCustomField(@Param('tenantId') tenantId: string, @Body() createDto: CreateCustomFieldDto) {
    return this.customFieldsService.createCustomField(tenantId, createDto);
  }
}
