import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @ApiPropertyOptional({
    example: 'user-123',
    description: 'User ID applying for the job',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    example: 'I am interested in this position because...',
    description: 'Cover letter',
  })
  @IsOptional()
  @IsString()
  coverLetter?: string;
}
