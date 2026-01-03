/**
 * Navigation menu structure for admin sidebar
 */

import { ROUTES } from './routes';

export interface NavItem {
  label: string;
  href: string;
  icon?: string; // Icon name or component identifier
}

export interface NavSection {
  label: string;
  icon?: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

export const NAVIGATION_MENU: (NavItem | NavSection)[] = [
  // Dashboard (single item)
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: 'dashboard',
  },

  // Admin Job Management (section)
  {
    label: 'Admin Job Management',
    icon: 'briefcase',
    items: [
      {
        label: 'Create Job',
        href: ROUTES.ADMIN_JOB_MANAGEMENT.CREATE_JOB,
      },
      {
        label: 'Job Listing',
        href: ROUTES.ADMIN_JOB_MANAGEMENT.JOB_LISTING,
      },
    ],
  },

  // Company Management (section)
  {
    label: 'Company Management',
    icon: 'building',
    items: [
      {
        label: 'All Companies',
        href: ROUTES.COMPANY_MANAGEMENT.ALL_COMPANIES,
      },
      {
        label: 'Pending Approvals',
        href: ROUTES.COMPANY_MANAGEMENT.PENDING_APPROVALS,
      },
      {
        label: 'Rejected / Suspended',
        href: ROUTES.COMPANY_MANAGEMENT.REJECTED_SUSPENDED,
      },
    ],
  },

  // Job Management (section)
  {
    label: 'Job Management',
    icon: 'briefcase',
    items: [
      {
        label: 'Pending Jobs',
        href: ROUTES.JOB_MANAGEMENT.PENDING_JOBS,
      },
      {
        label: 'Active Jobs',
        href: ROUTES.JOB_MANAGEMENT.ACTIVE_JOBS,
      },
      {
        label: 'Closed / Rejected Jobs',
        href: ROUTES.JOB_MANAGEMENT.CLOSED_REJECTED,
      },
    ],
  },

  // Vendor Management (section)
  {
    label: 'Vendor Management',
    icon: 'users',
    items: [
      {
        label: 'All Vendors',
        href: ROUTES.VENDOR_MANAGEMENT.ALL_VENDORS,
      },
      {
        label: 'Pending Approvals',
        href: ROUTES.VENDOR_MANAGEMENT.PENDING_APPROVALS,
      },
      {
        label: 'Rejected / Suspended',
        href: ROUTES.VENDOR_MANAGEMENT.REJECTED_SUSPENDED,
      },
    ],
  },

  // Candidate Management (section)
  {
    label: 'Candidate Management',
    icon: 'user',
    items: [
      {
        label: 'All Candidates',
        href: ROUTES.CANDIDATE_MANAGEMENT.ALL_CANDIDATES,
      },
      {
        label: 'By Vendor',
        href: ROUTES.CANDIDATE_MANAGEMENT.BY_VENDOR,
      },
      {
        label: 'Pending Candidates',
        href: ROUTES.CANDIDATE_MANAGEMENT.PENDING_CANDIDATES,
      },
    ],
  },

  // Interview Management (section)
  {
    label: 'Interview Management',
    icon: 'calendar',
    items: [
      {
        label: 'Upcoming Interviews',
        href: ROUTES.INTERVIEW_MANAGEMENT.UPCOMING_INTERVIEWS,
      },
      {
        label: 'All Candidates',
        href: ROUTES.INTERVIEW_MANAGEMENT.ALL_CANDIDATES,
      },
      {
        label: 'Feedback',
        href: ROUTES.INTERVIEW_MANAGEMENT.FEEDBACK,
      },
    ],
  },

  // Single items
  {
    label: 'Reports & Analytics',
    href: ROUTES.REPORTS_ANALYTICS,
    icon: 'bar-chart',
  },
  {
    label: 'Activity Logs',
    href: ROUTES.ACTIVITY_LOGS,
    icon: 'file-text',
  },
  {
    label: 'Settings',
    href: ROUTES.SETTINGS,
    icon: 'settings',
  },
];

