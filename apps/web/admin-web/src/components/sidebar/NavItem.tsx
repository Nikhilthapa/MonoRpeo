'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
}

export function NavItem({ label, href, icon, isActive }: NavItemProps) {
  const pathname = usePathname();
  const active = isActive ?? pathname === href;

  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        color: active ? '#ffffff' : '#9ca3af',
        background: active ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
        border: active ? '1px solid rgba(139, 92, 246, 0.5)' : '1px solid transparent',
        fontSize: '0.875rem',
        fontWeight: active ? '500' : '400',
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {icon && (
        <span style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center' }}>
          {getIcon(icon)}
        </span>
      )}
      <span>{label}</span>
    </Link>
  );
}

// Simple icon renderer - can be replaced with lucide-react or similar later
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

