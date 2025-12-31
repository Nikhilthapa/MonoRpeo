'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { post } from '@/lib/api';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await post('/api/auth/forgot-password', data);

      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.message || 'Failed to send password reset link. Please try again.');
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
        {/* Back to Login Link */}
        <Link
          href="/login"
          className="flex items-center gap-2 text-sm mb-6 sm:mb-8 text-gray-300 hover:text-white transition-colors w-fit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to login
        </Link>

        {/* Logo Section */}
        <div className="w-full mb-6 sm:mb-8">
          <Logo />
        </div>

        {/* Heading */}
        <h1 className="signup-heading mb-4 sm:mb-6 lg:mb-9">
          Forgot password?{' '}
          <span className="signup-heading-gradient">Reset it</span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg">
          Enter your registered email and we'll send you a secure password reset link to help you regain access.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded-lg text-green-400 text-sm">
            Password reset link has been sent to your email. Please check your inbox.
          </div>
        )}

        {/* Form */}
        {!success && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-[50px]">
            <div>
              <p className="text-white mb-4 text-base">
                Enter your registered email address to receive your password reset link
              </p>
              <Input
                label="Email"
                type="email"
                placeholder="Enter Email"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>

            <div className="mt-4 sm:mt-6 lg:mt-[50px]">
              <Button type="submit" disabled={isSubmitting} className="login-button">
                {isSubmitting ? 'Sending...' : 'Send Password Reset Link'}
              </Button>
            </div>
          </form>
        )}

        {/* Back to Login Link (if success) */}
        {success && (
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-primary hover:text-primary-dark font-medium text-base"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

