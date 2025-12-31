/**
 * API endpoint constants for admin-web
 * Centralizes all API endpoint paths for type-safe API calls
 */

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify',
  },

  // Admin endpoints
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    COMPANIES: '/admin/companies',
    JOBS: '/admin/jobs',
    SETTINGS: '/admin/settings',
  },

  // User management
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  // Company management
  COMPANIES: {
    LIST: '/companies',
    CREATE: '/companies',
    GET: (id: string) => `/companies/${id}`,
    UPDATE: (id: string) => `/companies/${id}`,
    DELETE: (id: string) => `/companies/${id}`,
  },

  // Job management
  JOBS: {
    LIST: '/jobs',
    CREATE: '/jobs',
    GET: (id: string) => `/jobs/${id}`,
    UPDATE: (id: string) => `/jobs/${id}`,
    DELETE: (id: string) => `/jobs/${id}`,
  },
} as const;

