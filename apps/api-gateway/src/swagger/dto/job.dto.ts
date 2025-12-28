import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum JobStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
  PAUSED = 'PAUSED',
}

export class CreateJobDto {
  @ApiProperty({ example: 'company-123', description: 'Company ID' })
  @IsString()
  companyId!: string;

  @ApiProperty({ example: 'Senior Software Engineer', description: 'Job title' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({ example: 'We are looking for an experienced software engineer...', description: 'Job description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ 
    enum: JobStatus, 
    example: JobStatus.DRAFT, 
    description: 'Job status',
    default: JobStatus.DRAFT
  })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @ApiPropertyOptional({ example: 'San Francisco, CA', description: 'Job location' })
  @IsOptional()
  @IsString()
  location?: string;
}

export class UpdateJobDto {
  @ApiPropertyOptional({ example: 'Senior Software Engineer', description: 'Job title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'We are looking for an experienced software engineer...', description: 'Job description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ 
    enum: JobStatus, 
    example: JobStatus.PUBLISHED, 
    description: 'Job status' 
  })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}
