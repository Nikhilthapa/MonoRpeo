'use client';

import Image from 'next/image';
import { Logo } from '../sidebar/Logo';
import { SidebarNav } from '../sidebar/SidebarNav';
import { COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useState, useEffect } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { isDesktop, isSmallMobile, isVeryLargeScreen } = useMediaQuery();
  const [leftOffset, setLeftOffset] = useState(0);

  // Calculate left offset for very large screens to center the sidebar with the container
  useEffect(() => {
    if (!isVeryLargeScreen || !isDesktop) {
      setLeftOffset(0);
      return;
    }

    const calculateOffset = () => {
      const viewportWidth = window.innerWidth;
      const maxContainerWidth = 1920;
      if (viewportWidth > maxContainerWidth) {
        // Center the sidebar with the container: (viewport width - container width) / 2
        setLeftOffset((viewportWidth - maxContainerWidth) / 2);
      } else {
        setLeftOffset(0);
      }
    };

    calculateOffset();
    window.addEventListener('resize', calculateOffset);

    return () => {
      window.removeEventListener('resize', calculateOffset);
    };
  }, [isVeryLargeScreen, isDesktop]);
  
  const sidebarStyle: React.CSSProperties = {
    width: isDesktop ? '280px' : '100%',
    minWidth: isDesktop ? '280px' : 'auto',
    maxWidth: isDesktop ? '280px' : (isSmallMobile ? '100%' : '320px'),
    height: '100vh',
    background: `linear-gradient(0deg, ${COLORS.OVERLAY_10} 0%, ${COLORS.OVERLAY_10} 100%), ${COLORS.BG}`,
    boxShadow: `1.994px 0 3.987px 0 ${COLORS.OVERLAY_25}`,
    borderRight: `1px solid ${COLORS.BORDER_SECONDARY}`,
    padding: isSmallMobile ? '1rem' : '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: isDesktop ? (isVeryLargeScreen ? `${leftOffset}px` : 0) : (isOpen ? 0 : '-100%'),
    top: 0,
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    zIndex: 1000,
    transition: 'left 0.3s ease',
  };

  return (
    <aside style={sidebarStyle} className="sidebar-no-scrollbar">
      {!isDesktop && onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: COLORS.TRANSPARENT,
            // border: `1px solid ${COLORS.BORDER_SECONDARY}`,
            color: COLORS.TEXT_PRIMARY,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            zIndex: 1001,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS.OVERLAY_25;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = COLORS.OVERLAY_10;
          }}
        >
          <Image
            src="/icons/common/cross.svg"
            alt="Close"
            width={18}
            height={18}
          />
        </button>
      )}
      <Logo />
      <SidebarNav />
    </aside>
  );
}

