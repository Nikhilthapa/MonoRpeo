"use client";

import React, { useState, useMemo } from "react";

import { Button } from "@hirenova/ui";
import type { Talent } from "@/types";

interface TalentBrowsingSectionProps {
  talentCategories: string[];
  talents?: Talent[];
  defaultActiveCategory?: string;
  onTalentClick?: (talent: Talent) => void;
  onProfileClick?: (talent: Talent) => void;
  browseMoreText?: string;
  browseMoreOnClick?: () => void;
}

export const TalentBrowsingSection: React.FC<TalentBrowsingSectionProps> = ({
  talentCategories,
  talents = [],
  defaultActiveCategory,
  onTalentClick,
  onProfileClick,
  browseMoreText = "Browse more profile",
  browseMoreOnClick,
}) => {
  const [activeTalentCategory, setActiveTalentCategory] = useState(
    defaultActiveCategory || talentCategories[0] || ""
  );

  const filteredTalents = useMemo(() => {
    if (!activeTalentCategory || talents.length === 0) return [];
    return talents.filter((talent) => talent.category === activeTalentCategory);
  }, [talents, activeTalentCategory]);

  const handleTalentClick = (talent: Talent) => {
    onTalentClick?.(talent);
  };

  const handleProfileClick = (talent: Talent, e: React.MouseEvent) => {
    e.stopPropagation();
    onProfileClick?.(talent);
  };

  return (
    <section className="w-full px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap gap-3 overflow-x-auto pb-2 sm:mb-12 sm:gap-4">
          {talentCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTalentCategory(category)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all sm:px-6 sm:py-3 sm:text-base ${
                activeTalentCategory === category
                  ? "bg-gradient-primary text-white"
                  : "border border-border bg-card text-white/70 hover:border-primary hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTalents.length > 0 ? (
            filteredTalents.map((talent) => (
              <div
                key={talent.id}
                className="cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary sm:p-8"
                onClick={() => handleTalentClick(talent)}
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-primary sm:h-20 sm:w-20">
                    <span className="text-xl font-bold text-white sm:text-2xl">
                      {talent.name[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white sm:text-xl">{talent.name}</h3>
                      {talent.verified && (
                        <svg
                          className="h-4 w-4 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <svg
                        className="h-4 w-4 cursor-pointer text-white/60 hover:text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </div>
                    <p className="mb-2 text-sm text-white/80 sm:text-base">{talent.role}</p>
                    <p className="mb-2 text-xs text-white/60 sm:text-sm">{talent.experience}</p>
                    <p className="text-xs text-white/60 sm:text-sm">
                      Current CTC: {talent.currentCTC}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <Button
                    variant="primary"
                    className="mb-4 w-full py-2 text-sm"
                    onClick={(e) => handleProfileClick(talent, e)}
                  >
                    Profile
                  </Button>
                  <div className="flex flex-wrap gap-2">
                    {talent.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-primary/20 px-3 py-1 text-xs text-primary sm:text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    <button className="rounded-lg border border-border bg-card px-3 py-1 text-xs text-white transition-colors hover:border-primary sm:text-sm">
                      View CV
                    </button>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-white/70 sm:text-sm">
                  {talent.description}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-white/60">
              No talent available in this category.
            </div>
          )}
        </div>

        {browseMoreOnClick && (
          <div className="mt-8 text-center sm:mt-12">
            <Button
              variant="primary"
              className="mx-auto flex w-full items-center justify-center gap-2 px-8 py-3 text-base sm:w-auto"
              onClick={browseMoreOnClick}
            >
              {browseMoreText}{" "}
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
