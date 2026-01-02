'use client';

import React from 'react';
import { COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ActionButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  background?: string;
  hoverBackground?: string;
  border?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable action button component
 * Used for Approve, Reject, View, and other action buttons
 */
export function ActionButton({
  text,
  icon,
  onClick,
  background,
  hoverBackground,
  border,
  color = COLORS.TEXT_PRIMARY,
  className,
  style,
}: ActionButtonProps) {
  const { isMobile, isSmallMobile } = useMediaQuery();
  
  return (
    <button
      className={className}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isSmallMobile ? '0.25rem' : '0.375rem',
        padding: isSmallMobile ? '0.625rem 0.75rem' : (isMobile ? '0.75rem 1rem' : '0.5rem 1rem'),
        minHeight: isMobile ? '44px' : 'auto',
        borderRadius: '0.375rem',
        background: background || COLORS.SEC_BG,
        border: border || 'none',
        color: color,
        fontSize: isSmallMobile ? '0.6875rem' : '0.75rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: '"Space Grotesk", sans-serif',
        flex: isMobile ? '1 1 auto' : '0 0 auto',
        whiteSpace: 'nowrap',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (hoverBackground) {
          e.currentTarget.style.background = hoverBackground;
        }
      }}
      onMouseLeave={(e) => {
        if (background) {
          e.currentTarget.style.background = background;
        }
      }}
    >
      {icon}
      {text}
    </button>
  );
}

