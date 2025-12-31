'use client';

import { headingStyles } from '@/constants/styles';

export const dynamic = 'force-dynamic';

export default function ReportsAnalyticsPage() {
  return (
    <div>
      <h1
        style={{
          ...headingStyles,
          margin: '0 0 2rem 0',
        }}
      >
        Reports & Analytics
      </h1>
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '0.75rem',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <p style={{ color: '#9ca3af' }}>Reports and analytics dashboard will be implemented here.</p>
      </div>
    </div>
  );
}

