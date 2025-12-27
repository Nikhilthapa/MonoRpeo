import { LoginRequest, RegisterRequest, AuthResponse, User, OTPVerificationRequest } from '@hirenova/shared-types';

export interface AuthServiceContract {
  login(request: LoginRequest): Promise<AuthResponse>;
  register(request: RegisterRequest): Promise<AuthResponse>;
  verifyOTP(request: OTPVerificationRequest): Promise<AuthResponse>;
  resendOTP(email: string, tenantId?: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthResponse>;
  getMe(token: string): Promise<User>;
  validateUser(userId: string, tenantId?: string): Promise<boolean>;
}
