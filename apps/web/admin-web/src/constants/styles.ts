/**
 * Common styles configuration for admin-web
 * Centralizes styling constants for consistent UI across the application
 */

/**
 * Color constants
 * Common colors used throughout the application
 * All colors should be referenced from this file for consistency
 */
export const COLORS = {
  // Primary colors
  PRIMARY: '#7F5BFF',
  PRIMARY_DARK: '#4C3799',
  PRIMARY_LIGHT: '#8B5CF6',
  
  // Background colors
  BG: '#110128',
  SEC_BG: '#281A3D',
  BG_GRADIENT_START: '#110128',
  BG_GRADIENT_MID: '#1a0538',
  BG_GRADIENT_END: '#0d0217',
  
  // Text colors
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#9ca3af',
  TEXT_PLACEHOLDER: '#CCCCCC',
  TEXT_MUTED: '#a78bfa',
  
  // Border colors
  BORDER_PRIMARY: '#ffffff',
  BORDER_SECONDARY: 'rgba(255, 255, 255, 0.1)',
  BORDER_TERTIARY: 'rgba(255, 255, 255, 0.05)',
  BORDER_PRIMARY_OPACITY: 'rgba(139, 92, 246, 0.3)',
  BORDER_PRIMARY_OPACITY_HOVER: 'rgba(139, 92, 246, 0.5)',
  
  // Overlay colors (white with opacity)
  OVERLAY_05: 'rgba(255, 255, 255, 0.05)',
  OVERLAY_08: 'rgba(255, 255, 255, 0.08)',
  OVERLAY_10: 'rgba(255, 255, 255, 0.10)',
  OVERLAY_25: 'rgba(255, 255, 255, 0.25)',
  
  // Primary color overlays
  PRIMARY_OVERLAY_10: 'rgba(139, 92, 246, 0.1)',
  PRIMARY_OVERLAY_20: 'rgba(139, 92, 246, 0.2)',
  PRIMARY_OVERLAY_30: 'rgba(139, 92, 246, 0.3)',
  
  // Success colors
  SUCCESS: '#22c55e',
  SUCCESS_HOVER: '#16a34a',
  SUCCESS_BG: '#5DD27A1A',
  
  // Error colors
  ERROR: '#ef4444',
  ERROR_HOVER: '#dc2626',
  ERROR_BG: 'rgba(239, 68, 68, 0.1)',
  ERROR_BG_REJECTED: '#FF6B6B1A',
  ERROR_BORDER: 'rgba(239, 68, 68, 0.5)',
  ERROR_TEXT: '#fca5a5',
  
  // Warning colors (orange)
  WARNING: '#f97316',
  WARNING_HOVER: '#ea580c',
  WARNING_BG: 'rgba(249, 115, 22, 0.1)',
  
  // Background overlays
  BG_OVERLAY_03: 'rgba(255, 255, 255, 0.03)',
  BG_SEC_OVERLAY: 'rgba(40, 26, 61, 0.8)',
  BG_PRIMARY_OVERLAY: 'rgba(127, 91, 255, 0.1)',
  
  // Shadow colors
  SHADOW_DARK: 'rgba(0, 0, 0, 0.3)',
  
  // Transparent
  TRANSPARENT: 'transparent',
} as const;

/**
 * Placeholder text styles
 * Used for all input placeholders throughout the admin panel
 */
export const PLACEHOLDER_STYLES = {
  color: 'var(--second-shade, #CCC)',
  fontFamily: '"Space Grotesk"',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: 'normal',
  textTransform: 'capitalize',
} as const;

/**
 * CSS styles object for inline styles (React style prop)
 */
export const placeholderStyles = {
  color: PLACEHOLDER_STYLES.color,
  fontFamily: PLACEHOLDER_STYLES.fontFamily,
  fontSize: PLACEHOLDER_STYLES.fontSize,
  fontStyle: PLACEHOLDER_STYLES.fontStyle,
  fontWeight: PLACEHOLDER_STYLES.fontWeight,
  lineHeight: PLACEHOLDER_STYLES.lineHeight,
  textTransform: PLACEHOLDER_STYLES.textTransform,
};

/**
 * Page heading styles
 * Used for main page headings like "Admin Dashboard"
 */
export const HEADING_STYLES = {
  color: 'var(--white-colour, #FCFCFC)',
  fontFamily: '"Space Grotesk"',
  fontSize: '24px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: 'normal',
  textTransform: 'capitalize',
} as const;

/**
 * CSS styles object for page headings (React style prop)
 */
export const headingStyles = {
  color: HEADING_STYLES.color,
  fontFamily: HEADING_STYLES.fontFamily,
  fontSize: HEADING_STYLES.fontSize,
  fontStyle: HEADING_STYLES.fontStyle,
  fontWeight: HEADING_STYLES.fontWeight,
  lineHeight: HEADING_STYLES.lineHeight,
  textTransform: HEADING_STYLES.textTransform,
};

/**
 * Sub-heading styles
 * Used for sub-headings and descriptive text below main headings
 */
export const SUB_HEADING_STYLES = {
  color: 'var(--second-shade, #CCC)',
  fontFamily: '"Space Grotesk"',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: 'normal',
  textTransform: 'capitalize',
} as const;

/**
 * CSS styles object for sub-headings (React style prop)
 */
export const subHeadingStyles = {
  color: SUB_HEADING_STYLES.color,
  fontFamily: SUB_HEADING_STYLES.fontFamily,
  fontSize: SUB_HEADING_STYLES.fontSize,
  fontStyle: SUB_HEADING_STYLES.fontStyle,
  fontWeight: SUB_HEADING_STYLES.fontWeight,
  lineHeight: SUB_HEADING_STYLES.lineHeight,
  textTransform: SUB_HEADING_STYLES.textTransform,
};

/**
 * Basic information description styles
 * Used for company description text in BasicInformationCard
 */
export const BASIC_INFO_DESCRIPTION_STYLES = {
  color: 'var(--white-colour, #FCFCFC)',
  fontFamily: '"Space Grotesk"',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '20px', // 125%
} as const;

/**
 * CSS styles object for basic info description (React style prop)
 */
export const basicInfoDescriptionStyles = {
  color: BASIC_INFO_DESCRIPTION_STYLES.color,
  fontFamily: BASIC_INFO_DESCRIPTION_STYLES.fontFamily,
  fontSize: BASIC_INFO_DESCRIPTION_STYLES.fontSize,
  fontStyle: BASIC_INFO_DESCRIPTION_STYLES.fontStyle,
  fontWeight: BASIC_INFO_DESCRIPTION_STYLES.fontWeight,
  lineHeight: BASIC_INFO_DESCRIPTION_STYLES.lineHeight,
};

