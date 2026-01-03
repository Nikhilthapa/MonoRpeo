import React from 'react';
import Image from 'next/image';

interface UsersIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Users Icon (Vendor Management)
 * SVG file location: /public/icons/sidebar/vendor-management.svg
 */
export function UsersIcon({ size = 18, className = '', style }: UsersIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/sidebar/vendor-management.svg"
      alt="Users"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

