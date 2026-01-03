import React from 'react';
import Image from 'next/image';

interface EyeIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Eye/View icon component
 * SVG file location: /public/icons/common/view.svg
 */
export function EyeIcon({
  width = 16,
  height = 16,
  color = '#ffffff',
  style,
}: EyeIconProps) {
  const widthNum = typeof width === 'string' ? parseInt(width) : width;
  const heightNum = typeof height === 'string' ? parseInt(height) : height;
  
  return (
    <Image
      src="/icons/common/view.svg"
      alt="View"
      width={widthNum}
      height={heightNum}
      style={style}
    />
  );
}

