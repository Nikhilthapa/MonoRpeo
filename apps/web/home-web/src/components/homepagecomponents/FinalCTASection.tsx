import Link from 'next/link';
import { Button, Container, Section, Icon, ArrowIcon } from '@/components/ui';

export function FinalCTASection() {
  return (
    <Section background="card" className="relative">
      {/* Overlay */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '346px',
          height: '346px',
          borderRadius: '446px',
          background: 'var(--secondary-aaccent, #57447F)',
          filter: 'blur(150px)',
          zIndex: 0,
        }}
      />
      <Container maxWidth="4xl" className="text-center relative z-10">
        <p className="gradient-text-kicker cta-kicker mb-1">One Step Away</p>
        <h2 className="cta-heading mb-3">
          Your next big opportunity is one click away.
        </h2>
        <p className="cta-description mb-8">
          Unlock smarter hiring, better talent, and rapid growth - all in one powerful platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button className="flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base">
              Build Your Team
              <Icon size="sm" className="sm:w-5 sm:h-5">
                <ArrowIcon size="sm" className="sm:w-5 sm:h-5" />
              </Icon>
            </Button>
          </Link>
          <Link href="/signup" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              className="flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base"
            >
              Find A Job
              <Icon size="sm" className="sm:w-5 sm:h-5">
                <ArrowIcon size="sm" className="sm:w-5 sm:h-5" />
              </Icon>
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}

