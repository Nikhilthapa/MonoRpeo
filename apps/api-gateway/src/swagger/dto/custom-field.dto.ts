import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsBoolean, IsInt } from 'class-validator';

export enum CustomFieldType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  JSON = 'JSON',
}

export class CreateCustomFieldDto {
  @ApiProperty({ example: 'Job', description: 'Entity type (e.g., Job, User, Company)' })
  @IsString()
  entityType!: string;

  @ApiProperty({ example: 'remoteWork', description: 'Field name (unique per entity type)' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Remote Work', description: 'Field label for display' })
  @IsString()
  label!: string;

  @ApiProperty({ 
    enum: CustomFieldType, 
    example: CustomFieldType.BOOLEAN, 
    description: 'Field type' 
  })
  @IsEnum(CustomFieldType)
  fieldType!: CustomFieldType;

  @ApiPropertyOptional({ example: false, description: 'Is required field', default: false })
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @ApiPropertyOptional({ example: 'false', description: 'Default value' })
  @IsOptional()
  @IsString()
  defaultValue?: string;

  @ApiPropertyOptional({ example: 1, description: 'Display order', default: 0 })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiPropertyOptional({ example: true, description: 'Is visible', default: true })
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
