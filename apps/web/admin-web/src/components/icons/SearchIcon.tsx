import React from 'react';

interface SearchIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Search icon component
 */
export function SearchIcon({
  width = 24,
  height = 24,
  color = '#CCCCCC',
  style,
}: SearchIconProps) {
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
        d="M20 20L15.95 15.95M15.95 15.95C16.6 15.3 17.1157 14.5282 17.4675 13.6789C17.8193 12.8296 18.0003 11.9193 18.0003 11C18.0003 10.0807 17.8193 9.1704 17.4675 8.32108C17.1157 7.47176 16.6 6.70004 15.95 6.05C15.2999 5.39996 14.5282 4.88431 13.6789 4.53251C12.8296 4.18071 11.9193 3.99964 11 3.99964C10.0807 3.99964 9.17039 4.18071 8.32107 4.53251C7.47175 4.88431 6.70003 5.39996 6.04999 6.05C4.73717 7.36282 3.99963 9.14339 3.99963 11C3.99963 12.8566 4.73717 14.6372 6.04999 15.95C7.36281 17.2628 9.14338 18.0004 11 18.0004C12.8566 18.0004 14.6372 17.2628 15.95 15.95Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

