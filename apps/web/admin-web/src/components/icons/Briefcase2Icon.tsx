import React from 'react';
import Image from 'next/image';

interface Briefcase2IconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Briefcase 2 Icon
 * SVG file location: /public/icons/common/brief-case2.svg
 */
export function Briefcase2Icon({ size = 18, className = '', style }: Briefcase2IconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/common/brief-case2.svg"
      alt="Briefcase"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

