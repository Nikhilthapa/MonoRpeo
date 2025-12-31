/**
 * Common styles configuration for admin-web
 * Centralizes styling constants for consistent UI across the application
 */

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

