"use client";

import React from "react";

import { Button } from "@hirenova/ui";

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  image: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  seeMoreText?: string;
  onSeeMore?: () => void;
  showSeeMore?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  seeMoreText = "See More",
  onSeeMore,
  showSeeMore = true,
}) => {
  return (
    <section className="w-full px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl">
              Loved by teams and talent worldwide.
            </h2>
            <p className="mb-6 text-sm text-white/80 sm:mb-8 sm:text-base md:text-lg">
              Real stories from people who use our platform to hire faster and get hired smarter.
            </p>
            {showSeeMore && onSeeMore && (
              <Button
                variant="primary"
                className="flex w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto"
                onClick={onSeeMore}
              >
                {seeMoreText}{" "}
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
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`rounded-2xl border bg-card p-6 sm:p-8 ${index === 1 ? "border-primary shadow-lg shadow-primary/20" : "border-border"} ${index !== 0 ? "mt-4" : ""}`}
                style={{ zIndex: testimonials.length - index }}
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-primary sm:h-16 sm:w-16">
                    <span className="text-lg font-bold text-white sm:text-xl">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-base font-bold text-white sm:text-lg">
                        {testimonial.name}
                      </h3>
                      <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-white/60">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                  {testimonial.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
