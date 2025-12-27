"use client";

import React from "react";

import { Button } from "@org/ui";
import type { CTAButton } from "@/types";

interface HeroSectionProps {
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
    text: "Find a Job",
    variant: "secondary",
    onClick: () => {},
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  kickerText = "A Smarter Way to Work & Hire.",
  title = "Where Top Talent Meets\nNext-Level Hiring.",
  description = "A modern platform where job seekers stand out, companies hire smarter, and the entire hiring process becomes faster, clearer, and more transparent for everyone involved.",
  ctaButtons = defaultCTAButtons,
}) => {
  return (
    <section className="w-full px-6 pb-12 pt-[150px] sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-gradient-kicker mb-4 text-center font-nunito text-base font-bold">
          {kickerText}
        </p>
        <h1 className="mb-6 text-3xl font-bold leading-tight text-white sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl">
          {title.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < title.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-sm leading-relaxed text-white/80 sm:mb-12 sm:text-base md:text-lg">
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
