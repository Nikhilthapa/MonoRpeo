import React from 'react';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressHeader({ currentStep, totalSteps = 2 }: ProgressHeaderProps) {
  const stepLabels = ['Fill Your Details', 'Verify Your Profile'];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress line - thin white horizontal line, adjusted for Step 2 shift */}
        <div className="absolute top-5 left-16 right-16 h-0.5 bg-white z-0"></div>

        {/* Steps */}
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div 
              key={stepNumber} 
              className={`flex flex-col items-center relative z-10 ${stepNumber === 2 ? 'translate-x-2' : ''}`}
            >
              {/* Step Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isActive || isCompleted
                      ? 'bg-primary' // Solid lighter purple circle for active/completed
                      : 'bg-transparent border-2 border-white' // White outline for inactive
                  }
                `}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold text-white">
                    {stepNumber}
                  </span>
                )}
              </div>
              {/* Step Label */}
              <span className="mt-1.5 text-xs font-medium text-white">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
