import React from 'react';
import Image from 'next/image';

interface BuildingIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Building Icon (Company Management)
 * SVG file location: /public/icons/sidebar/building.svg
 */
export function BuildingIcon({ size = 18, className = '', style }: BuildingIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/sidebar/building.svg"
      alt="Building"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

