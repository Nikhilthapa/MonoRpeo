import React from 'react';

interface ProfileIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Profile/User icon component
 */
export function ProfileIcon({
  width = 39,
  height = 39,
  color = '#7F5BFF',
  style,
}: ProfileIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 39 39"
      fill="none"
      style={style}
    >
      <path
        d="M19.0972 0C21.6297 0 24.0584 1.00601 25.8491 2.79672C27.6398 4.58743 28.6458 7.01616 28.6458 9.54861C28.6458 12.0811 27.6398 14.5098 25.8491 16.3005C24.0584 18.0912 21.6297 19.0972 19.0972 19.0972C16.5648 19.0972 14.136 18.0912 12.3453 16.3005C10.5546 14.5098 9.54861 12.0811 9.54861 9.54861C9.54861 7.01616 10.5546 4.58743 12.3453 2.79672C14.136 1.00601 16.5648 0 19.0972 0ZM19.0972 23.8715C29.6484 23.8715 38.1944 28.1445 38.1944 33.4201V38.1944H0V33.4201C0 28.1445 8.54601 23.8715 19.0972 23.8715Z"
        fill={color}
      />
    </svg>
  );
}

