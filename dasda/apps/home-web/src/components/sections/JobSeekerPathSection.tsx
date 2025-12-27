"use client";

import React from "react";

import { Button } from "@hirenova/ui";
import type { JobSeekerStep } from "@/types";

interface JobSeekerPathSectionProps {
  kickerText?: string;
  title?: string;
  description?: string;
  steps?: JobSeekerStep[];
  ctaButtonText?: string;
  ctaButtonOnClick?: () => void;
}

const defaultSteps: JobSeekerStep[] = [
  {
    step: "1",
    title: "Create your profile & upload your resume",
    description:
      "Add your basic details, experience, and skills — then upload your resume to showcase your work history. This helps employers understand your strong fits clearly and quickly.",
    active: true,
  },
  {
    step: "2",
    title: "Get verified",
    description:
      "Our team reviews your profile to ensure accuracy and completeness, increasing your chances of securing top opportunities.",
    active: false,
  },
  {
    step: "3",
    title: "Receive interview invites",
    description:
      "Based on your profile and preferences, receive tailored interview invitations from top companies.",
    active: false,
  },
  {
    step: "4",
    title: "Start working",
    description:
      "Accept an offer, onboard seamlessly, and commence your new role. We're here to support you every step of the way.",
    active: false,
  },
];

export const JobSeekerPathSection: React.FC<JobSeekerPathSectionProps> = ({
  kickerText = "Your Path To Success",
  title = "A Simple Path to Your Next Opportunity",
  description = "From creating your profile to landing the job — our AI-powered platform helps you get hired faster and more confidently.",
  steps = defaultSteps,
  ctaButtonText = "Find Job Now",
  ctaButtonOnClick,
}) => {
  return (
    <section className="w-full px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-4 text-sm text-primary sm:text-base">{kickerText}</p>
            <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-white/80 sm:mb-8 sm:text-base md:text-lg">
              {description}
            </p>
            {ctaButtonOnClick && (
              <Button
                variant="primary"
                className="flex w-full items-center justify-center gap-2 px-8 py-3 text-base sm:w-auto"
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
            )}
          </div>
          <div className="relative">
            <div className="space-y-6 sm:space-y-8">
              {steps.map((item, index) => (
                <div key={index} className="relative flex gap-4 sm:gap-6">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold sm:h-16 sm:w-16 sm:text-xl ${
                        item.active
                          ? "bg-gradient-primary text-white"
                          : "border border-border bg-card text-white/60"
                      }`}
                    >
                      {item.step}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="mt-2 h-full w-0.5 bg-border"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6 sm:pb-8">
                    <h3
                      className={`mb-2 text-base font-medium sm:text-lg ${item.active ? "text-white" : "text-white/70"}`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
