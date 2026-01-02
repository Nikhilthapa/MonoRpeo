'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavItem } from './NavItem';
import { getSidebarIcon } from '../icons/SidebarIcons';
import type { NavSection as NavSectionType } from '@/constants/navigation';
import { COLORS } from '@/constants/styles';

interface NavSectionProps {
  section: NavSectionType;
}

export function NavSection({ section }: NavSectionProps) {
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? false);
  const pathname = usePathname();
  const IconComponent = section.icon ? getSidebarIcon(section.icon) : null;
  
  // Check if any child item is active
  const hasActiveChild = section.items.some(item => pathname === item.href);

  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.875rem 1rem',
          borderRadius: hasActiveChild ? '8px' : '0.5rem',
          background: hasActiveChild ? COLORS.PRIMARY : COLORS.BG,
          border: 'none',
          color: hasActiveChild ? COLORS.TEXT_PRIMARY : COLORS.TEXT_SECONDARY,
          fontSize: '0.77rem',
          fontWeight: '500',
          fontFamily: '"Space Grotesk", sans-serif',
          cursor: 'pointer',
          transition: 'all 0.2s',
          textAlign: 'left',
        }}
        onMouseEnter={(e) => {
          if (!hasActiveChild) {
            e.currentTarget.style.background = COLORS.OVERLAY_05;
            e.currentTarget.style.color = COLORS.TEXT_PRIMARY;
          }
        }}
        onMouseLeave={(e) => {
          if (!hasActiveChild) {
            e.currentTarget.style.background = COLORS.BG;
            e.currentTarget.style.color = COLORS.TEXT_SECONDARY;
          } else {
            e.currentTarget.style.background = COLORS.PRIMARY;
            e.currentTarget.style.color = COLORS.TEXT_PRIMARY;
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, textAlign: 'left' }}>
          {IconComponent && (
            <span style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <IconComponent size={18} />
            </span>
          )}
          <span style={{ textAlign: 'left' }}>{section.label}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="8"
          viewBox="0 0 15 9"
          fill="none"
          style={{
            transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.2s',
            flexShrink: 0,
            marginLeft: '0.5rem',
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.07853 0.438647C6.35978 0.157746 6.74103 -3.36718e-05 7.13853 -3.37066e-05C7.53603 -3.37413e-05 7.91728 0.157746 8.19853 0.438647L13.8565 6.09465C14.1378 6.37604 14.2957 6.75764 14.2957 7.1555C14.2956 7.55336 14.1374 7.93488 13.856 8.21615C13.5746 8.49741 13.193 8.65537 12.7952 8.65527C12.3973 8.65518 12.0158 8.49704 11.7345 8.21565L7.13853 3.61965L2.54253 8.21565C2.25975 8.48902 1.88092 8.64039 1.48762 8.63716C1.09432 8.63393 0.718028 8.47636 0.439783 8.19837C0.161539 7.92039 0.00360744 7.54425 5.59053e-06 7.15095C-0.00359626 6.75766 0.14742 6.37868 0.420526 6.09565L6.07753 0.437646L6.07853 0.438647Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: '0.375rem',
            marginLeft: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.125rem',
          }}
        >
          {section.items.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

