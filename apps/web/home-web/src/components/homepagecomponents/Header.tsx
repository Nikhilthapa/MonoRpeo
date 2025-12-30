'use client';

import { Logo, Navbar, Container } from '@/components/ui';

export function Header() {
  return (
    <header className="w-full px-4 sm:px-6 md:px-8 lg:px-6 xl:px-8 2xl:px-12 py-3 sm:py-4 md:py-5 lg:py-4 xl:py-5 2xl:py-6 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <Container>
        <Navbar logo={<Logo />} />
      </Container>
    </header>
  );
}

