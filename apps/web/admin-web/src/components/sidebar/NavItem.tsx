'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSidebarIcon } from '../icons/SidebarIcons';
import { COLORS } from '@/constants/styles';

interface NavItemProps {
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
}

export function NavItem({ label, href, icon, isActive }: NavItemProps) {
  const pathname = usePathname();
  const active = isActive ?? pathname === href;
  const IconComponent = icon ? getSidebarIcon(icon) : null;

  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <Link
        href={href}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.875rem 1rem',
          borderRadius: active ? '8px' : '0.5rem',
          textDecoration: 'none',
          color: active ? COLORS.TEXT_PRIMARY : COLORS.TEXT_SECONDARY,
          background: active ? COLORS.PRIMARY : COLORS.BG,
          border: 'none',
          fontSize: '0.75rem',
          fontWeight: active ? '500' : '400',
          fontFamily: '"Space Grotesk", sans-serif',
          transition: 'all 0.2s',
          cursor: 'pointer',
          width: '100%',
        }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = COLORS.PRIMARY;
        e.currentTarget.style.color = COLORS.TEXT_PRIMARY;
      }}
      onMouseLeave={(e) => {
        if (active) {
          e.currentTarget.style.background = COLORS.PRIMARY;
          e.currentTarget.style.color = COLORS.TEXT_PRIMARY;
        } else {
          e.currentTarget.style.background = COLORS.BG;
          e.currentTarget.style.color = COLORS.TEXT_SECONDARY;
        }
      }}
    >
      {IconComponent && (
        <span style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <IconComponent size={18} />
        </span>
      )}
      <span style={{ textAlign: 'left' }}>{label}</span>
      </Link>
    </div>
  );
}

