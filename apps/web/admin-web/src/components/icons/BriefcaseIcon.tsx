import React from 'react';
import Image from 'next/image';

interface BriefcaseIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Briefcase Icon (Admin Job Management)
 * SVG file location: /public/icons/sidebar/briefcase.svg
 */
export function BriefcaseIcon({ size = 18, className = '', style }: BriefcaseIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/sidebar/briefcase.svg"
      alt="Briefcase"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

