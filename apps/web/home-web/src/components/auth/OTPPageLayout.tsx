import React from "react";

import { ProgressHeader } from "@/components/ui/ProgressHeader";

interface OTPPageLayoutProps {
  currentStep: number;
  backButton: React.ReactNode;
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}

export const OTPPageLayout: React.FC<OTPPageLayoutProps> = ({
  currentStep,
  backButton,
  title,
  description,
  children,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <ProgressHeader currentStep={currentStep} />

        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl md:p-12">
          {backButton}

          <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">{title}</h1>

          <p className="mb-8 text-center text-gray-300">{description}</p>

          {children}
        </div>
      </div>
    </div>
  );
};
