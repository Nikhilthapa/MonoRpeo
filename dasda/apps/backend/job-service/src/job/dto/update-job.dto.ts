import { IsString, IsOptional, IsEnum } from 'class-validator';
import { JobStatus } from '@prisma/client';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}
