'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect screen size breakpoints
 * Returns boolean values for mobile, tablet, desktop, small mobile, and very large screen
 */
export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isVeryLargeScreen, setIsVeryLargeScreen] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const smallMobileQuery = window.matchMedia('(max-width: 480px)');
    const veryLargeScreenQuery = window.matchMedia('(min-width: 1536px)');

    const updateMatches = () => {
      setIsMobile(mobileQuery.matches);
      setIsTablet(tabletQuery.matches);
      setIsDesktop(desktopQuery.matches);
      setIsSmallMobile(smallMobileQuery.matches);
      setIsVeryLargeScreen(veryLargeScreenQuery.matches);
    };

    // Set initial values
    updateMatches();

    // Add listeners
    mobileQuery.addEventListener('change', updateMatches);
    tabletQuery.addEventListener('change', updateMatches);
    desktopQuery.addEventListener('change', updateMatches);
    smallMobileQuery.addEventListener('change', updateMatches);
    veryLargeScreenQuery.addEventListener('change', updateMatches);

    // Cleanup
    return () => {
      mobileQuery.removeEventListener('change', updateMatches);
      tabletQuery.removeEventListener('change', updateMatches);
      desktopQuery.removeEventListener('change', updateMatches);
      smallMobileQuery.removeEventListener('change', updateMatches);
      veryLargeScreenQuery.removeEventListener('change', updateMatches);
    };
  }, []);

  return { isMobile, isTablet, isDesktop, isSmallMobile, isVeryLargeScreen };
}

