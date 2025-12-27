"use client";

import React from "react";

import { Button } from "@hirenova/ui";
import type { CTAButton } from "@/types";

interface FinalCTASectionProps {
  kickerText?: string;
  title?: string;
  description?: string;
  ctaButtons?: CTAButton[];
}

const defaultCTAButtons: CTAButton[] = [
  {
    text: "Build Your Team",
    variant: "primary",
    onClick: () => {},
  },
  {
    text: "Find A Job",
    variant: "secondary",
    onClick: () => {},
  },
];

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  kickerText = "One Step Away",
  title = "Your next big opportunity is one click away.",
  description = "Unlock smarter hiring, better talent, and rapid growth — all in one powerful platform.",
  ctaButtons = defaultCTAButtons,
}) => {
  return (
    <section className="w-full px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm text-primary sm:text-base">{kickerText}</p>
        <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-sm text-white/80 sm:mb-12 sm:text-base md:text-lg">
          {description}
        </p>
        {ctaButtons.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            {ctaButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                className={`flex w-full items-center justify-center gap-2 px-8 py-3 text-base sm:w-auto ${button.className || ""}`}
                onClick={button.onClick}
              >
                {button.text}{" "}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
