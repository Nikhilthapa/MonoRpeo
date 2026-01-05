import React from 'react';
import Image from 'next/image';

interface DollarIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

/**
 * Dollar Icon
 * SVG file location: /public/icons/common/doller.svg
 */
export function DollarIcon({ size = 18, className = '', style, color }: DollarIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/common/doller.svg"
      alt="Dollar"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

