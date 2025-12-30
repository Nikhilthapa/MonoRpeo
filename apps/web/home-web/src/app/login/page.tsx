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
        router.push('/dashboard');
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
    <div className="w-full min-h-screen bg-gradient-to-br from-[#110128] via-[#1a0538] to-[#0d0217] py-6 sm:py-8 lg:py-10 px-6 sm:px-8 lg:px-12">
      <div className="w-full max-w-4xl mx-auto flex flex-col">
        {/* Logo Section */}
        <div className="w-full mt-4 sm:mt-6 mb-4 sm:mb-6 justify-start">
          <Logo />
        </div>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-5 sm:mb-6 lg:mb-8 leading-tight">
          Welcome Back
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
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
              href="#"
              className="text-xs text-primary hover:text-primary-dark font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <div className="mt-3 sm:mt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-4 sm:mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs px-3 sm:px-4">
              <span className="px-2 bg-[#110128] text-gray-400">Or continue with</span>
            </div>
          </div>
        </div>

        {/* Google Button Section */}
        <div className="mt-4 sm:mt-6">
          <GoogleButton />
        </div>

        {/* Link Section */}
        <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:text-primary-dark font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

