'use client';

import { InfoCard } from './InfoCard';
import { StatusBadge } from './StatusBadge';
import { BuildingIcon } from '@/components/icons/BuildingIcon';
import { Briefcase2Icon } from '@/components/icons/Briefcase2Icon';
import { UsersIcon } from '@/components/icons/UsersIcon';
import { COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface CompanyDetailsCardProps {
  companyName: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  industry: string;
  location: string;
  employeeCount: string;
  submittedDate: string;
  submittedBy: string;
  submittedByRole?: string;
}

export function CompanyDetailsCard({
  companyName,
  status,
  industry,
  location,
  employeeCount,
  submittedDate,
  submittedBy,
  submittedByRole,
}: CompanyDetailsCardProps) {
  const { isMobile, isSmallMobile } = useMediaQuery();

  return (
    <InfoCard>
      {/* Parent div covering full section */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '1.5rem' : '2rem',
          width: '100%',
        }}
      >
        {/* Left Section - Company Details */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '1rem',
            flex: 1,
            minWidth: 0,
            width: '100%',
          }}
        >
          {/* Company Icon */}
          <div
            style={{
              width: isSmallMobile ? '64px' : '80px',
              height: isSmallMobile ? '64px' : '80px',
              borderRadius: '6.917px',
              background: 'var(--linear-second, linear-gradient(270deg, #AF89FF 0%, #8E6ED0 50%, #6F4FB3 75%, #4D2B96 87.5%, #432681 93.75%, #210757 100%))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              padding: '0.5rem',
            }}
          >
            <BuildingIcon
              size={isSmallMobile ? 40 : 50}
              className=""
              style={{ 
                filter: 'brightness(0) invert(1)',
                display: 'block',
              }}
            />
          </div>

          {/* Company Info */}
          <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
            {/* Company Name and Status - Different layout for mobile */}
            {isMobile ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                  gap: '0.75rem',
                }}
              >
                <h4
                  style={{
                    color: COLORS.TEXT_PRIMARY,
                    fontSize: isSmallMobile ? '1.25rem' : '1.5rem',
                    fontWeight: '700',
                    fontFamily: '"Space Grotesk", sans-serif',
                    margin: 0,
                    wordBreak: 'break-word',
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {companyName}
                </h4>
                <StatusBadge status={status} />
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  marginBottom: '1rem',
                }}
              >
                <h4
                  style={{
                    color: COLORS.TEXT_PRIMARY,
                    fontSize: isSmallMobile ? '1.25rem' : (isMobile ? '1.5rem' : '1.75rem'),
                    fontWeight: '700',
                    fontFamily: '"Space Grotesk", sans-serif',
                    margin: 0,
                    wordBreak: 'break-word',
                  }}
                >
                  {companyName}
                </h4>
                <StatusBadge status={status} />
              </div>
            )}

            {/* Company Details - All in same row */}
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '0.75rem' : '1.5rem',
                flexWrap: 'wrap',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: isMobile ? 'flex-start' : 'flex-start',
              }}
            >
              {/* Industry */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: COLORS.TEXT_SECONDARY,
                  fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                <div
                  style={{
                    width: isSmallMobile ? '20px' : '24px',
                    height: isSmallMobile ? '20px' : '24px',
                    borderRadius: '6.917px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    padding: '0.125rem',
                  }}
                >
                  <Briefcase2Icon
                    size={isSmallMobile ? 12 : 14}
                    className=""
                    style={{ 
                      filter: 'brightness(0) invert(1)',
                      display: 'block',
                    }}
                  />
                </div>
                <span>{industry}</span>
              </div>

              {/* Location */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: COLORS.TEXT_SECONDARY,
                  fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                <svg
                  width={isSmallMobile ? 16 : 18}
                  height={isSmallMobile ? 16 : 18}
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    fill={COLORS.TEXT_SECONDARY}
                  />
                </svg>
                <span>{location}</span>
              </div>

              {/* Employee Count */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: COLORS.TEXT_SECONDARY,
                  fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                <UsersIcon
                  size={isSmallMobile ? 16 : 18}
                  style={{ flexShrink: 0 }}
                />
                <span>{employeeCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Submission Details */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            gap: '0.5rem',
            textAlign: isMobile ? 'left' : 'right',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              color: COLORS.TEXT_SECONDARY,
              fontSize: isSmallMobile ? '0.8125rem' : '0.875rem',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: '500',
            }}
          >
            Submitted
          </div>
          <div
            style={{
              color: COLORS.TEXT_PRIMARY,
              fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
              fontFamily: '"Space Grotesk", sans-serif',
            }}
          >
            {submittedDate}
          </div>
          <div
            style={{
              color: COLORS.TEXT_SECONDARY,
              fontSize: isSmallMobile ? '0.8125rem' : '0.875rem',
              fontFamily: '"Space Grotesk", sans-serif',
            }}
          >
            By: {submittedBy}
            {submittedByRole && ` (${submittedByRole})`}
          </div>
        </div>
      </div>
    </InfoCard>
  );
}
