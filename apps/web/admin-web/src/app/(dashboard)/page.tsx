'use client';

import { StatsCard } from '@/components/dashboard/StatsCard';
import { ApprovalQueue } from '@/components/dashboard/ApprovalQueue';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import {
  CompanyIcon,
  JobIcon,
  VendorIcon,
  ActiveJobIcon,
  CandidateIcon,
  InterviewIcon,
} from '@/components/icons/dashboard';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  // Mock data - replace with actual API calls
  const stats = [
    { title: 'Pending Company Approvals', value: '05', icon: <CompanyIcon width={20} height={20} /> },
    { title: 'Pending Job Approvals', value: '500', icon: <JobIcon width={20} height={20} /> },
    { title: 'Pending Vendor Approvals', value: '280', icon: <VendorIcon width={20} height={20} /> },
    { title: 'Active Jobs', value: '05', icon: <ActiveJobIcon width={20} height={20} /> },
    { title: 'Total Candidates', value: '500', icon: <CandidateIcon width={20} height={20} /> },
    { title: 'Interviews Today', value: '280', icon: <InterviewIcon width={20} height={20} /> },
  ];

  const approvalCompanies = [
    { id: '1', name: 'TechCorp Solutions', timeAgo: '2 Hour Ago', submittedBy: 'John Don' },
    { id: '2', name: 'TechCorp Solutions', timeAgo: '2 Hour Ago', submittedBy: 'John Don' },
    { id: '3', name: 'TechCorp Solutions', timeAgo: '2 Hour Ago', submittedBy: 'John Don' },
  ];

  const approvalJobs = [
    { id: '1', name: 'Senior Developer', timeAgo: '1 Hour Ago', submittedBy: 'Jane Smith' },
    { id: '2', name: 'Product Manager', timeAgo: '3 Hours Ago', submittedBy: 'Bob Johnson' },
  ];

  const approvalVendors = [
    { id: '1', name: 'QuickHire Inc', timeAgo: '30 Minutes Ago', submittedBy: 'Alice Brown' },
    { id: '2', name: 'TalentSource', timeAgo: '1 Hour Ago', submittedBy: 'Charlie Wilson' },
  ];

  return (
    <div>
      <WelcomeSection />

      {/* Stats Cards - 2x3 Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Approval Queue - Full Width */}
      <ApprovalQueue
        companies={approvalCompanies}
        jobs={approvalJobs}
        vendors={approvalVendors}
      />
    </div>
  );
}

