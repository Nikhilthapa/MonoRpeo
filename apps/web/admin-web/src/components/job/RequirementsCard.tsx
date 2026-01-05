'use client';

import { InfoCard } from './InfoCard';
import { InfoIcon } from '@/components/icons/InfoIcon';
import { COLORS, headingStyles } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface RequirementsCardProps {
  requirements: string[];
}

export function RequirementsCard({
  requirements,
}: RequirementsCardProps) {
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
        <InfoIcon size={isSmallMobile ? 18 : 20} />
        <h3
          style={{
            ...headingStyles,
            margin: 0,
            fontSize: isSmallMobile ? '1.125rem' : '1.25rem',
          }}
        >
          Requirements
        </h3>
      </div>

      {/* Requirements List */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {requirements.map((requirement, index) => (
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
            <span style={{ flex: 1 }}>{requirement}</span>
          </li>
        ))}
      </ul>
    </InfoCard>
  );
}

