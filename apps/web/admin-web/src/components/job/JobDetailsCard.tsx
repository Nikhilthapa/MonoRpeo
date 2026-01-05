'use client';

import { InfoCard } from './InfoCard';
import { StatusBadge } from '@/components/company/StatusBadge';
import { BuildingIcon } from '@/components/icons/BuildingIcon';
import { DollarIcon } from '@/components/icons/DollarIcon';
import { VendorManagementIcon } from '@/components/icons/VendorManagementIcon';
import { COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Briefcase2Icon } from '../icons/Briefcase2Icon';

interface JobDetailsCardProps {
  jobTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  company: string;
  location: string;
  employmentType: string[];
  experience: string;
  salaryRange: string;
  openings: number;
  submittedDate: string;
  submittedBy: string;
  submittedByRole?: string;
}

export function JobDetailsCard({
  jobTitle,
  status,
  company,
  location,
  employmentType,
  experience,
  salaryRange,
  openings,
  submittedDate,
  submittedBy,
  submittedByRole,
}: JobDetailsCardProps) {
  const { isMobile, isSmallMobile } = useMediaQuery();

  return (
    <InfoCard>
      {/* Parent div covering full section */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          gap: isMobile ? '1.5rem' : '2rem',
          width: '100%',
        }}
      >
        {/* Left Section - Job Details */}
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
          {/* Job Icon */}
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
            <Briefcase2Icon
              size={isSmallMobile ? 40 : 50}
              className=""
              style={{ 
                filter: 'brightness(0) invert(1)',
                display: 'block',
              }}
            />
          </div>

          {/* Job Info */}
          <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
            {/* Job Title and Status - Different layout for mobile */}
            {isMobile ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      flex: 1,
                      minWidth: 0,
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
                      }}
                    >
                      {jobTitle}
                    </h4>
                    {/* Employment Type Tags - Left side below title */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      {employmentType.map((type, index) => (
                        <span
                          key={index}
                          style={{
                            padding: isSmallMobile ? '0.25rem 0.75rem' : '0.375rem 1rem',
                            borderRadius: '12px',
                            fontSize: isSmallMobile ? '0.6875rem' : '0.8125rem',
                            fontWeight: '500',
                            color: COLORS.TEXT_PRIMARY,
                            background: COLORS.PRIMARY,
                            border: 'none',
                            outline: 'none',
                            fontFamily: '"Space Grotesk", sans-serif',
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <StatusBadge status={status} />
                </div>
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
                  {jobTitle}
                </h4>
                <StatusBadge status={status} />
              </div>
            )}

            {/* Job Details - Split into two rows */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* First Row: Company, Location, Employment Type */}
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
                {/* Company */}
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
                  <BuildingIcon
                    size={isSmallMobile ? 16 : 18}
                    style={{ flexShrink: 0 }}
                  />
                  <span>{company}</span>
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

                {/* Employment Type Tags - Only show on desktop */}
                {!isMobile && employmentType.map((type, index) => (
                  <span
                    key={index}
                    style={{
                      padding: isSmallMobile ? '0.25rem 0.75rem' : '0.375rem 1rem',
                      borderRadius: '12px',
                      fontSize: isSmallMobile ? '0.6875rem' : '0.8125rem',
                      fontWeight: '500',
                      color: COLORS.TEXT_PRIMARY,
                      background: COLORS.PRIMARY,
                      border: 'none',
                      outline: 'none',
                      fontFamily: '"Space Grotesk", sans-serif',
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>

              {/* Second Row: Experience, Salary Range, Openings */}
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
                {/* Experience */}
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
                  <BuildingIcon
                    size={isSmallMobile ? 16 : 18}
                    style={{ flexShrink: 0 }}
                  />
                  <span>Experience: {experience}</span>
                </div>

                {/* Salary Range */}
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
                  <DollarIcon
                    size={isSmallMobile ? 16 : 18}
                    style={{ flexShrink: 0 }}
                  />
                  <span>Salary Range: {salaryRange}</span>
                </div>

                {/* Openings */}
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
                  <VendorManagementIcon
                    size={isSmallMobile ? 16 : 18}
                    style={{ flexShrink: 0 }}
                  />
                  <span>{openings} {openings === 1 ? 'opening' : 'openings'}</span>
                </div>
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
            {submittedByRole && ` [${submittedByRole}]`}
          </div>
        </div>
      </div>
    </InfoCard>
  );
}

