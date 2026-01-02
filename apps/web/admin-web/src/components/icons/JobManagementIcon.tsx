import React from 'react';
import Image from 'next/image';

interface JobManagementIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Job Management Icon
 * SVG file location: /public/icons/sidebar/job-management.svg
 */
export function JobManagementIcon({ size = 18, className = '', style }: JobManagementIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/sidebar/job-management.svg"
      alt="Job Management"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

