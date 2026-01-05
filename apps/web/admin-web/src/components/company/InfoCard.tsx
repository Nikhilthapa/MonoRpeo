'use client';

import { COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface InfoCardProps {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Base card component for consistent styling across all information cards
 */
export function InfoCard({ title, children, style }: InfoCardProps) {
  const { isMobile, isSmallMobile } = useMediaQuery();

  return (
    <div
      style={{
        background: COLORS.SEC_BG,
        borderRadius: '0.75rem',
        padding: isSmallMobile ? '1rem' : (isMobile ? '1.25rem' : '1.5rem'),
        border: `1px solid ${COLORS.BORDER_SECONDARY}`,
        ...style,
      }}
    >
      {title && (
        <h3
          style={{
            color: COLORS.TEXT_PRIMARY,
            fontSize: isSmallMobile ? '0.875rem' : '1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

