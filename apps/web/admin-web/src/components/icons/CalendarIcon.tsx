import React from 'react';
import Image from 'next/image';

interface CalendarIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Calendar Icon (Interview Management)
 * SVG file location: /public/icons/sidebar/calendar.svg
 */
export function CalendarIcon({ size = 18, className = '', style }: CalendarIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/sidebar/calendar.svg"
      alt="Calendar"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

