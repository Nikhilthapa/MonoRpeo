import React from 'react';
import Image from 'next/image';

interface FileIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * File Icon
 * SVG file location: /public/icons/common/file.svg
 */
export function FileIcon({ size = 18, className = '', style }: FileIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/common/file.svg"
      alt="File"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

