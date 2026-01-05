import React from 'react';
import Image from 'next/image';

interface CorrectIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Correct Icon
 * SVG file location: /public/icons/common/correct.svg
 */
export function CorrectIcon({ size = 18, className = '', style }: CorrectIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/common/correct.svg"
      alt="Correct"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

