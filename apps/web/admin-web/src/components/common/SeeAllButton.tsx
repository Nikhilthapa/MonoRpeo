'use client';

import Link from 'next/link';
import { COLORS } from '@/constants/styles';

interface SeeAllButtonProps {
  href: string;
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable "See All" button component
 * Used across dashboard components for consistent styling
 */
export function SeeAllButton({ href, text, className, style }: SeeAllButtonProps) {
  return (
    <div style={{ textAlign: 'center', marginTop: '1.5rem', ...style }}>
      <Link
        href={href}
        className={className}
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          background: COLORS.SEC_BG,
          border: `1px solid ${COLORS.PRIMARY}`,
          color: COLORS.PRIMARY,
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: '500',
          transition: 'all 0.2s',
          fontFamily: '"Space Grotesk", sans-serif',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = COLORS.BG_PRIMARY_OVERLAY;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = COLORS.SEC_BG;
        }}
      >
        {text}
      </Link>
    </div>
  );
}

