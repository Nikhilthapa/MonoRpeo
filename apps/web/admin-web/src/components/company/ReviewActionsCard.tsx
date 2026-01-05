'use client';

import { InfoCard } from './InfoCard';
import { ApproveButton } from '@/components/common/ApproveButton';
import { RejectButton } from '@/components/common/RejectButton';
import { headingStyles } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ReviewActionsCardProps {
  onApprove?: () => void;
  onReject?: () => void;
}

export function ReviewActionsCard({
  onApprove,
  onReject,
}: ReviewActionsCardProps) {
  const { isMobile, isSmallMobile } = useMediaQuery();

  return (
    <InfoCard>
      {/* Left-aligned title */}
      <div
        style={{
          marginBottom: '1rem',
        }}
      >
        <h3
          style={{
            ...headingStyles,
            margin: 0,
            fontSize: isSmallMobile ? '1.125rem' : '1.25rem',
            textAlign: 'left',
          }}
        >
          Review Actions
        </h3>
      </div>

      {/* Full-width buttons container */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '0.75rem',
          width: '100%',
        }}
      >
        <ApproveButton
          onClick={onApprove}
          style={{
            flex: '1',
            width: '100%',
            minHeight: '40px',
            height: '40px',
          }}
        />
        <RejectButton
          onClick={onReject}
          style={{
            flex: '1',
            width: '100%',
            minHeight: '40px',
            height: '40px',
          }}
        />
      </div>
    </InfoCard>
  );
}

