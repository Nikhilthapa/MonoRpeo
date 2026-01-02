'use client';

import React from 'react';
import { BaseDialogue } from './BaseDialogue';
import { CheckIcon } from '@/components/icons';
import { COLORS } from '@/constants/styles';

export interface ConfirmSuspensionDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  entityType?: string; // e.g., "company", "vendor"
  onConfirm: () => void;
  customMessage?: string;
}

/**
 * Confirmation dialogue for suspension actions
 * Pre-configured with orange theme
 */
export function ConfirmSuspensionDialogue({
  isOpen,
  onClose,
  entityName,
  entityType = 'company',
  onConfirm,
  customMessage,
}: ConfirmSuspensionDialogueProps) {
  const getDefaultMessage = () => {
    const entityTypeText = entityType === 'company' ? "the company's account" :
                          entityType === 'vendor' ? "the vendor's account" :
                          entityType === 'user' ? "the user's account" : 'this account';
    
    return `Are you sure you want to suspend ${entityName}? This will temporarily disable ${entityTypeText} and all active jobs.`;
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const message = customMessage || getDefaultMessage();
  const highlightText = ['suspend', entityName];

  return (
    <BaseDialogue
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Suspension"
      titleColor={COLORS.WARNING}
      message={message}
      highlightedText={highlightText}
      highlightColor={COLORS.WARNING}
      primaryButtonText="Yes, Suspend"
      primaryButtonColor={COLORS.WARNING}
      primaryButtonIcon={<CheckIcon width={16} height={16} color={COLORS.TEXT_PRIMARY} />}
      onPrimaryClick={handleConfirm}
      secondaryButtonText="Cancel"
      secondaryButtonColor={COLORS.SEC_BG}
      onSecondaryClick={onClose}
    />
  );
}

