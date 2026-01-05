'use client';

import { InfoCard } from './InfoCard';
import { CorrectIcon } from '@/components/icons/CorrectIcon';
import { COLORS, headingStyles } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface KeyResponsibilitiesCardProps {
  responsibilities: string[];
}

export function KeyResponsibilitiesCard({
  responsibilities,
}: KeyResponsibilitiesCardProps) {
  const { isSmallMobile } = useMediaQuery();

  return (
    <InfoCard>
      {/* Custom title with icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <CorrectIcon size={isSmallMobile ? 18 : 20} />
        <h3
          style={{
            ...headingStyles,
            margin: 0,
            fontSize: isSmallMobile ? '1.125rem' : '1.25rem',
          }}
        >
          Key Responsibilities
        </h3>
      </div>

      {/* Responsibilities List */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {responsibilities.map((responsibility, index) => (
          <li
            key={index}
            style={{
              color: COLORS.TEXT_PRIMARY,
              fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: '400',
              lineHeight: '1.5',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ color: COLORS.TEXT_PRIMARY, marginRight: '0.5rem', flexShrink: 0 }}>•</span>
            <span style={{ flex: 1 }}>{responsibility}</span>
          </li>
        ))}
      </ul>
    </InfoCard>
  );
}

