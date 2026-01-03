import React from 'react';
import Image from 'next/image';

interface FileTextIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * File Text Icon (Activity Logs)
 * SVG file location: /public/icons/sidebar/file-text.svg
 */
export function FileTextIcon({ size = 18, className = '', style }: FileTextIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/sidebar/file-text.svg"
      alt="File Text"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

