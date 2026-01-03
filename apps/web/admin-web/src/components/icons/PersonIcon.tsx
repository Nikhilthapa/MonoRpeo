import React from 'react';
import Image from 'next/image';

interface PersonIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Person/User icon component
 * SVG file location: /public/icons/common/person.svg
 */
export function PersonIcon({
  width = 16,
  height = 16,
  color = '#9ca3af',
  style,
}: PersonIconProps) {
  const widthNum = typeof width === 'string' ? parseInt(width) : width;
  const heightNum = typeof height === 'string' ? parseInt(height) : height;
  
  return (
    <Image
      src="/icons/common/person.svg"
      alt="Person"
      width={widthNum}
      height={heightNum}
      style={style}
    />
  );
}

