"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomePageLayout } from "@/components/sections/HomePageLayout";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { JobBrowsingSection } from "@/components/sections/JobBrowsingSection";
import { JobSeekerPathSection } from "@/components/sections/JobSeekerPathSection";
import { TalentBrowsingSection } from "@/components/sections/TalentBrowsingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Navbar } from "@hirenova/ui";
import { ROUTES } from "@/constants";
import type { CTAButton } from "@/types";
import type { ActionButton } from "@hirenova/ui";

export default function HomePage() {
  const router = useRouter();

  const talentCategories = [
    "Software Engineers",
    "MERN Engineers",
    "Full Stack Developers",
    "Data Scientist",
    "DevOps",
    "UI UX Designer",
  ];
  const jobCategories = [
    "Software Engineers",
    "MERN Engineers",
    "Full Stack Developers",
    "Data Scientist",
    "DevOps",
    "UI UX Designer",
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      title: "Head of Talent, Northwind Studio",
      quote:
        "The built-in workflow and applicant tracking finally gave our hiring team clarity. Everyone uses the same pipeline, and nothing slips through the cracks.",
      image: "/api/placeholder/80/80",
    },
  ];

  const faqs = [
    {
      question: "How Does The Platform Match Me With The Right Talent Or Job?",
      answer:
        "Our AI-powered matching system analyzes your profile, skills, and preferences to connect you with the most relevant opportunities. For employers, we match job requirements with candidate profiles to find the perfect fit.",
    },
    {
      question: "Are The Candidates And Companies Verified?",
      answer:
        "Yes, all candidates and companies go through a verification process to ensure authenticity and quality. We maintain a high-quality talent pool by verifying profiles, experience, and credentials.",
    },
    {
      question: "Is It Free To Create A Profile Or Post A Job?",
      answer:
        "Creating a profile is completely free. For job postings, we offer both free and premium options depending on your needs. Contact us to learn more about our pricing plans.",
    },
    {
      question: "How Long Does It Take To Start Receiving Matches?",
      answer:
        "Once your profile is complete and verified, you can start receiving matches within 24-48 hours. The matching process is continuous, so you'll receive new opportunities as they become available.",
    },
  ];

  const navItems: ActionButton[] = [
    {
      label: "Build Your Team",
      variant: "primary-nav",
      onClick: () => router.push(ROUTES.SIGNUP),
    },
    {
      label: "Find A Job",
      variant: "secondary-nav",
      onClick: () => router.push(ROUTES.SIGNUP),
    },
  ];

  const heroCTAs: CTAButton[] = [
    {
      text: "Build Your Team",
      variant: "primary",
      onClick: () => router.push(ROUTES.SIGNUP),
    },
    {
      text: "Find a Job",
      variant: "secondary",
      onClick: () => router.push(ROUTES.SIGNUP),
    },
  ];

  const finalCTAs: CTAButton[] = [
    {
      text: "Build Your Team",
      variant: "primary",
      onClick: () => router.push(ROUTES.SIGNUP),
    },
    {
      text: "Find A Job",
      variant: "secondary",
      onClick: () => router.push(ROUTES.SIGNUP),
    },
  ];

  return (
    <HomePageLayout>
      <Navbar actionButtons={navItems} />
      <HeroSection ctaButtons={heroCTAs} />
      <TestimonialsSection testimonials={testimonials} showSeeMore={false} />
      <HowItWorksSection
        ctaButtonText="Build Your Team"
        ctaButtonOnClick={() => router.push(ROUTES.SIGNUP)}
      />
      <TalentBrowsingSection talentCategories={talentCategories} />
      <JobSeekerPathSection
        ctaButtonText="Find Job Now"
        ctaButtonOnClick={() => router.push(ROUTES.SIGNUP)}
      />
      <JobBrowsingSection jobCategories={jobCategories} />
      <FAQSection faqs={faqs} showLoadMore={false} />
      <FinalCTASection ctaButtons={finalCTAs} />
    </HomePageLayout>
  );
}
