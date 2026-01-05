import React from 'react';
import Image from 'next/image';

interface EnvelopeIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Envelope Icon (Mail/Email)
 * SVG file location: /public/icons/common/envelope.svg
 */
export function EnvelopeIcon({ size = 18, className = '', style }: EnvelopeIconProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size;
  
  return (
    <Image
      src="/icons/common/envelope.svg"
      alt="Envelope"
      width={sizeNum}
      height={sizeNum}
      className={className}
      style={style}
    />
  );
}

