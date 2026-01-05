import React from 'react';
import Image from 'next/image';

interface GlobeIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Globe Icon (Social Media/Network)
 * SVG file location: /public/icons/common/globe.svg
 */
export function GlobeIcon({ size = 18, className = '', style }: GlobeIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/common/globe.svg"
      alt="Globe"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

