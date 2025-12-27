import { IsString, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;
}
