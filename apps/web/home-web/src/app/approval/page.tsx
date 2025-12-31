'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

export default function ApprovalPage() {
  return (
    <div className="w-full min-h-screen bg-background py-6 sm:py-8 lg:py-10 px-6 sm:px-8 lg:px-12 flex flex-col relative overflow-hidden">
      {/* Overlay Image */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
        <img 
          src="/Images/overlay.png" 
          alt="Overlay" 
          className="w-full h-auto"
        />
      </div>
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center flex-1 relative z-10">
        {/* Logo Section - Centered */}
        <div className="w-full mb-8 sm:mb-10 lg:mb-12 flex justify-center">
          <Logo />
        </div>

        {/* Heading */}
        <h1 className="signup-heading mb-6 sm:mb-8 lg:mb-10 text-center">
          Your Profile Is Under Review
        </h1>

        {/* Content Container */}
        <div className="w-full max-w-2xl mx-auto space-y-6 sm:space-y-8 text-center">
          {/* First Paragraph */}
          <p className="text-white text-base sm:text-lg leading-relaxed text-center">
            Thanks for signing up! We're reviewing your details to ensure a safe and verified hiring environment for everyone.
          </p>

          {/* Second Paragraph */}
          <p className="text-white text-base sm:text-lg leading-relaxed text-center">
            This process usually takes 12-24 hours. Our team is checking your basic information and verifying your account. This helps us maintain genuine profiles and provide better job-matching accuracy.
          </p>

          {/* Button Section */}
          <div className="flex justify-center mt-8 sm:mt-10 lg:mt-12">
            <Link href="/home">
              <Button className="signup-button">
                Explore Website
              </Button>
            </Link>
          </div>
        </div>

      </div>
      
      {/* Support Email - Bottom Right - Full Width */}
      <div className="w-full pt-8 sm:pt-10 lg:pt-12">
        <p className="text-white text-xs sm:text-sm text-right">
          If you have questions, reach out to{' '}
          <a 
            href="mailto:support@hirenova.com" 
            className="text-primary hover:text-primary-dark font-medium"
          >
            support@hirenova.com
          </a>
        </p>
      </div>
    </div>
  );
}

