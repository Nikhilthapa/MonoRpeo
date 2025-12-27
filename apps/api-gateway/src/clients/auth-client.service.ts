import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthServiceContract } from '@org/contracts';

@Injectable()
export class AuthClientService implements AuthServiceContract {
  private readonly baseUrl =
    process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

  constructor(private readonly httpService: HttpService) {}

  async login(request: any): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/auth/login`, request),
    );
    return response.data;
  }

  async register(request: any): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/auth/register`, request),
    );
    return response.data;
  }

  async verifyOTP(request: any): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/auth/verify-otp`, request),
    );
    return response.data;
  }

  async resendOTP(email: string, tenantId?: string): Promise<void> {
    await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/auth/resend-otp`, {
        email,
        tenantId,
      }),
    );
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/auth/refresh-token`, {
        refreshToken,
      }),
    );
    return response.data;
  }

  async getMe(token: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  async validateUser(userId: string, tenantId?: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/users/${userId}`, {
          headers: tenantId ? { 'x-tenant-id': tenantId } : {},
        }),
      );
      return !!response.data;
    } catch {
      return false;
    }
  }
}
