'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  JobDetailsCard,
  JobDescriptionCard,
  KeyResponsibilitiesCard,
  RequirementsCard,
  RequiredSkillsCard,
  ImportantDatesCard,
} from '@/components/job';
import { PrimaryContactCard, ReviewActionsCard } from '@/components/company';
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
const getMockJobData = (id: string) => {
  return {
    id,
    jobTitle: 'Senior Backend Developer',
    status: 'pending' as const,
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    employmentType: ['Full-time', 'Hybrid'],
    experience: '5-7 years',
    salaryRange: '$120,000-$160,000',
    openings: 3,
    companyDescription:
      'TechCorp Solutions is a leading software development company specializing in enterprise-grade applications, cloud solutions, and AI-powered tools. We help businesses transform digitally with cutting-edge technology.',
    registrationNumber: 'REG-2015-SF-12345',
    taxId: 'TAX-94-1234567',
    keyResponsibilities: [
      'Design and develop scalable backend services and APIs',
      'Lead technical discussions and architectural decisions',
      'Mentor junior developers and conduct code reviews',
      'Optimize application performance and database queries',
      'Collaborate with frontend developers and product managers',
      'Implement security best practices and data protection measures',
      'Participate in on-call rotation for production support',
      'Write comprehensive technical documentation',
    ],
    requirements: [
      '5+ years of experience in backend development',
      'Strong proficiency in Node.js or Python',
      'Deep understanding of RESTful API design principles',
      'Experience with PostgreSQL or other relational databases',
      'Hands-on experience with AWS cloud services',
      'Proficiency in Docker and container orchestration',
      'Experience with microservices architecture',
      'Strong problem-solving and debugging skills',
    ],
    requiredSkills: ['React', 'Node.Js', 'Typescript', 'PostgreSQL', 'AWS'],
    applicationDeadline: '2025-01-15',
    expectedJoiningDate: '2025-02-01',
    preferredNoticePeriod: '15 Days',
    primaryContact: {
      name: 'John Smith',
      designation: 'CEO & Founder',
      email: 'john.smith@techcorp',
      phone: '+1 (555) 123-4567',
    },
    submittedDate: '2024-12-28 10:30 AM',
    submittedBy: 'John Smith',
    submittedByRole: 'CEO',
  };
};

export default function JobViewPage() {
  const params = useParams();
  const jobId = params.id as string;
  const { isMobile, isTablet, isSmallMobile } = useMediaQuery();

  // Mock data - replace with API call using jobId
  const jobData = getMockJobData(jobId);

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
    console.log('Approved job:', jobId);
    // You can add API call here
    setDialogueType(null);
  };

  const handleRejectConfirm = () => {
    // Handle rejection logic here
    console.log('Rejected job:', jobId);
    // You can add API call here
    setDialogueType(null);
  };

  const handleDialogueClose = () => {
    setDialogueType(null);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          href={ROUTES.JOB_MANAGEMENT.PENDING_JOBS}
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
          Back To Jobs
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
            Job Posting Review
          </h3>
          <p
            style={{
              ...subHeadingStyles,
              margin: '0.5rem 0 0 0',
            }}
          >
            Review And Approve/Reject Job Posting
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
              text="Approve Job Posting"
              onClick={handleApproveClick}
              style={{
                width: isMobile ? '100%' : '180px',
                height: '40px',
                minHeight: '40px',
              }}
            />
          </span>
          <span>
            <RejectButton
              text="Reject Job Posting"
              onClick={handleRejectClick}
              style={{
                width: isMobile ? '100%' : '180px',
                height: '40px',
                minHeight: '40px',
              }}
            />
          </span>
        </div>
      </div>

      {/* Main Overview Card */}
      <div style={{ marginBottom: '1.5rem' }}>
        <JobDetailsCard
          jobTitle={jobData.jobTitle}
          status={jobData.status}
          company={jobData.company}
          location={jobData.location}
          employmentType={jobData.employmentType}
          experience={jobData.experience}
          salaryRange={jobData.salaryRange}
          openings={jobData.openings}
          submittedDate={jobData.submittedDate}
          submittedBy={jobData.submittedBy}
          submittedByRole={jobData.submittedByRole}
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
          <JobDescriptionCard
            companyDescription={jobData.companyDescription}
            registrationNumber={jobData.registrationNumber}
            taxId={jobData.taxId}
          />
          <KeyResponsibilitiesCard
            responsibilities={jobData.keyResponsibilities}
          />
          <RequirementsCard requirements={jobData.requirements} />
        </div>

        {/* Right Column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isSmallMobile ? '1rem' : (isMobile ? '1.25rem' : '1.5rem'),
          }}
        >
          <PrimaryContactCard
            name={jobData.primaryContact.name}
            designation={jobData.primaryContact.designation}
            email={jobData.primaryContact.email}
            phone={jobData.primaryContact.phone}
          />
          <RequiredSkillsCard skills={jobData.requiredSkills} />
          <ImportantDatesCard
            applicationDeadline={jobData.applicationDeadline}
            expectedJoiningDate={jobData.expectedJoiningDate}
            preferredNoticePeriod={jobData.preferredNoticePeriod}
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
        entityName={jobData.jobTitle}
        entityType="job"
        onConfirm={handleApproveConfirm}
      />

      <ConfirmRejectionDialogue
        isOpen={dialogueType === 'reject'}
        onClose={handleDialogueClose}
        entityName={jobData.jobTitle}
        entityType="job"
        onConfirm={handleRejectConfirm}
      />
    </div>
  );
}

