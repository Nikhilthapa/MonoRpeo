'use client';

import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#110128',
        display: 'flex',
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          marginLeft: '280px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <main
          style={{
            flex: 1,
            padding: '2rem',
            overflowY: 'auto',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

