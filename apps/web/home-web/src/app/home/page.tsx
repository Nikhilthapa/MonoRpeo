'use client';

import { Header } from '@/components/homepagecomponents/Header';
import { HeroSection } from '@/components/homepagecomponents/HeroSection';
import { TestimonialsSection } from '@/components/homepagecomponents/TestimonialsSection';
import { HowItWorksSection } from '@/components/homepagecomponents/HowItWorksSection';
import { TalentListingsSection } from '@/components/homepagecomponents/TalentListingsSection';
import { PathToOpportunitySection } from '@/components/homepagecomponents/PathToOpportunitySection';
import { FAQSection } from '@/components/homepagecomponents/FAQSection';
import { FinalCTASection } from '@/components/homepagecomponents/FinalCTASection';
import { Footer } from '@/components/homepagecomponents/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <Header />
      <HeroSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <TalentListingsSection />
      <PathToOpportunitySection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
