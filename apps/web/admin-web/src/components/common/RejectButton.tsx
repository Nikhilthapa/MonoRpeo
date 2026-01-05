'use client';

import { ActionButton } from './ActionButton';
import { XIcon } from '@/components/icons';
import { COLORS } from '@/constants/styles';

interface RejectButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reject button component
 * Uses red background with X icon
 */
export function RejectButton({ 
  text = 'Reject', 
  onClick,
  className,
  style 
}: RejectButtonProps) {
  return (
    <ActionButton
      text={text}
      icon={<XIcon width={14} height={14} color={COLORS.ERROR} />}
      onClick={onClick}
      background={COLORS.ERROR_BG_REJECTED}
      hoverBackground={COLORS.ERROR_BG_REJECTED}
      color={COLORS.ERROR}
      className={className}
      style={style}
    />
  );
}

