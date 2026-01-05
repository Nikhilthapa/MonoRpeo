'use client';

import { COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type StatusType = 'pending' | 'approved' | 'rejected' | 'suspended';

interface StatusBadgeProps {
  status: StatusType;
  style?: React.CSSProperties;
}

/**
 * Status badge component for displaying company status
 */
export function StatusBadge({ status, style }: StatusBadgeProps) {
  const { isSmallMobile } = useMediaQuery();

  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'pending':
        return {
          color: COLORS.WARNING,
          background: COLORS.WARNING_BG,
          text: 'Pending',
        };
      case 'approved':
        return {
          color: COLORS.SUCCESS,
          background: COLORS.SUCCESS_BG,
          text: 'Approved',
        };
      case 'rejected':
        return {
          color: COLORS.ERROR,
          background: COLORS.ERROR_BG,
          text: 'Rejected',
        };
      case 'suspended':
        return {
          color: COLORS.ERROR,
          background: COLORS.ERROR_BG,
          text: 'Suspended',
        };
      default:
        return {
          color: COLORS.TEXT_SECONDARY,
          background: COLORS.OVERLAY_05,
          text: status,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      style={{
        display: 'inline-block',
        padding: isSmallMobile ? '0.25rem 0.75rem' : '0.375rem 1rem',
        borderRadius: '9999px',
        fontSize: isSmallMobile ? '0.6875rem' : '0.8125rem',
        fontWeight: '500',
        color: config.color,
        background: config.background,
        border: 'none',
        outline: 'none',
        fontFamily: '"Space Grotesk", sans-serif',
        ...style,
      }}
    >
      {config.text}
    </span>
  );
}

