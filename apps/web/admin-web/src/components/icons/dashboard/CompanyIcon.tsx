import React from 'react';

interface CompanyIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Company/Building icon component for dashboard
 */
export function CompanyIcon({
  width = 24,
  height = 24,
  color = '#8B5CF6',
  style,
}: CompanyIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
    >
      <path
        d="M3 21H21M5 21V7L12 3L19 7V21M9 9V21M15 9V21M9 13H15M9 17H15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

