'use client';

import React from 'react';
import { BaseDialogue } from './BaseDialogue';
import { CheckIcon } from '@/components/icons';
import { COLORS } from '@/constants/styles';

export interface ConfirmSubmissionDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  entityType?: string; // e.g., "company", "job"
  onConfirm: () => void;
  customMessage?: string;
}

/**
 * Confirmation dialogue for submission actions
 * Pre-configured with orange theme
 */
export function ConfirmSubmissionDialogue({
  isOpen,
  onClose,
  entityName,
  entityType = 'company',
  onConfirm,
  customMessage,
}: ConfirmSubmissionDialogueProps) {
  const getDefaultMessage = () => {
    const entityTypeText = entityType === 'company' ? 'the company' :
                          entityType === 'job' ? 'the job' :
                          entityType === 'application' ? 'the application' : 'this item';
    
    return `Are you sure you want to submit ${entityName}? This will allow ${entityTypeText} to post jobs on the platform.`;
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const message = customMessage || getDefaultMessage();
  const highlightText = ['submit', entityName];

  return (
    <BaseDialogue
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Submission"
      titleColor={COLORS.WARNING}
      message={message}
      highlightedText={highlightText}
      highlightColor={COLORS.WARNING}
      primaryButtonText="Yes, Submit"
      primaryButtonColor={COLORS.WARNING}
      primaryButtonIcon={<CheckIcon width={16} height={16} color={COLORS.TEXT_PRIMARY} />}
      onPrimaryClick={handleConfirm}
      secondaryButtonText="Cancel"
      secondaryButtonColor={COLORS.SEC_BG}
      onSecondaryClick={onClose}
    />
  );
}

