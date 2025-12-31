import React from 'react';

interface CandidateIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Candidate/Star icon component for dashboard
 */
export function CandidateIcon({
  width = 24,
  height = 24,
  color = '#8B5CF6',
  style,
}: CandidateIconProps) {
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
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

