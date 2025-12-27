import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateResumeDto {
  @IsString()
  fileName: string;

  @IsString()
  fileUrl: string;

  @IsOptional()
  @IsInt()
  fileSize?: number;

  @IsOptional()
  @IsString()
  mimeType?: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
