'use client';

import React from 'react';
import { BaseDialogue } from './BaseDialogue';
import { XIcon } from '@/components/icons';
import { COLORS } from '@/constants/styles';

export interface ConfirmRejectionDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  entityType?: string; // e.g., "candidate", "company", "job"
  onConfirm: () => void;
  customMessage?: string;
}

/**
 * Confirmation dialogue for rejection actions
 * Pre-configured with red theme
 */
export function ConfirmRejectionDialogue({
  isOpen,
  onClose,
  entityName,
  entityType = 'candidate',
  onConfirm,
  customMessage,
}: ConfirmRejectionDialogueProps) {
  const getDefaultMessage = () => {
    const entityTypeText = entityType === 'candidate' ? 'the candidate' : 
                          entityType === 'company' ? 'the company' :
                          entityType === 'job' ? 'the job' :
                          entityType === 'vendor' ? 'the vendor' : 'this item';
    
    return `Are you sure you want to reject ${entityName}? This action will remove ${entityTypeText} from the hiring pipeline.`;
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const message = customMessage || getDefaultMessage();
  const highlightText = ['reject', entityName];

  return (
    <BaseDialogue
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Rejection"
      titleColor={COLORS.ERROR}
      message={message}
      highlightedText={highlightText}
      highlightColor={COLORS.ERROR}
      primaryButtonText="Yes, Reject"
      primaryButtonColor={COLORS.ERROR}
      primaryButtonIcon={<XIcon width={16} height={16} color={COLORS.TEXT_PRIMARY} />}
      onPrimaryClick={handleConfirm}
      secondaryButtonText="Cancel"
      secondaryButtonColor={COLORS.SEC_BG}
      onSecondaryClick={onClose}
    />
  );
}

