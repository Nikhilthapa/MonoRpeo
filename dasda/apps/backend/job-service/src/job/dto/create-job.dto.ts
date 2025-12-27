import { IsString, IsOptional, IsInt, IsEnum, IsDecimal } from 'class-validator';
import { JobStatus } from '@prisma/client';

export class CreateJobDto {
  @IsString()
  companyId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @IsOptional()
  @IsString()
  location?: string;
}
