"use client";

import React, { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  loadMoreText?: string;
  onLoadMore?: () => void;
  showLoadMore?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  loadMoreText = "Load More FAQs",
  onLoadMore,
  showLoadMore = true,
}) => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <section className="w-full px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-4 text-sm text-primary sm:text-base">In Case You're Wondering</p>
          <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-white/80 sm:text-base md:text-lg">
            Everything you need to know about getting started, hiring, and using our platform — all
            in one place.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-border bg-card">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-card/80 sm:px-8 sm:py-6"
              >
                <span className="pr-4 text-sm font-medium text-white sm:text-base">
                  {faq.question}
                </span>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-primary transition-transform ${
                    expandedFAQ === index ? "rotate-45" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              {expandedFAQ === index && (
                <div className="px-6 pb-4 sm:px-8 sm:pb-6">
                  <p className="text-sm leading-relaxed text-white/70 sm:text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {showLoadMore && (
          <div className="mt-8 text-center sm:mt-12">
            <button
              onClick={onLoadMore}
              className="mx-auto flex items-center justify-center gap-2 text-sm text-primary transition-colors hover:text-primary-dark sm:text-base"
            >
              {loadMoreText}{" "}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
