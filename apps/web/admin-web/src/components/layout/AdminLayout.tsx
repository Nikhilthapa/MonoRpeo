'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Backdrop } from '@/components/common/Backdrop';
import { COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDesktop, isTablet, isMobile, isSmallMobile, isVeryLargeScreen } = useMediaQuery();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // Determine padding based on screen size
  const getMainPadding = () => {
    if (isSmallMobile) return '0 0.75rem 0.75rem 0.75rem';
    if (isMobile) return '0 1rem 1rem 1rem';
    if (isTablet) return '0 1.5rem 1.5rem 1.5rem';
    return '0 2rem 2rem 2rem';
  };

  // Layout content
  const layoutContent = (
    <>
      <Sidebar isOpen={isDesktop || sidebarOpen} onClose={handleSidebarClose} />
      <Backdrop isOpen={!isDesktop && sidebarOpen} onClick={handleSidebarClose} />
      <div
        style={{
          flex: 1,
          marginLeft: isDesktop ? '280px' : '0',
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.3s ease',
          width: '100%',
          minWidth: 0,
          overflowX: 'hidden',
        }}
      >
        <Header onMenuClick={handleSidebarToggle} />
        <main
          style={{
            flex: 1,
            padding: getMainPadding(),
            overflowY: 'auto',
          }}
        >
          {children}
        </main>
      </div>
    </>
  );

  // For very large screens, wrap in a centered container with max-width
  if (isVeryLargeScreen) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: COLORS.BG,
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1920px',
            minHeight: '100vh',
            background: COLORS.BG,
            display: 'flex',
            overflowX: 'hidden',
            position: 'relative',
          }}
        >
          {layoutContent}
        </div>
      </div>
    );
  }

  // For smaller screens, use the current layout
  return (
    <div
      style={{
        minHeight: '100vh',
        background: COLORS.BG,
        display: 'flex',
        overflowX: 'hidden',
        width: '100%',
      }}
    >
      {layoutContent}
    </div>
  );
}

