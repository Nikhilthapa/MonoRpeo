import React from 'react';
import Image from 'next/image';

interface DashboardIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Dashboard Icon
 * SVG file location: /public/icons/sidebar/dashboard.svg
 */
export function DashboardIcon({ size = 18, className = '', style }: DashboardIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/sidebar/dashboard.svg"
      alt="Dashboard"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

