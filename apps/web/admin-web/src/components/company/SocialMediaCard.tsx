'use client';

import { InfoCard } from './InfoCard';
import { GlobeIcon } from '@/components/icons/GlobeIcon';
import { COLORS, headingStyles } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface SocialMediaCardProps {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

export function SocialMediaCard({
  linkedin,
  twitter,
  facebook,
}: SocialMediaCardProps) {
  const { isSmallMobile } = useMediaQuery();

  const socialItems = [
    { label: 'LinkedIn', value: linkedin },
    { label: 'Twitter', value: twitter },
    { label: 'Facebook', value: facebook },
  ].filter((item) => item.value); // Only show items with values

  if (socialItems.length === 0) {
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
            Social Media
          </h3>
        </div>
        <div
          style={{
            color: COLORS.TEXT_SECONDARY,
            fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          No social media links provided
        </div>
      </InfoCard>
    );
  }

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
          Social Media
        </h3>
      </div>

      {/* Vertical layout for social media entries */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {socialItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            {/* Platform name */}
            <span
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: '500',
              }}
            >
              {item.label}
            </span>
            {/* Link/handle */}
            <span
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.8125rem' : '0.875rem',
                fontFamily: '"Space Grotesk", sans-serif',
                wordBreak: 'break-word',
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </InfoCard>
  );
}

