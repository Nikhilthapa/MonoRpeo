import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class PresignedUrlDto {
  @IsString()
  fileName!: string;

  @IsString()
  @IsIn(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
  mimeType!: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  fileSize?: number;
}
