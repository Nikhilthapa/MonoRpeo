'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import Link from 'next/link';
import { post } from '@/lib/api';
import { setTempUser } from '@/lib/auth';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { ProgressHeader } from '@/components/ui/ProgressHeader';
import { FormGrid } from '@/components/ui/FormGrid';
import { GoogleButton } from '@/components/ui/GoogleButton';

const signupSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { confirmPassword, ...submitData } = data;
      const response = await post('/api/auth/register', submitData);

      if (response.success) {
        setTempUser({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        });
        router.push('/otp');
      } else {
        setError(response.message || 'Registration failed. Please try again.');
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
        {/* Progress Header Section - At the top */}
        <div className="w-full mb-6 sm:mb-8">
          <ProgressHeader currentStep={1} totalSteps={2} />
        </div>

        {/* Logo Section - Below progress bar, on the left */}
        <div className="w-full mb-6 sm:mb-8">
          <Logo />
        </div>

        {/* Main Heading */}
        <h1 className="signup-heading mb-4 sm:mb-6 lg:mb-9">
          Find Your Next Big Opportunity!{' '}
          <span className="signup-heading-gradient">
            Create Your Profile
          </span>
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-[50px]">
          {/* First Name & Last Name */}
          <FormGrid>
            <Input
              label="First Name"
              placeholder="Enter Your First Name"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              placeholder="Enter Your Last Name"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
          </FormGrid>

          {/* Phone Number & Email */}
          <FormGrid>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter Your Phone Number"
              {...register('phone')}
              error={errors.phone?.message}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter Your Email"
              {...register('email')}
              error={errors.email?.message}
            />
          </FormGrid>

          {/* Create Password & Confirm Password */}
          <FormGrid>
            <PasswordInput
              label="Create Password"
              placeholder="Enter Your Password"
              {...register('password')}
              error={errors.password?.message}
            />
            <PasswordInput
              label="Confirm Your Password"
              placeholder="Enter Your Confirm Password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </FormGrid>

          <div className="mt-4 sm:mt-6 lg:mt-[50px]">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'SIGN UP NOW'}
            </Button>
          </div>
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

        {/* Link Section */}
        {/* <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
            Log In
          </Link>
        </p> */}
      </div>
    </div>
  );
}
