'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { post } from '@/lib/api';
import { getTempUser, clearTempUser, setStoredUser } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { ProgressHeader } from '@/components/ui/ProgressHeader';

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const tempUser = getTempUser();

  useEffect(() => {
    if (!tempUser?.email) {
      router.push('/signup');
    } else {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  }, [router, tempUser]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || '';
      }
      setOtp(newOtp);
      setError(null);
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUser?.email) {
      router.push('/signup');
      return;
    }
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await post('/api/auth/verify-otp', {
        email: tempUser.email,
        otp: otpValue,
      });
      if (response.success && response.data) {
        clearTempUser();
        setStoredUser({
          firstName: response.data.firstName || tempUser.firstName || '',
          lastName: response.data.lastName || tempUser.lastName || '',
          email: response.data.email || tempUser.email || '',
          phone: response.data.phone || tempUser.phone || '',
          token: response.data.token || '',
        });
        router.push('/dashboard');
      } else {
        setError(response.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (!tempUser?.email || resendCooldown > 0) return;
    try {
      const response = await post('/api/auth/resend-otp', {
        email: tempUser.email,
      });
      if (response.success) {
        setResendCooldown(60);
        setError(null);
      } else {
        setError(response.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  if (!tempUser?.email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-2xl">
          {/* Back Button */}
          <Link
            href="/signup"
            className="flex items-center gap-2 text-sm mb-6 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <ProgressHeader currentStep={2} totalSteps={2} />

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Verify Your Email</h1>

          {/* Description */}
          <p className="text-gray-300 mb-8 text-center">
            We've sent a verification code to <br />
            <span className="text-white font-medium">{tempUser.email}</span>
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Container */}
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`
                    w-12 h-14 text-center text-2xl font-semibold
                    rounded-lg bg-card border-2
                    text-white focus:outline-none
                    transition-all duration-200
                    ${error ? 'border-red-400' : 'border-border focus:border-primary'}
                  `}
                />
              ))}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>

          {/* Resend Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Didn't receive the code?{' '}
              {resendCooldown > 0 ? (
                <span className="opacity-50">Resend in {resendCooldown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  Resend OTP
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

