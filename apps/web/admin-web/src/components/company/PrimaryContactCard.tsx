'use client';

import { InfoCard } from './InfoCard';
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon';
import { COLORS, headingStyles } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface PrimaryContactCardProps {
  name: string;
  designation: string;
  email: string;
  phone: string;
}

export function PrimaryContactCard({
  name,
  designation,
  email,
  phone,
}: PrimaryContactCardProps) {
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
          Primary Contact Person
        </h3>
      </div>

      {/* Two-column grid layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '1rem' : '1.5rem',
        }}
      >
        {/* Left Column: Name, Email */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {/* Name */}
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
              Name
            </span>
            <span
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: '600',
                wordBreak: 'break-word',
              }}
            >
              {name}
            </span>
          </div>

          {/* Email */}
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
              Email
            </span>
            <span
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: '600',
                wordBreak: 'break-word',
              }}
            >
              {email}
            </span>
          </div>
        </div>

        {/* Right Column: Designation, Phone */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {/* Designation */}
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
              Designation
            </span>
            <span
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: '600',
                wordBreak: 'break-word',
              }}
            >
              {designation}
            </span>
          </div>

          {/* Phone */}
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
              Phone
            </span>
            <span
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: '600',
                wordBreak: 'break-word',
              }}
            >
              {phone}
            </span>
          </div>
        </div>
      </div>
    </InfoCard>
  );
}

