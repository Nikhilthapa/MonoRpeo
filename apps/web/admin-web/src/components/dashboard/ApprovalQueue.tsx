'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClockIcon, PersonIcon } from '@/components/icons';
import { SeeAllButton } from '@/components/common/SeeAllButton';
import { ApproveButton } from '@/components/common/ApproveButton';
import { RejectButton } from '@/components/common/RejectButton';
import { ViewButton } from '@/components/common/ViewButton';
import {
  ConfirmRejectionDialogue,
  ConfirmApprovalDialogue,
} from '@/components/common/dialogue';
import { COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ApprovalItem {
  id: string;
  name: string;
  timeAgo: string;
  submittedBy: string;
}

interface ApprovalQueueProps {
  companies?: ApprovalItem[];
  jobs?: ApprovalItem[];
  vendors?: ApprovalItem[];
  candidates?: ApprovalItem[];
}

export function ApprovalQueue({ 
  companies = [], 
  jobs = [], 
  vendors = [],
  candidates = []
}: ApprovalQueueProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'companies' | 'jobs' | 'vendors' | 'candidates'>('companies');
  const { isMobile, isSmallMobile } = useMediaQuery();
  
  // Dialogue state management
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [dialogueType, setDialogueType] = useState<'approve' | 'reject' | null>(null);

  const tabs = [
    { id: 'companies' as const, label: 'Companies', count: companies.length },
    { id: 'jobs' as const, label: 'Jobs', count: jobs.length },
    { id: 'vendors' as const, label: 'Vendors', count: vendors.length },
    { id: 'candidates' as const, label: 'Candidate', count: candidates.length },
  ];

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'companies':
        return companies;
      case 'jobs':
        return jobs;
      case 'vendors':
        return vendors;
      case 'candidates':
        return candidates;
    }
  };

  const currentItems = getCurrentItems();

  // Get entity type based on active tab
  const getEntityType = (): string => {
    switch (activeTab) {
      case 'companies':
        return 'company';
      case 'jobs':
        return 'job';
      case 'vendors':
        return 'vendor';
      case 'candidates':
        return 'candidate';
      default:
        return 'item';
    }
  };

  // Handlers for button clicks
  const handleApproveClick = (item: ApprovalItem) => {
    setSelectedItem(item);
    setDialogueType('approve');
  };

  const handleRejectClick = (item: ApprovalItem) => {
    setSelectedItem(item);
    setDialogueType('reject');
  };

  const handleViewClick = (item: ApprovalItem) => {
    // Navigate to respective view pages based on active tab
    if (activeTab === 'companies') {
      router.push(`/company-management/view/${item.id}`);
    } else if (activeTab === 'jobs') {
      router.push(`/job-management/view/${item.id}`);
    } else {
      // For other tabs, you might want to navigate to their respective detail pages
      // For now, we'll just log it - you can customize this behavior
      console.log('View item:', item);
    }
  };

  // Dialogue confirmation handlers
  const handleApproveConfirm = () => {
    if (selectedItem) {
      // Handle approval logic here
      console.log('Approved:', selectedItem);
      // You can add API call here
    }
    setSelectedItem(null);
    setDialogueType(null);
  };

  const handleRejectConfirm = () => {
    if (selectedItem) {
      // Handle rejection logic here
      console.log('Rejected:', selectedItem);
      // You can add API call here
    }
    setSelectedItem(null);
    setDialogueType(null);
  };

  const handleDialogueClose = () => {
    setSelectedItem(null);
    setDialogueType(null);
  };

  return (
    <div
      style={{
        background: COLORS.SEC_BG,
        borderRadius: '0.75rem',
        padding: isSmallMobile ? '0.75rem' : (isMobile ? '1rem' : '1.5rem'),
        border: 'none',
        overflow: 'hidden',
      }}
    >
      <h2
        style={{
          color: COLORS.TEXT_PRIMARY,
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '0.75rem',
          fontFamily: '"Space Grotesk", sans-serif',
        }}
      >
        Approval Queue
      </h2>

      {/* Tabs */}
      <div
        style={{
          background: COLORS.BG,
          display: 'inline-block',
          borderRadius: '9999px',
          padding: '0.5rem',
          marginBottom: '1.5rem',
          width: isMobile ? '100%' : 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '0.5rem',
            overflowX: isMobile ? 'auto' : 'visible',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="sidebar-no-scrollbar"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: isSmallMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
                background: activeTab === tab.id ? COLORS.PRIMARY : 'transparent',
                border: 'none',
                borderRadius: '9999px',
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.75rem' : '0.875rem',
                fontWeight: activeTab === tab.id ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: '"Space Grotesk", sans-serif',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {tab.label}({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between',
                padding: isSmallMobile ? '0.75rem' : '1rem',
                background: COLORS.BG,
                borderRadius: '0.5rem',
                border: `1px solid ${COLORS.BORDER_TERTIARY}`,
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '1rem' : '0',
                overflow: 'hidden',
              }}
            >
              <div style={{ flex: 1, width: '100%', minWidth: 0 }}>
                <div
                  style={{
                    color: COLORS.TEXT_PRIMARY,
                    fontSize: isSmallMobile ? '0.8125rem' : '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    color: COLORS.TEXT_SECONDARY,
                    fontSize: isSmallMobile ? '0.75rem' : '0.875rem',
                    fontFamily: '"Space Grotesk", sans-serif',
                    flexWrap: 'wrap',
                  }}
                >
                  <ClockIcon width={isSmallMobile ? 16 : 20} height={isSmallMobile ? 16 : 20} color={COLORS.TEXT_SECONDARY} />
                  <span >{item.timeAgo}</span>
                  <PersonIcon width={isSmallMobile ? 16 : 20} height={isSmallMobile ? 16 : 20} color={COLORS.TEXT_SECONDARY} />
                  <span>By {item.submittedBy}</span>
                </div>
              </div>
              <div
                style={{  
                  display: 'flex',
                  gap: isSmallMobile ? '0.375rem' : '0.5rem',
                  flexWrap: isMobile ? 'wrap' : 'nowrap',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                <ApproveButton onClick={() => handleApproveClick(item)} />
                <RejectButton onClick={() => handleRejectClick(item)} />
                <ViewButton onClick={() => handleViewClick(item)} />
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              color: COLORS.TEXT_SECONDARY,
              fontSize: '0.875rem',
              textAlign: 'center',
              padding: '2rem',
            }}
          >
            No pending {activeTab} approvals
          </div>
        )}
      </div>

      {/* See All Link */}
      <SeeAllButton
        href={
          activeTab === 'companies'
            ? '/company-management/pending-approvals'
            : activeTab === 'jobs'
              ? '/job-management/pending-jobs'
              : activeTab === 'vendors'
                ? '/vendor-management/pending-approvals'
                : '/candidate-management/pending-candidates'
        }
        text={`See all ${activeTab}`}
      />

      {/* Dialogue Boxes */}
      {selectedItem && (
        <>
          {/* Approval Dialogue */}
          <ConfirmApprovalDialogue
            isOpen={dialogueType === 'approve'}
            onClose={handleDialogueClose}
            entityName={selectedItem.name}
            entityType={getEntityType()}
            onConfirm={handleApproveConfirm}
          />

          {/* Rejection Dialogue */}
          <ConfirmRejectionDialogue
            isOpen={dialogueType === 'reject'}
            onClose={handleDialogueClose}
            entityName={selectedItem.name}
            entityType={getEntityType()}
            onConfirm={handleRejectConfirm}
          />
        </>
      )}
    </div>
  );
}

