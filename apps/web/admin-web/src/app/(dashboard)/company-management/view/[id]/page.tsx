'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  CompanyDetailsCard,
  BasicInformationCard,
  ContactInformationCard,
  PrimaryContactCard,
  SubmittedDocumentsCard,
  SocialMediaCard,
  ReviewActionsCard,
} from '@/components/company';
import { ApproveButton } from '@/components/common/ApproveButton';
import { RejectButton } from '@/components/common/RejectButton';
import {
  ConfirmApprovalDialogue,
  ConfirmRejectionDialogue,
} from '@/components/common/dialogue';
import { headingStyles, subHeadingStyles } from '@/constants/styles';
import { ROUTES } from '@/constants/routes';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Mock data - replace with API call
const getMockCompanyData = (id: string) => {
  return {
    id,
    companyName: 'TechCorp Solutions',
    status: 'pending' as const,
    industry: 'Software Development',
    location: 'San Francisco, CA',
    employeeCount: '100-200 employees',
    description:
      'TechCorp Solutions is a leading software development company specializing in enterprise-grade applications, cloud solutions, and AI-powered tools. We help businesses transform digitally with cutting-edge technology.',
    registrationNumber: 'REG-2078-SF-12321',
    taxId: 'TAX-ID-1234567',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
    website: 'www.techcorp.com',
    primaryContact: {
      name: 'John Smith',
      designation: 'CEO & Founder',
      email: 'john.smith@techcorp',
      phone: '+1 (555) 123-4567',
    },
    documents: [
      { name: 'Registration Certificate' },
      { name: 'Tax Document' },
      { name: 'Incorporation Proof' },
    ],
    socialMedia: {
      linkedin: 'linkedin.com/company/techcorp',
      twitter: '@techcorp',
      facebook: 'facebook.com/techcorp',
    },
    submittedDate: '2024-12-09 10:30 AM',
    submittedBy: 'John Smith',
    submittedByRole: 'CEO',
  };
};

export default function CompanyViewPage() {
  const params = useParams();
  const companyId = params.id as string;
  const { isMobile, isTablet, isSmallMobile } = useMediaQuery();

  // Mock data - replace with API call using companyId
  const companyData = getMockCompanyData(companyId);

  // Dialogue state management
  const [dialogueType, setDialogueType] = useState<'approve' | 'reject' | null>(null);

  const handleApproveClick = () => {
    setDialogueType('approve');
  };

  const handleRejectClick = () => {
    setDialogueType('reject');
  };

  const handleApproveConfirm = () => {
    // Handle approval logic here
    console.log('Approved company:', companyId);
    // You can add API call here
    setDialogueType(null);
  };

  const handleRejectConfirm = () => {
    // Handle rejection logic here
    console.log('Rejected company:', companyId);
    // You can add API call here
    setDialogueType(null);
  };

  const handleDialogueClose = () => {
    setDialogueType(null);
  };

  const handleViewDocument = (documentName: string) => {
    // Handle document view logic here
    console.log('View document:', documentName);
    // You can add document viewer or download logic here
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          href={ROUTES.COMPANY_MANAGEMENT.ALL_COMPANIES}
          style={{
            ...subHeadingStyles,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '15px',
            cursor: 'pointer',
          }}
        >
          <Image
            src="/icons/common/left-arrow.svg"
            alt="Back"
            width={11}
            height={11}
            style={{ flexShrink: 0 }}
          />
          Back To Companies
        </Link>
      </div>

      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              ...headingStyles,
              margin: '0 0 0.5rem 0',
              fontSize: isSmallMobile ? '1.125rem' : '1.25rem',
            }}
          >
            Company Registration Review
          </h3>
          <p
            style={{
              ...subHeadingStyles,
              margin: '0.5rem 0 0 0',
            }}
          >
            Review And Approve/Reject Company Registration
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexDirection: isMobile ? 'column' : 'row',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <span>
            <ApproveButton
              onClick={handleApproveClick}
              style={{
                width: isMobile ? '100%' : '150px',
                height: '40px',
                minHeight: '40px',
              }}
            />
          </span>
          <span>
            <RejectButton
              onClick={handleRejectClick}
              style={{
                width: isMobile ? '100%' : '150px',
                height: '40px',
                minHeight: '40px',
              }}
            />
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <CompanyDetailsCard
            companyName={companyData.companyName}
            status={companyData.status}
            industry={companyData.industry}
            location={companyData.location}
            employeeCount={companyData.employeeCount}
            submittedDate={companyData.submittedDate}
            submittedBy={companyData.submittedBy}
            submittedByRole={companyData.submittedByRole}
          />
        </div>

      {/* Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            isMobile || isTablet ? '1fr' : 'repeat(2, 1fr)',
          gap: isSmallMobile ? '1rem' : (isMobile ? '1.25rem' : '1.5rem'),
        }}
      >
        {/* Left Column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isSmallMobile ? '1rem' : (isMobile ? '1.25rem' : '1.5rem'),
          }}
        >
         
          <BasicInformationCard
            description={companyData.description}
            registrationNumber={companyData.registrationNumber}
            taxId={companyData.taxId}
          />
          <ContactInformationCard
            email={companyData.email}
            phone={companyData.phone}
            website={companyData.website}
            location={companyData.location}
          />
          <PrimaryContactCard
            name={companyData.primaryContact.name}
            designation={companyData.primaryContact.designation}
            email={companyData.primaryContact.email}
            phone={companyData.primaryContact.phone}
          />
        </div>

        {/* Right Column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isSmallMobile ? '1rem' : (isMobile ? '1.25rem' : '1.5rem'),
          }}
        >
          <SubmittedDocumentsCard
            documents={companyData.documents}
            onViewDocument={handleViewDocument}
          />
          <SocialMediaCard
            linkedin={companyData.socialMedia.linkedin}
            twitter={companyData.socialMedia.twitter}
            facebook={companyData.socialMedia.facebook}
          />
          <ReviewActionsCard
            onApprove={handleApproveClick}
            onReject={handleRejectClick}
          />
        </div>
      </div>

      {/* Dialogue Boxes */}
      <ConfirmApprovalDialogue
        isOpen={dialogueType === 'approve'}
        onClose={handleDialogueClose}
        entityName={companyData.companyName}
        entityType="company"
        onConfirm={handleApproveConfirm}
      />

      <ConfirmRejectionDialogue
        isOpen={dialogueType === 'reject'}
        onClose={handleDialogueClose}
        entityName={companyData.companyName}
        entityType="company"
        onConfirm={handleRejectConfirm}
      />
    </div>
  );
}

