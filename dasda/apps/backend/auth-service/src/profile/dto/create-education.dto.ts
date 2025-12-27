import { IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEducationDto {
  @IsString()
  degree: string;

  @IsString()
  institution: string;

  @IsOptional()
  @IsString()
  fieldOfStudy?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
