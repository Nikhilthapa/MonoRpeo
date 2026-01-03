/**
 * Environment configuration for admin-web
 * Centralizes all environment variable access
 */

export const env = {
  /**
   * API Gateway base URL
   * Defaults to http://localhost:3001 if not set
   */
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',

  /**
   * Node environment
   */
  nodeEnv: process.env.NODE_ENV || 'development',

  /**
   * Check if running in production
   */
  isProduction: process.env.NODE_ENV === 'production',

  /**
   * Check if running in development
   */
  isDevelopment: process.env.NODE_ENV === 'development',
} as const;

