import React from 'react';
import Image from 'next/image';

interface ClockIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Clock/Time icon component
 * SVG file location: /public/icons/common/time.svg
 */
export function ClockIcon({
  width = 16,
  height = 16,
  color = '#9ca3af',
  style,
}: ClockIconProps) {
  const widthNum = typeof width === 'string' ? parseInt(width) : width;
  const heightNum = typeof height === 'string' ? parseInt(height) : height;
  
  return (
    <Image
      src="/icons/common/time.svg"
      alt="Clock"
      width={widthNum}
      height={heightNum}
      style={style}
    />
  );
}

