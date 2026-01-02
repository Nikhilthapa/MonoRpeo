import React from 'react';
import Image from 'next/image';

interface UserIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * User Icon (Candidate Management)
 * SVG file location: /public/icons/sidebar/candidate-management.svg
 */
export function UserIcon({ size = 18, className = '', style }: UserIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/sidebar/candidate-management.svg"
      alt="User"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

