import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-base">H</span>
      </div>
      <span className="text-white font-semibold text-lg">HireNova</span>
    </div>
  );
}

