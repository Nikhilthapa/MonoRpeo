import Link from 'next/link';

interface ActivityItem {
  id: string;
  message: string;
  timeAgo: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export function RecentActivity({ activities = [] }: RecentActivityProps) {
  const defaultActivities: ActivityItem[] = [
    { id: '1', message: 'Company approved CloudScale Systems', timeAgo: '20 Minutes ago' },
    { id: '2', message: 'Job rejected: Junior Developer', timeAgo: '20 Minutes ago' },
    { id: '3', message: 'Vendor suspended QuickHire Inc', timeAgo: '1 Hour ago' },
    {
      id: '4',
      message: 'Candidate shortlisted Ankit Kumar for Backend Dev',
      timeAgo: '2 Hours ago',
    },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <h2
        style={{
          color: '#ffffff',
          fontSize: '1.25rem',
          fontWeight: '600',
          margin: '0 0 0.5rem 0',
        }}
      >
        Recent Activity
      </h2>
      <p
        style={{
          color: '#9ca3af',
          fontSize: '0.875rem',
          margin: '0 0 1.5rem 0',
        }}
      >
        Stay Updated With All Submissions, Status Changes, And Interview Events.
      </p>

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
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div
              style={{
                color: '#ffffff',
                fontSize: '0.875rem',
                marginBottom: '0.25rem',
              }}
            >
              {activity.message}
            </div>
            <div
              style={{
                color: '#9ca3af',
                fontSize: '0.75rem',
              }}
            >
              {activity.timeAgo}
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/activity-logs"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          background: 'rgba(139, 92, 246, 0.2)',
          border: '1px solid rgba(139, 92, 246, 0.5)',
          color: '#a78bfa',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: '500',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
        }}
      >
        See all recent activity
      </Link>
    </div>
  );
}

