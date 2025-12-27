"use client";

import React, { useState, useMemo } from "react";

import { Button } from "@org/ui";
import type { Job } from "@/types";

interface JobBrowsingSectionProps {
  jobCategories: string[];
  jobs?: Job[];
  defaultActiveCategory?: string;
  onJobClick?: (job: Job) => void;
  onApplyClick?: (job: Job) => void;
}

export const JobBrowsingSection: React.FC<JobBrowsingSectionProps> = ({
  jobCategories,
  jobs = [],
  defaultActiveCategory,
  onJobClick,
  onApplyClick,
}) => {
  const [activeJobCategory, setActiveJobCategory] = useState(
    defaultActiveCategory || jobCategories[0] || ""
  );

  const filteredJobs = useMemo(() => {
    if (!activeJobCategory || jobs.length === 0) return [];
    return jobs.filter((job) => job.category === activeJobCategory);
  }, [jobs, activeJobCategory]);

  const handleJobClick = (job: Job) => {
    onJobClick?.(job);
  };

  const handleApplyClick = (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();
    onApplyClick?.(job);
  };

  return (
    <section className="w-full px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap gap-3 overflow-x-auto pb-2 sm:mb-12 sm:gap-4">
          {jobCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveJobCategory(category)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all sm:px-6 sm:py-3 sm:text-base ${
                activeJobCategory === category
                  ? "bg-gradient-primary text-white"
                  : "border border-border bg-card text-white/70 hover:border-primary hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="relative cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary sm:p-8"
                onClick={() => handleJobClick(job)}
              >
                <button className="absolute right-4 top-4 text-white/60 transition-colors hover:text-primary">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
                <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">{job.title}</h3>
                <p className="mb-1 text-sm text-white/80 sm:text-base">{job.company}</p>
                <p className="mb-4 text-xs text-white/60 sm:text-sm">
                  {job.location} ({job.type})
                </p>
                <div className="mb-4 space-y-2">
                  <p className="text-xs text-white/70 sm:text-sm">{job.experience}</p>
                  <p className="text-xs text-white/70 sm:text-sm">{job.salary}</p>
                  <p className="text-xs text-white/60">{job.postedDate}</p>
                </div>
                <Button
                  variant="primary"
                  className="w-full py-2 text-sm"
                  onClick={(e) => handleApplyClick(job, e)}
                >
                  Apply Now
                </Button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-white/60">
              No jobs available in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
