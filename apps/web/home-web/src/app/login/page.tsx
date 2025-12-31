'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { post } from '@/lib/api';
import { setStoredUser } from '@/lib/auth';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { GoogleButton } from '@/components/ui/GoogleButton';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await post('/api/auth/login', data);

      if (response.success && response.data) {
        setStoredUser({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          email: response.data.email || data.email,
          phone: response.data.phone || '',
          token: response.data.token || '',
        });
        router.push('/approval');
      } else {
        setError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background py-6 sm:py-8 lg:py-10 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Overlay Image */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
        <img 
          src="/Images/overlay.png" 
          alt="Overlay" 
          className="w-full h-auto"
        />
      </div>
      <div className="w-full max-w-4xl mx-auto flex flex-col relative z-10">
        {/* Logo Section */}
        <div className="w-full mt-4 sm:mt-6 mb-4 sm:mb-6 justify-start">
          <Logo />
        </div>

        {/* Heading */}
        <h1 className="signup-heading mb-4 sm:mb-6 lg:mb-9">
          Welcome Back
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-[50px]">
          <Input
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
            {...register('email')}
            error={errors.email?.message}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...register('password')}
            error={errors.password?.message}
          />

          <div className="flex items-center justify-between mt-1.5">
            <div></div>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:text-primary-dark font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <div className="mt-4 sm:mt-6 lg:mt-[50px]">
            <Button type="submit" disabled={isSubmitting} className="login-button">
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>

          {/* Link Section */}
          <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:text-primary-dark font-medium">
              Sign Up
            </Link>
          </p>
        </form>

        {/* Divider */}
        <div className="mt-4 sm:mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center px-3 sm:px-4">
              <span className="px-2 bg-[#110128] signup-divider-text">OR</span>
            </div>
          </div>
        </div>

        {/* Google Button Section */}
        <div className="mt-4 sm:mt-6">
          <GoogleButton />
        </div>

        {/* Company Signup Button Section */}
        <div className="mt-4 sm:mt-6">
          <Link href="/signup" className="company-signup-button">
            <div className="company-signup-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="4" fill="#E5E5E5"/>
                <path d="M13.3335 16H18.6668" stroke="#110128" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3335 10.6667H18.6668" stroke="#110128" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.6668 27.9999V23.9999C18.6668 23.2927 18.3859 22.6144 17.8858 22.1143C17.3857 21.6142 16.7074 21.3333 16.0002 21.3333C15.2929 21.3333 14.6146 21.6142 14.1145 22.1143C13.6144 22.6144 13.3335 23.2927 13.3335 23.9999V27.9999" stroke="#110128" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.99984 13.3333H5.33317C4.62593 13.3333 3.94765 13.6142 3.44755 14.1143C2.94746 14.6144 2.6665 15.2927 2.6665 15.9999V25.3333C2.6665 26.0405 2.94746 26.7188 3.44755 27.2189C3.94765 27.719 4.62593 27.9999 5.33317 27.9999H26.6665C27.3737 27.9999 28.052 27.719 28.5521 27.2189C29.0522 26.7188 29.3332 26.0405 29.3332 25.3333V11.9999C29.3332 11.2927 29.0522 10.6144 28.5521 10.1143C28.052 9.6142 27.3737 9.33325 26.6665 9.33325H23.9998" stroke="#110128" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 28V6.66667C8 5.95942 8.28095 5.28115 8.78105 4.78105C9.28115 4.28095 9.95942 4 10.6667 4H21.3333C22.0406 4 22.7189 4.28095 23.219 4.78105C23.719 5.28115 24 5.95942 24 6.66667V28" stroke="#110128" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="company-signup-content">
              <p className="company-signup-heading">Sign up as a company</p>
              <p className="company-signup-subheading">Hire top professionals</p>
            </div>
            <div className="company-signup-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 19M19 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

