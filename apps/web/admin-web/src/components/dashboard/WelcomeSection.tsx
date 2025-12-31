import { DashboardAlignedItem } from '@/components/layout/DashboardAlignedItem';
import { headingStyles, subHeadingStyles } from '@/constants/styles';
import { DropdownArrowIcon } from '@/components/icons';

interface WelcomeSectionProps {
  userName?: string;
}

export function WelcomeSection({ userName = 'Akash Gupta' }: WelcomeSectionProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
        }}
      >
        <DashboardAlignedItem>
          <h1
            style={{
              ...headingStyles,
              margin: 0,
            }}
          >
            Admin Dashboard
          </h1>
        </DashboardAlignedItem>

        {/* This Month Filter - Aligned with Admin Dashboard text */}
        <DashboardAlignedItem>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              height: '50px',
              padding: '10px 20px',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '0.5rem',
              background: 'transparent',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
          >
            <select
              style={{
                padding: 0,
                borderRadius: '0.5rem',
                background: 'transparent',
                border: 'none',
                color: '#a78bfa',
                fontSize: '0.875rem',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                lineHeight: '1.2',
                fontWeight: '400',
              }}
            >
              <option value="this-month" style={{ background: '#1a0538', color: '#a78bfa' }}>
                This Month
              </option>
              <option value="this-week" style={{ background: '#1a0538', color: '#a78bfa' }}>
                This Week
              </option>
              <option value="today" style={{ background: '#1a0538', color: '#a78bfa' }}>
                Today
              </option>
            </select>
            {/* Custom dropdown arrow */}
            <span
              style={{
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <DropdownArrowIcon />
            </span>
          </div>
        </DashboardAlignedItem>
      </div>
      <p
        style={{
          ...subHeadingStyles,
          margin: 0,
        }}
      >
        Welcome Back, {userName}. Here&apos;s What Needs Your Attention Today.
      </p>
    </div>
  );
}

