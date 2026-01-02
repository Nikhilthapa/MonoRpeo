'use client';

import { ActionButton } from './ActionButton';
import { CheckIcon } from '@/components/icons';
import { COLORS } from '@/constants/styles';

interface ApproveButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Approve button component
 * Uses green background with checkmark icon
 */
export function ApproveButton({ 
  text = 'Approve', 
  onClick,
  className,
  style 
}: ApproveButtonProps) {
  return (
    <ActionButton
      text={text}
      icon={<CheckIcon width={14} height={14} color={COLORS.TEXT_PRIMARY} />}
      onClick={onClick}
      background={COLORS.SUCCESS_BG}
      hoverBackground={COLORS.SUCCESS_BG}
      color={COLORS.TEXT_PRIMARY}
      className={className}
      style={style}
    />
  );
}

