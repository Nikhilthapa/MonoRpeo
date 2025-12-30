import React from 'react';
import { Icon } from './Icon';

interface ArrowIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function ArrowIcon({ className = '', size = 'sm' }: ArrowIconProps) {
  return (
    <Icon size={size} className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none" className="w-full h-full">
        <path 
          d="M15 7.004H1M9 1L15 7L9 13" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
}

