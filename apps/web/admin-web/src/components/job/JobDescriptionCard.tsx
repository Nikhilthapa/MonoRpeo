'use client';

import { InfoCard } from './InfoCard';
import { FileIcon } from '@/components/icons/FileIcon';
import { COLORS, basicInfoDescriptionStyles, headingStyles } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface JobDescriptionCardProps {
  companyDescription: string;
  registrationNumber: string;
  taxId: string;
}

export function JobDescriptionCard({
  companyDescription,
  registrationNumber,
  taxId,
}: JobDescriptionCardProps) {
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
        <FileIcon size={isSmallMobile ? 18 : 20} />
        <h3
          style={{
            ...headingStyles,
            margin: 0,
            fontSize: isSmallMobile ? '1.125rem' : '1.25rem',
          }}
        >
          Job Description
        </h3>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {/* Company Description Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
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
            Company Description
          </span>
          <p
            style={{
              ...basicInfoDescriptionStyles,
              margin: 0,
            }}
          >
            {companyDescription}
          </p>
        </div>

        {/* Registration Number and Tax ID - Side by side */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '1rem' : '2rem',
          }}
        >
          {/* Registration Number */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              flex: 1,
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
              Registration Number
            </span>
            <span
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: '600',
              }}
            >
              {registrationNumber}
            </span>
          </div>

          {/* Tax ID */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              flex: 1,
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
              Tax ID
            </span>
            <span
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: '600',
              }}
            >
              {taxId}
            </span>
          </div>
        </div>
      </div>
    </InfoCard>
  );
}

