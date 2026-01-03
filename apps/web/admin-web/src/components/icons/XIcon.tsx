import React from 'react';
import Image from 'next/image';

interface XIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * X/Close icon component (Reject)
 * SVG file location: /public/icons/common/rejected.svg
 */
export function XIcon({
  width = 16,
  height = 16,
  color = '#ffffff',
  style,
}: XIconProps) {
  const widthNum = typeof width === 'string' ? parseInt(width) : width;
  const heightNum = typeof height === 'string' ? parseInt(height) : height;
  
  return (
    <Image
      src="/icons/common/rejected.svg"
      alt="Reject"
      width={widthNum}
      height={heightNum}
      style={style}
    />
  );
}

