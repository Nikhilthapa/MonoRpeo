'use client';

import React from 'react';
import { BaseDialogue } from './BaseDialogue';
import { CheckIcon } from '@/components/icons';
import { COLORS } from '@/constants/styles';

export interface ConfirmApprovalDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  entityType?: string; // e.g., "candidate", "company", "job"
  onConfirm: () => void;
  actionType?: 'approve' | 'shortlist';
  customMessage?: string;
}

/**
 * Confirmation dialogue for approval/shortlist actions
 * Pre-configured with green/purple theme
 */
export function ConfirmApprovalDialogue({
  isOpen,
  onClose,
  entityName,
  entityType = 'candidate',
  onConfirm,
  actionType = 'approve',
  customMessage,
}: ConfirmApprovalDialogueProps) {
  const getDefaultMessage = () => {
    const entityTypeText = entityType === 'candidate' ? 'the candidate' : 
                          entityType === 'company' ? 'the company' :
                          entityType === 'job' ? 'the job' :
                          entityType === 'vendor' ? 'the vendor' : 'this item';
    
    if (actionType === 'shortlist') {
      return `Are you sure you want to shortlist ${entityName}? This will move ${entityTypeText} to the next stage of the hiring process.`;
    }
    
    return `Are you sure you want to approve ${entityName}? This will allow ${entityTypeText} to post jobs on the platform.`;
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const message = customMessage || getDefaultMessage();
  const highlightText = actionType === 'shortlist' ? ['shortlist', entityName] : ['approve', entityName];
  const titleColor = actionType === 'shortlist' ? COLORS.PRIMARY : COLORS.SUCCESS;
  const buttonColor = actionType === 'shortlist' ? COLORS.PRIMARY : COLORS.SUCCESS;
  const buttonText = actionType === 'shortlist' ? 'Yes, Shortlisted' : 'Yes, Approve';

  return (
    <BaseDialogue
      isOpen={isOpen}
      onClose={onClose}
      title={actionType === 'shortlist' ? 'Confirm Shortlist' : 'Confirm Approval'}
      titleColor={titleColor}
      message={message}
      highlightedText={highlightText}
      highlightColor={buttonColor}
      primaryButtonText={buttonText}
      primaryButtonColor={buttonColor}
      primaryButtonIcon={<CheckIcon width={16} height={16} color={COLORS.TEXT_PRIMARY} />}
      onPrimaryClick={handleConfirm}
      secondaryButtonText="Cancel"
      secondaryButtonColor={COLORS.SEC_BG}
      onSecondaryClick={onClose}
    />
  );
}

