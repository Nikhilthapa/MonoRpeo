"use client";

import React from "react";

import { Button } from "@hirenova/ui";
import type { Step } from "@/types";

interface HowItWorksSectionProps {
  kickerText?: string;
  title?: string;
  description?: string;
  steps?: Step[];
  ctaButtonText?: string;
  ctaButtonOnClick?: () => void;
  showCta?: boolean;
}

const defaultSteps: Step[] = [
  {
    number: "1",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    ),
    title: "Tell us what you're looking for.",
    description:
      "Share your role, requirements, and expectations. We analyze your needs to ensure you get perfectly matched talent.",
  },
  {
    number: "2",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "Explore curated, pre-vetted talent.",
    description:
      "Get handpicked candidates that match your criteria. Every profile is verified, skilled, and ready to contribute.",
  },
  {
    number: "3",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    title: "Interview effortlessly.",
    description:
      "Choose the talent that fits your goals. We streamline interviews so your hiring journey is fast and easy.",
  },
  {
    number: "4",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Hire with full confidence.",
    description:
      "Once you select your candidate, we guide the onboarding process and ensure everything starts on the right foot.",
  },
];

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  kickerText = "Clarity At Every Step.",
  title = "Hire Smarter in 4 Simple Steps.",
  description = "Find the right talent without the noise. Our streamlined process connects you with vetted, high-quality candidates quickly, clearly, and efficiently.",
  steps = defaultSteps,
  ctaButtonText = "Build Your Team",
  ctaButtonOnClick,
  showCta = true,
}) => {
  return (
    <section className="w-full px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-4 text-sm text-primary sm:text-base">{kickerText}</p>
          <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-white/80 sm:text-base md:text-lg">
            {description}
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-0 right-0 top-24 hidden h-0.5 border-t-2 border-dashed border-border md:block"
            style={{ top: "6rem" }}
          ></div>

          <div className="relative grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary sm:mb-6 sm:h-20 sm:w-20">
                    <span className="text-2xl font-bold text-white sm:text-3xl">{step.number}</span>
                  </div>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                    {step.icon}
                  </div>
                  <h3 className="mb-3 text-base font-medium text-white sm:text-lg">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showCta && ctaButtonOnClick && (
          <div className="mt-12 text-center sm:mt-16">
            <Button
              variant="primary"
              className="mx-auto flex w-full items-center justify-center gap-2 px-8 py-3 text-base sm:w-auto"
              onClick={ctaButtonOnClick}
            >
              {ctaButtonText}{" "}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
