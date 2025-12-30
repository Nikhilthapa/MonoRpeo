import React from 'react';

interface IconProps {
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

export function Icon({
  children,
  className = '',
  size = 'md',
}: IconProps) {
  return (
    <span className={`inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
}

