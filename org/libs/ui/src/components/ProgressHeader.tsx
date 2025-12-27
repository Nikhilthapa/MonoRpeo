import React from "react";

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps?: number;
  stepLabels?: string[];
}

const defaultStepLabels = ["Fill Your Details", "Verify Your Profile"];

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  currentStep,
  totalSteps = 2,
  stepLabels = defaultStepLabels,
}) => {
  return (
    <div className="mb-4 w-full sm:mb-5">
      <div className="flex items-start justify-start px-2 sm:px-0">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-shrink-0 flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-200 ${
                    isActive || isCompleted
                      ? "bg-gradient-primary text-white"
                      : "border-2 border-white bg-transparent text-white"
                  } `}
                >
                  {isCompleted ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span className="mt-1.5 whitespace-nowrap text-xs font-medium text-white">
                  {stepLabels[index] || `Step ${step}`}
                </span>
              </div>
              {step < totalSteps && <div className="mx-3 mt-5 h-0.5 flex-1 bg-white sm:mx-6" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
