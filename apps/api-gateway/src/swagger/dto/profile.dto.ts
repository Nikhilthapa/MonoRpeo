import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsBoolean, IsInt, Type } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSkillDto {
  @ApiProperty({ example: 'JavaScript', description: 'Skill name' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Programming', description: 'Skill category' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'Advanced', description: 'Proficiency level' })
  @IsOptional()
  @IsString()
  proficiency?: string;
}

export class CreateExperienceDto {
  @ApiProperty({ example: 'Senior Software Engineer', description: 'Job title' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Tech Corp', description: 'Company name' })
  @IsString()
  company!: string;

  @ApiPropertyOptional({ example: 'Full-time', description: 'Employment type' })
  @IsOptional()
  @IsString()
  employmentType?: string;

  @ApiPropertyOptional({ example: 'San Francisco, CA', description: 'Location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'Worked on building scalable systems', description: 'Job description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2020-01-01', description: 'Start date', type: String, format: 'date' })
  @Type(() => Date)
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startDate!: Date;

  @ApiPropertyOptional({ example: '2023-12-31', description: 'End date (null if current)', type: String, format: 'date' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  endDate?: Date;

  @ApiPropertyOptional({ example: false, description: 'Is current position', default: false })
  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;
}

export class CreateEducationDto {
  @ApiProperty({ example: 'Bachelor of Science', description: 'Degree' })
  @IsString()
  degree!: string;

  @ApiProperty({ example: 'University of Technology', description: 'Institution name' })
  @IsString()
  institution!: string;

  @ApiPropertyOptional({ example: 'Computer Science', description: 'Field of study' })
  @IsOptional()
  @IsString()
  fieldOfStudy?: string;

  @ApiPropertyOptional({ example: 'Boston, MA', description: 'Location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'Graduated with honors', description: 'Description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '2015-09-01', description: 'Start date', type: String, format: 'date' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  startDate?: Date;

  @ApiPropertyOptional({ example: '2019-05-31', description: 'End date', type: String, format: 'date' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  endDate?: Date;

  @ApiPropertyOptional({ example: '3.8', description: 'Grade/GPA' })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiPropertyOptional({ example: true, description: 'Is completed', default: true })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}

export class CreateResumeDto {
  @ApiProperty({ example: 'resume.pdf', description: 'Resume file name' })
  @IsString()
  fileName!: string;

  @ApiProperty({ example: 'https://example.com/resumes/resume.pdf', description: 'Resume file URL' })
  @IsString()
  fileUrl!: string;

  @ApiPropertyOptional({ example: 1024000, description: 'File size in bytes' })
  @IsOptional()
  @IsInt()
  fileSize?: number;

  @ApiPropertyOptional({ example: 'application/pdf', description: 'MIME type' })
  @IsOptional()
  @IsString()
  mimeType?: string;

  @ApiPropertyOptional({ example: true, description: 'Is primary resume', default: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
