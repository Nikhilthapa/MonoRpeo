'use client';

import { ActionButton } from './ActionButton';
import { EyeIcon } from '@/components/icons';
import { COLORS } from '@/constants/styles';

interface ViewButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * View button component
 * Uses dark background with eye icon
 */
export function ViewButton({ 
  text = 'View', 
  onClick,
  className,
  style 
}: ViewButtonProps) {
  return (
    <ActionButton
      text={text}
      icon={<EyeIcon width={14} height={14} color={COLORS.TEXT_PRIMARY} />}
      onClick={onClick}
      background={COLORS.SEC_BG}
      hoverBackground={COLORS.SEC_BG}
      border={`1px solid ${COLORS.BORDER_SECONDARY}`}
      color={COLORS.TEXT_PRIMARY}
      className={className}
      style={style}
    />
  );
}

