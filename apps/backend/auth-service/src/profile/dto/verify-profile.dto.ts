import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class VerifyProfileDto {
  @IsOptional()
  @IsString()
  currentJobFunction?: string;

  @IsOptional()
  @IsString()
  currentLocation?: string;

  @IsOptional()
  @IsString()
  yearsOfExperience?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  currentAnnualSalary?: number;

  @IsOptional()
  @IsString()
  resumeFileName?: string;

  @IsOptional()
  @IsString()
  resumeFileUrl?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  resumeFileSize?: number;

  @IsOptional()
  @IsString()
  resumeMimeType?: string;
}
