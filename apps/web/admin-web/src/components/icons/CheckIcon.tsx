import React from 'react';
import Image from 'next/image';

interface CheckIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Check/Checkmark icon component (Approve)
 * SVG file location: /public/icons/common/approve.svg
 */
export function CheckIcon({
  width = 16,
  height = 16,
  color = '#ffffff',
  style,
}: CheckIconProps) {
  const widthNum = typeof width === 'string' ? parseInt(width) : width;
  const heightNum = typeof height === 'string' ? parseInt(height) : height;
  
  return (
    <Image
      src="/icons/common/approve.svg"
      alt="Approve"
      width={widthNum}
      height={heightNum}
      style={style}
    />
  );
}

