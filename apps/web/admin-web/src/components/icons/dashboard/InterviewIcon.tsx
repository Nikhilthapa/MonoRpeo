import React from 'react';

interface InterviewIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Interview/Calendar icon component for dashboard
 */
export function InterviewIcon({
  width = 24,
  height = 24,
  color = '#8B5CF6',
  style,
}: InterviewIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
  <circle cx="25" cy="25" r="25" fill="#7F5BFF" fill-opacity="0.2"/>
  <path d="M14 32.7C14 34.57 15.43 36 17.3 36H32.7C34.57 36 36 34.57 36 32.7V23.9H14V32.7ZM32.7 16.2H30.5V15.1C30.5 14.44 30.06 14 29.4 14C28.74 14 28.3 14.44 28.3 15.1V16.2H21.7V15.1C21.7 14.44 21.26 14 20.6 14C19.94 14 19.5 14.44 19.5 15.1V16.2H17.3C15.43 16.2 14 17.63 14 19.5V21.7H36V19.5C36 17.63 34.57 16.2 32.7 16.2Z" fill="url(#paint0_linear_721_3797)"/>
  <defs>
    <linearGradient id="paint0_linear_721_3797" x1="36" y1="25" x2="14" y2="25" gradientUnits="userSpaceOnUse">
      <stop stop-color="#4C3799"/>
      <stop offset="1" stop-color="#7F5BFF"/>
    </linearGradient>
  </defs>
</svg>
  );
}

