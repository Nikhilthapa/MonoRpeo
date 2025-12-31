'use client';

import { SearchIcon, BellIcon, ProfileIcon } from '@/components/icons';

export function Header() {
  return (
    <header
      style={{
        minHeight: '70px',
        background: '#110128',
        padding: '2rem 2rem 0 2rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left Side - Search Bar */}
      <div
        style={{
          width: '50%',
          position: 'relative',
          alignSelf: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Search Job"
          style={{
            width: '100%',
            padding: '0.625rem 1rem 0.625rem 2.5rem',
            borderRadius: '0.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid #ffffff',
            color: '#ffffff',
            fontSize: '0.875rem',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#ffffff';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#ffffff';
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <SearchIcon />
        </span>
      </div>

      {/* Right Side - Notifications and User Profile */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Notifications */}
        <button
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.25rem',
            transition: 'all 0.2s',
            overflow: 'hidden',
            padding: 0,
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <BellIcon />
        </button>

        {/* User Profile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <ProfileIcon style={{ transform: 'translateY(5px)' }} />
          </div>
          <div>
            <div
              style={{
                color: '#ffffff',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
            >
              Akash Gupta
            </div>
            <div
              style={{
                color: '#9ca3af',
                fontSize: '0.75rem',
              }}
            >
              Super Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

