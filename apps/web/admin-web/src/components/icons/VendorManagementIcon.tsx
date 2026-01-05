import React from 'react';
import Image from 'next/image';

interface VendorManagementIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

/**
 * Vendor Management Icon
 * SVG file location: /public/icons/sidebar/vendor-management.svg
 */
export function VendorManagementIcon({ size = 18, className = '', style, color }: VendorManagementIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/sidebar/vendor-management.svg"
      alt="Vendor Management"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

