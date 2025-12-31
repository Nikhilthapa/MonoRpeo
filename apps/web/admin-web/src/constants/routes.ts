/**
 * Route path constants for admin-web
 * Centralizes all route paths for type-safe navigation
 */

export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  LOGOUT: '/login',

  // Dashboard
  DASHBOARD: '/',

  // Admin Job Management
  ADMIN_JOB_MANAGEMENT: {
    CREATE_JOB: '/admin-job-management/create-job',
    JOB_LISTING: '/admin-job-management/job-listing',
  },

  // Company Management
  COMPANY_MANAGEMENT: {
    ALL_COMPANIES: '/company-management/all-companies',
    PENDING_APPROVALS: '/company-management/pending-approvals',
    REJECTED_SUSPENDED: '/company-management/rejected-suspended',
  },

  // Job Management
  JOB_MANAGEMENT: {
    PENDING_JOBS: '/job-management/pending-jobs',
    ACTIVE_JOBS: '/job-management/active-jobs',
    CLOSED_REJECTED: '/job-management/closed-rejected',
  },

  // Vendor Management
  VENDOR_MANAGEMENT: {
    ALL_VENDORS: '/vendor-management/all-vendors',
    PENDING_APPROVALS: '/vendor-management/pending-approvals',
    REJECTED_SUSPENDED: '/vendor-management/rejected-suspended',
  },

  // Candidate Management
  CANDIDATE_MANAGEMENT: {
    ALL_CANDIDATES: '/candidate-management/all-candidates',
    BY_VENDOR: '/candidate-management/by-vendor',
    PENDING_CANDIDATES: '/candidate-management/pending-candidates',
  },

  // Interview Management
  INTERVIEW_MANAGEMENT: {
    UPCOMING_INTERVIEWS: '/interview-management/upcoming-interviews',
    ALL_CANDIDATES: '/interview-management/all-candidates',
    FEEDBACK: '/interview-management/feedback',
  },

  // Other routes
  REPORTS_ANALYTICS: '/reports-analytics',
  ACTIVITY_LOGS: '/activity-logs',
  SETTINGS: '/settings',
} as const;

