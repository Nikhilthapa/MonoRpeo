import React from 'react';
import Image from 'next/image';

interface SettingsIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Settings Icon
 * SVG file location: /public/icons/sidebar/settings.svg
 */
export function SettingsIcon({ size = 18, className = '', style }: SettingsIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/sidebar/settings.svg"
      alt="Settings"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

