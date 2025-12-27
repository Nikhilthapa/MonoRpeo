import type { ReactNode } from "react";

export interface Step {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export interface JobSeekerStep {
  step: string;
  title: string;
  description: string;
  active: boolean;
}

export interface Job {
  id: string | number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  postedDate: string;
  category: string;
}

export interface Talent {
  id: string | number;
  name: string;
  role: string;
  experience: string;
  currentCTC: string;
  skills: string[];
  description: string;
  category: string;
  verified?: boolean;
}

export interface CTAButton {
  text: string;
  variant: "primary" | "secondary" | "primary-nav" | "secondary-nav";
  onClick: () => void;
  className?: string;
}
