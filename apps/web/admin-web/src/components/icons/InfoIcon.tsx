import React from 'react';
import Image from 'next/image';

interface InfoIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Info Icon
 * SVG file location: /public/icons/common/info.svg
 */
export function InfoIcon({ size = 18, className = '', style }: InfoIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/common/info.svg"
      alt="Info"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

