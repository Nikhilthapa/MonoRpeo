'use client';

import { headingStyles } from '@/constants/styles';

export const dynamic = 'force-dynamic';

export default function InterviewAllCandidatesPage() {
  return (
    <div>
      <h1
        style={{
          ...headingStyles,
          margin: '0 0 2rem 0',
        }}
      >
        All Candidates (Interviews)
      </h1>
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '0.75rem',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <p style={{ color: '#9ca3af' }}>All candidates for interviews will be implemented here.</p>
      </div>
    </div>
  );
}

