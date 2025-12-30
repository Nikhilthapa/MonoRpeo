import React from 'react';

interface FormGridProps {
  children: React.ReactNode;
  className?: string;
}

export function FormGrid({ children, className = '' }: FormGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-[50px] ${className}`}>
      {children}
    </div>
  );
}

