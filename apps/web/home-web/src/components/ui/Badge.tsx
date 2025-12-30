import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md';
}

const variantClasses = {
  primary: 'bg-primary text-white',
  secondary: 'bg-background border border-border text-gray-300',
  outline: 'bg-card border border-border text-gray-300 hover:border-primary',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({
  children,
  className = '',
  variant = 'secondary',
  size = 'sm',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}

