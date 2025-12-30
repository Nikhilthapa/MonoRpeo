import Link from 'next/link';
import { Button, Container, Section, ArrowIcon } from '@/components/ui';

export function HeroSection() {
  return (
    <Section className="hero-section relative">
      {/* Overlay */}
      <div 
        className="hero-overlay absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      
      />
      <Container className="text-center relative z-10">
        <p className="gradient-text-kicker hero-kicker">
          A Smarter Way to Work & Hire
        </p>
        <h1 className="hero-heading">
          Where Top Talent Meets
          <br />
          Next-Level Hiring
        </h1>
        <p className="hero-body-text">
          A modern platform where job seekers stand out, companies hire smarter,
          and the entire hiring process becomes faster, clearer, and more
          transparent for everyone involved.
        </p>
        <div className="hero-buttons-container">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto text-sm sm:text-base">
              Build your team
              <ArrowIcon size="sm" className="sm:w-5 sm:h-5" />
            </Button>
          </Link>
          <Link href="/signup" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Find a Job
              <ArrowIcon size="sm" className="sm:w-5 sm:h-5" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}

