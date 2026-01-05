'use client';

import { InfoCard } from './InfoCard';
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon';
import { COLORS, headingStyles } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ImportantDatesCardProps {
  applicationDeadline: string;
  expectedJoiningDate: string;
  preferredNoticePeriod: string;
}

export function ImportantDatesCard({
  applicationDeadline,
  expectedJoiningDate,
  preferredNoticePeriod,
}: ImportantDatesCardProps) {
  const { isSmallMobile, isMobile } = useMediaQuery();

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
        <EnvelopeIcon size={isSmallMobile ? 18 : 20} />
        <h3
          style={{
            ...headingStyles,
            margin: 0,
            fontSize: isSmallMobile ? '1.125rem' : '1.25rem',
          }}
        >
          Important Dates
        </h3>
      </div>

      {/* Dates Grid */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {/* First Row: Application Deadline and Expected Joining Date */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1rem',
          }}
        >
          {/* Application Deadline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            <span
              style={{
                color: COLORS.TEXT_SECONDARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: '500',
              }}
            >
              Application Deadline
            </span>
            <span
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: '600',
              }}
            >
              {applicationDeadline}
            </span>
          </div>

          {/* Expected Joining Date */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            <span
              style={{
                color: COLORS.TEXT_SECONDARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: '500',
              }}
            >
              Expected Joining Date
            </span>
            <span
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: '600',
              }}
            >
              {expectedJoiningDate}
            </span>
          </div>
        </div>

        {/* Second Row: Preferred Notice Period */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          <span
            style={{
              color: COLORS.TEXT_SECONDARY,
              fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: '500',
            }}
          >
            Preferred Notice Period
          </span>
          <span
            style={{
              color: COLORS.TEXT_PRIMARY,
              fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: '600',
            }}
          >
            {preferredNoticePeriod}
          </span>
        </div>
      </div>
    </InfoCard>
  );
}

