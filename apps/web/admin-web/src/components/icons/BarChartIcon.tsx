import React from 'react';
import Image from 'next/image';

interface BarChartIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Bar Chart Icon (Reports & Analytics)
 * SVG file location: /public/icons/sidebar/bar-chart.svg
 */
export function BarChartIcon({ size = 18, className = '', style }: BarChartIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/sidebar/bar-chart.svg"
      alt="Bar Chart"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

