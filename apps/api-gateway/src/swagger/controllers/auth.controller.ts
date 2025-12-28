import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiBody,
} from '@nestjs/swagger';
import {
  LoginDto,
  RegisterDto,
  VerifyOTPDto,
  ResendOTPDto,
  RefreshTokenDto,
} from '../dto/auth.dto';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user with email and password',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async login(
    @Body() loginDto: LoginDto,
    @Headers('x-tenant-id') tenantId?: string,
  ) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Post('register')
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user account',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({
    status: 400,
    description: 'Validation error or user already exists',
  })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async register(
    @Body() registerDto: RegisterDto,
    @Headers('x-tenant-id') tenantId?: string,
  ) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Post('verify-otp')
  @ApiOperation({
    summary: 'Verify OTP',
    description: 'Verify one-time password for email verification',
  })
  @ApiBody({ type: VerifyOTPDto })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async verifyOTP(
    @Body() verifyOTPDto: VerifyOTPDto,
    @Headers('x-tenant-id') tenantId?: string,
  ) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Post('resend-otp')
  @ApiOperation({
    summary: 'Resend OTP',
    description: 'Resend one-time password to user email',
  })
  @ApiBody({ type: ResendOTPDto })
  @ApiResponse({ status: 200, description: 'OTP resent successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid email or rate limit exceeded',
  })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async resendOTP(
    @Body() resendOTPDto: ResendOTPDto,
    @Headers('x-tenant-id') tenantId?: string,
  ) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Post('refresh-token')
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Get new access token using refresh token',
  })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get current user',
    description: 'Get authenticated user information',
  })
  @ApiResponse({
    status: 200,
    description: 'User information retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Bearer token',
  })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async getMe(@Headers('Authorization') authorization?: string) {
    return { message: 'This endpoint is proxied to the auth service' };
  }
}
