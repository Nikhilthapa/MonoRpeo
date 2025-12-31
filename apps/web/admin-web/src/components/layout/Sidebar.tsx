'use client';

import { Logo } from '../sidebar/Logo';
import { SidebarNav } from '../sidebar/SidebarNav';

export function Sidebar() {
  return (
    <aside
      style={{
        width: '280px',
        minWidth: '280px',
        height: '100vh',
        background: 'rgba(17, 1, 40, 0.8)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        overflowY: 'auto',
      }}
    >
      <Logo />
      <SidebarNav />
    </aside>
  );
}

