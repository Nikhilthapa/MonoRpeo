'use client';

import { SeeAllButton } from '@/components/common/SeeAllButton';
import { COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ActivityItem {
  id: string;
  action: string;
  entity: string;
  admin: string;
  timeAgo: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export function RecentActivity({ activities = [] }: RecentActivityProps) {
  const { isMobile, isSmallMobile } = useMediaQuery();
  
  const defaultActivities: ActivityItem[] = [
    { id: '1', action: 'Company approved', entity: 'CloudScale Systems', admin: 'Admin Rahul', timeAgo: '10 Minutes Ago' },
    { id: '2', action: 'Job rejected', entity: 'Junior Developer', admin: 'Admin Priya', timeAgo: '25 Minutes Ago' },
    { id: '3', action: 'Vendor suspended', entity: 'QuickHire Inc', admin: 'Admin Rahul', timeAgo: '1 Hour Ago' },
    { id: '4', action: 'Candidate shortlisted', entity: 'Amit Kumar for Backend Dev', admin: 'Admin Sarah', timeAgo: '2 Hours Ago' },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  return (
    <div
      style={{
        background: COLORS.SEC_BG,
        borderRadius: '0.75rem',
        padding: isSmallMobile ? '0.75rem' : (isMobile ? '1rem' : '1.5rem'),
        border: 'none',
        marginTop: isSmallMobile ? '1rem' : (isMobile ? '1.5rem' : '2rem'),
        overflow: 'hidden',
      }}
    >
      {/* Title and Subtitle */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2
          style={{
            color: COLORS.TEXT_PRIMARY,
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          Recent Activity
        </h2>
        <p
          style={{
            color: COLORS.TEXT_SECONDARY,
            fontSize: '0.875rem',
            margin: 0,
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          Stay Updated With All Submissions, Status Changes, And Interview Events.
        </p>
      </div>

      {/* Activity Cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {displayActivities.map((activity) => (
          <div
            key={activity.id}
            style={{
              padding: '0.75rem 1rem',
              background: COLORS.BG,
              borderRadius: '0.5rem',
              border: `1px solid ${COLORS.BORDER_TERTIARY}`,
              borderLeft: `7px solid ${COLORS.PRIMARY}`,
            }}
          >
            {/* Main Activity Text */}
            <div
              style={{
                color: COLORS.TEXT_PRIMARY,
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: isSmallMobile ? '14px' : '16px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: 'normal',
                marginBottom: '0.375rem',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {activity.action}: {activity.entity}
            </div>
            
            {/* Metadata */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: COLORS.TEXT_SECONDARY,
                fontSize: isSmallMobile ? '11px' : '12px',
                fontFamily: '"Space Grotesk", sans-serif',
                flexWrap: 'wrap',
              }}
            >
              <span>{activity.admin}</span>
              <span>•</span>
              <span>{activity.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>

      {/* See All Link */}
      <SeeAllButton href="/activity-logs" text="See all recent activity" style={{ marginTop: 0 }} />
    </div>
  );
}
