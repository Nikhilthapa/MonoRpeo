import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  password!: string;

  @ApiPropertyOptional({
    example: 'tenant-123',
    description: 'Tenant ID (optional)',
  })
  @IsOptional()
  @IsString()
  tenantId?: string;
}

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
    minLength: 8,
    description: 'User password (minimum 8 characters)',
  })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiPropertyOptional({ example: 'John', description: 'First name' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Last name' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    example: 'tenant-123',
    description: 'Tenant ID (optional)',
  })
  @IsOptional()
  @IsString()
  tenantId?: string;
}

export class VerifyOTPDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456', description: 'OTP code' })
  @IsString()
  otp!: string;

  @ApiPropertyOptional({
    example: 'tenant-123',
    description: 'Tenant ID (optional)',
  })
  @IsOptional()
  @IsString()
  tenantId?: string;
}

export class ResendOTPDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    example: 'tenant-123',
    description: 'Tenant ID (optional)',
  })
  @IsOptional()
  @IsString()
  tenantId?: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh-token-here', description: 'Refresh token' })
  @IsString()
  refreshToken!: string;
}
