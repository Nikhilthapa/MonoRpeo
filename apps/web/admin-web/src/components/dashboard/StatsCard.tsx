import React from 'react';
import { subHeadingStyles, headingStyles } from '@/constants/styles';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div
      style={{
        background: 'transparent',
        borderRadius: '0.75rem',
        padding: '0.875rem 0.875rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.2s',
        maxWidth: '350px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
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
              background: 'rgba(139, 92, 246, 0.2)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
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

