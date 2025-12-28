import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '@org/database';
import { EventBusService } from '@org/messaging';
import { AUTH_EVENTS, UserCreatedPayload, AuthLoginPayload } from '@org/events';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyOTPDto } from './dto/otp.dto';

@Injectable()
export class AuthService {
  private otpStore: Map<string, { otp: string; expiresAt: Date }> = new Map();

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBusService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: loginDto.email,
        tenantId: loginDto.tenantId || null,
        deletedAt: null,
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    const token = this.generateToken(user.id, user.email, user.tenantId);

    await this.eventBus.publish(AUTH_EVENTS.AUTH_LOGIN, {
      eventId: `auth-login-${Date.now()}`,
      eventType: AUTH_EVENTS.AUTH_LOGIN,
      timestamp: new Date(),
      tenantId: user.tenantId || undefined,
      userId: user.id,
      payload: {
        userId: user.id,
        email: user.email,
        tenantId: user.tenantId || undefined,
      } as AuthLoginPayload,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tenantId: user.tenantId,
      },
      token: {
        accessToken: token,
        expiresIn: 3600,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: registerDto.email,
        tenantId: registerDto.tenantId || null,
        deletedAt: null,
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const otp = this.generateOTP();

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        phone: registerDto.phone,
        tenantId: registerDto.tenantId,
        emailVerified: false,
        isActive: true,
        version: 1,
      },
    });

    this.otpStore.set(user.email, {
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await this.eventBus.publish(AUTH_EVENTS.USER_CREATED, {
      eventId: `user-created-${Date.now()}`,
      eventType: AUTH_EVENTS.USER_CREATED,
      timestamp: new Date(),
      tenantId: user.tenantId || undefined,
      userId: user.id,
      payload: {
        userId: user.id,
        email: user.email,
        tenantId: user.tenantId || undefined,
      } as UserCreatedPayload,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      otp,
    };
  }

  async verifyOTP(verifyOTPDto: VerifyOTPDto) {
    const storedOTP = this.otpStore.get(verifyOTPDto.email);
    if (!storedOTP || storedOTP.otp !== verifyOTPDto.otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    if (storedOTP.expiresAt < new Date()) {
      this.otpStore.delete(verifyOTPDto.email);
      throw new UnauthorizedException('OTP expired');
    }

    const user = await this.prisma.user.update({
      where: { email: verifyOTPDto.email },
      data: { emailVerified: true },
    });

    this.otpStore.delete(verifyOTPDto.email);

    const token = this.generateToken(user.id, user.email, user.tenantId);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tenantId: user.tenantId,
      },
      token: {
        accessToken: token,
        expiresIn: 3600,
      },
    };
  }

  async resendOTP(email: string, tenantId?: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        tenantId: tenantId || null,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const otp = this.generateOTP();
    this.otpStore.set(email, {
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    return { otp };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid token');
      }

      const token = this.generateToken(user.id, user.email, user.tenantId);
      return {
        token: {
          accessToken: token,
          expiresIn: 3600,
        },
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatarUrl: true,
        tenantId: true,
        emailVerified: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private generateToken(
    userId: string,
    email: string,
    tenantId?: string | null,
  ): string {
    return this.jwtService.sign({
      userId,
      email,
      tenantId: tenantId || undefined,
    });
  }

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
