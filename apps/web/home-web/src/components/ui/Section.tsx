import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'card';
  padding?: 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  sm: 'py-4 sm:py-6',
  md: 'py-8 sm:py-12 lg:py-16',
  lg: 'py-8 sm:py-12 lg:py-[70px]',
};

const backgroundClasses = {
  default: '',
  card: 'bg-card/30',
};

export function Section({
  children,
  className = '',
  background = 'default',
  padding = 'lg',
  ...props
}: SectionProps) {
  return (
    <section
      className={`px-4 sm:px-6 lg:px-12 ${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

