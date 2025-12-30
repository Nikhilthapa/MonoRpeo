import React from 'react';

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  span?: {
    default?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  };
}

const spanClassesMap: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  12: 'col-span-12',
};

const smSpanClassesMap: Record<number, string> = {
  1: 'sm:col-span-1',
  2: 'sm:col-span-2',
  3: 'sm:col-span-3',
  4: 'sm:col-span-4',
  5: 'sm:col-span-5',
  6: 'sm:col-span-6',
  12: 'sm:col-span-12',
};

const mdSpanClassesMap: Record<number, string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  12: 'md:col-span-12',
};

const lgSpanClassesMap: Record<number, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  12: 'lg:col-span-12',
};

const xlSpanClassesMap: Record<number, string> = {
  1: 'xl:col-span-1',
  2: 'xl:col-span-2',
  3: 'xl:col-span-3',
  4: 'xl:col-span-4',
  5: 'xl:col-span-5',
  6: 'xl:col-span-6',
  12: 'xl:col-span-12',
};

export function GridItem({
  children,
  className = '',
  span,
}: GridItemProps) {
  const spanClasses = span
    ? [
        span.default ? spanClassesMap[span.default] : '',
        span.sm ? smSpanClassesMap[span.sm] : '',
        span.md ? mdSpanClassesMap[span.md] : '',
        span.lg ? lgSpanClassesMap[span.lg] : '',
        span.xl ? xlSpanClassesMap[span.xl] : '',
      ]
        .filter(Boolean)
        .join(' ')
    : '';

  return <div className={`${spanClasses} ${className}`}>{children}</div>;
}

