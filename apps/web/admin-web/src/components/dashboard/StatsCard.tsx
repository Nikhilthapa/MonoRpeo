'use client';

import React from 'react';
import { subHeadingStyles, headingStyles, COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  const { isMobile } = useMediaQuery();
  
  return (
    <div
      style={{
        background: COLORS.TRANSPARENT,
        borderRadius: '0.75rem',
        padding: '0.875rem 0.875rem',
        border: `1px solid ${COLORS.BORDER_SECONDARY}`,
        transition: 'all 0.2s',
        maxWidth: isMobile ? '100%' : '350px',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = COLORS.OVERLAY_08;
        e.currentTarget.style.borderColor = COLORS.BORDER_PRIMARY_OPACITY;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = COLORS.OVERLAY_05;
        e.currentTarget.style.borderColor = COLORS.BORDER_SECONDARY;
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '0.25rem',
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              ...subHeadingStyles,
              margin: 0,
              marginBottom: '0.125rem',
            }}
          >
            {title}
          </p>
          <p
            style={{
              ...headingStyles,
              margin: 0,
            }}
          >
            {value}
          </p>
        </div>
        {icon && (
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '100%',
              background: COLORS.PRIMARY_OVERLAY_20,
              border: `1px solid ${COLORS.BORDER_PRIMARY_OPACITY}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

