import { IsEmail, IsString, IsOptional } from 'class-validator';

export class VerifyOTPDto {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;

  @IsOptional()
  @IsString()
  tenantId?: string;
}

export class ResendOTPDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  tenantId?: string;
}
