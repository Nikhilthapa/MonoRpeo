import { Controller, Post, Get, Body, Headers, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyOTPDto, ResendOTPDto } from './dto/otp.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Headers('x-tenant-id') tenantId?: string) {
    return this.authService.login({ ...loginDto, tenantId: tenantId || loginDto.tenantId });
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Headers('x-tenant-id') tenantId?: string) {
    return this.authService.register({ ...registerDto, tenantId: tenantId || registerDto.tenantId });
  }

  @Post('verify-otp')
  async verifyOTP(@Body() verifyOTPDto: VerifyOTPDto, @Headers('x-tenant-id') tenantId?: string) {
    return this.authService.verifyOTP({ ...verifyOTPDto, tenantId: tenantId || verifyOTPDto.tenantId });
  }

  @Post('resend-otp')
  async resendOTP(@Body() resendOTPDto: ResendOTPDto, @Headers('x-tenant-id') tenantId?: string) {
    return this.authService.resendOTP(resendOTPDto.email, tenantId || resendOTPDto.tenantId);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req: any) {
    return this.authService.getMe(req.user.userId);
  }
}
