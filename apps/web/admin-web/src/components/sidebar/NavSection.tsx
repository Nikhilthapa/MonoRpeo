'use client';

import { useState } from 'react';
import { NavItem } from './NavItem';
import type { NavSection as NavSectionType } from '@/constants/navigation';

interface NavSectionProps {
  section: NavSectionType;
}

export function NavSection({ section }: NavSectionProps) {
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? false);

  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          background: 'transparent',
          border: 'none',
          color: '#9ca3af',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#9ca3af';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {section.icon && (
            <span style={{ fontSize: '1.125rem' }}>{getIcon(section.icon)}</span>
          )}
          <span>{section.label}</span>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: '0.5rem',
            marginLeft: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
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

function getIcon(iconName: string): string {
  const icons: Record<string, string> = {
    dashboard: '📊',
    briefcase: '💼',
    building: '🏢',
    users: '👥',
    user: '👤',
    calendar: '📅',
    'bar-chart': '📈',
    'file-text': '📄',
    settings: '⚙️',
  };
  return icons[iconName] || '•';
}

