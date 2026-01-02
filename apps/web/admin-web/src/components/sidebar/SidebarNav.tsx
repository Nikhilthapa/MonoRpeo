'use client';

import { NavItem } from './NavItem';
import { NavSection } from './NavSection';
import { NAVIGATION_MENU } from '@/constants/navigation';
import type { NavItem as NavItemType, NavSection as NavSectionType } from '@/constants/navigation';

export function SidebarNav() {
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      className="sidebar-no-scrollbar"
    >
      {NAVIGATION_MENU.map((item, index) => {
        // Check if it's a section (has items property)
        if ('items' in item) {
          return <NavSection key={`section-${index}`} section={item as NavSectionType} />;
        } else {
          return <NavItem key={item.href} {...(item as NavItemType)} />;
        }
      })}
    </nav>
  );
}

