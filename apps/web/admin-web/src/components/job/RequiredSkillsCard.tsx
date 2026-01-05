'use client';

import { InfoCard } from './InfoCard';
import { GlobeIcon } from '@/components/icons/GlobeIcon';
import { COLORS, headingStyles } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface RequiredSkillsCardProps {
  skills: string[];
}

export function RequiredSkillsCard({
  skills,
}: RequiredSkillsCardProps) {
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
        <GlobeIcon size={isSmallMobile ? 18 : 20} />
        <h3
          style={{
            ...headingStyles,
            margin: 0,
            fontSize: isSmallMobile ? '1.125rem' : '1.25rem',
          }}
        >
          Required Skills
        </h3>
      </div>

      {/* Skills Tags */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        {skills.map((skill, index) => (
          <span
            key={index}
            style={{
              padding: isSmallMobile ? '0.375rem 0.875rem' : '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontSize: isSmallMobile ? '0.8125rem' : '0.875rem',
              fontWeight: '500',
              color: COLORS.TEXT_PRIMARY,
              background: COLORS.SEC_BG,
              border: '1px solid white',
              fontFamily: '"Space Grotesk", sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </InfoCard>
  );
}

