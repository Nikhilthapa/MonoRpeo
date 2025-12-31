'use client';

import { useState } from 'react';
import Link from 'next/link';

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
}

export function ApprovalQueue({ companies = [], jobs = [], vendors = [] }: ApprovalQueueProps) {
  const [activeTab, setActiveTab] = useState<'companies' | 'jobs' | 'vendors'>('companies');

  const tabs = [
    { id: 'companies' as const, label: 'Companies', count: companies.length },
    { id: 'jobs' as const, label: 'Jobs', count: jobs.length },
    { id: 'vendors' as const, label: 'Vendors', count: vendors.length },
  ];

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'companies':
        return companies;
      case 'jobs':
        return jobs;
      case 'vendors':
        return vendors;
    }
  };

  const currentItems = getCurrentItems();

  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <h2
        style={{
          color: '#ffffff',
          fontSize: '1.25rem',
          fontWeight: '600',
          margin: '0 0 1.5rem 0',
        }}
      >
        Approval Queue
      </h2>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === tab.id ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
              border: 'none',
              borderBottom:
                activeTab === tab.id ? '2px solid #8b5cf6' : '2px solid transparent',
              color: activeTab === tab.id ? '#ffffff' : '#9ca3af',
              fontSize: '0.875rem',
              fontWeight: activeTab === tab.id ? '500' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Items List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div>
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.25rem',
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    color: '#9ca3af',
                    fontSize: '0.75rem',
                  }}
                >
                  {item.timeAgo} By {item.submittedBy}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                }}
              >
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    background: 'rgba(34, 197, 94, 0.2)',
                    border: '1px solid rgba(34, 197, 94, 0.5)',
                    color: '#4ade80',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Approve
                </button>
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    color: '#fca5a5',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  Reject
                </button>
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    background: 'rgba(139, 92, 246, 0.2)',
                    border: '1px solid rgba(139, 92, 246, 0.5)',
                    color: '#a78bfa',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              color: '#9ca3af',
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
      <Link
        href={
          activeTab === 'companies'
            ? '/company-management/pending-approvals'
            : activeTab === 'jobs'
              ? '/job-management/pending-jobs'
              : '/vendor-management/pending-approvals'
        }
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          background: 'rgba(139, 92, 246, 0.2)',
          border: '1px solid rgba(139, 92, 246, 0.5)',
          color: '#a78bfa',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: '500',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
        }}
      >
        See all {activeTab}
      </Link>
    </div>
  );
}

