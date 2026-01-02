'use client';

import { SearchIcon, BellIcon, ProfileIcon, MenuIcon } from '@/components/icons';
import { COLORS } from '@/constants/styles';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { isDesktop, isTablet, isMobile, isSmallMobile } = useMediaQuery();

  const getHeaderPadding = () => {
    if (isSmallMobile) return '0.75rem 0.75rem 0.75rem 0.75rem';
    if (isMobile) return '1rem 1rem 1rem 1rem';
    if (isTablet) return '1.5rem 1.5rem 1.5rem 1.5rem';
    return '2rem 2rem 2rem 2rem';
  };

  const getSearchWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return '60%';
    return '50%';
  };

  return (
    <header
      style={{
        minHeight: '70px',
        background: COLORS.BG,
        padding: getHeaderPadding(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        gap: isMobile ? '0.75rem' : '1.5rem',
      }}
    >
      {!isDesktop ? (
        <>
          {/* Mobile/Tablet Layout: Left Side - Hamburger + Notification */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexShrink: 0,
            }}
          >
            {/* Hamburger Menu Button */}
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                style={{
                  width: '44px',
                  height: '44px',
                  minWidth: '44px',
                  minHeight: '44px',
                  borderRadius: '0.5rem',
                  background: COLORS.OVERLAY_05,
                  border: `1px solid ${COLORS.BORDER_SECONDARY}`,
                  color: COLORS.TEXT_PRIMARY,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = COLORS.OVERLAY_10;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = COLORS.OVERLAY_05;
                }}
              >
                <MenuIcon width={24} height={24} color={COLORS.TEXT_PRIMARY} />
              </button>
            )}

            {/* Notifications */}
            <button
              style={{
                width: '44px',
                height: '44px',
                minWidth: '44px',
                minHeight: '44px',
                maxWidth: '44px',
                maxHeight: '44px',
                borderRadius: '50px',
                background: COLORS.OVERLAY_05,
                border: `1px solid ${COLORS.BORDER_SECONDARY}`,
                color: COLORS.TEXT_PRIMARY,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.25rem',
                transition: 'all 0.2s',
                overflow: 'hidden',
                padding: 0,
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.OVERLAY_10;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.OVERLAY_05;
              }}
            >
              <BellIcon width={20} height={21} />
            </button>
          </div>

          {/* Center - Search Bar */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              maxWidth: '100%',
            }}
          >
            <input
              type="text"
              placeholder="Search Job"
              style={{
                width: '100%',
                height: isSmallMobile ? '44px' : '50px',
                padding: isSmallMobile ? '0.5rem 0.75rem 0.5rem 2.25rem' : '0.625rem 1rem 0.625rem 2.5rem',
                borderRadius: '0.5rem',
                background: COLORS.TRANSPARENT,
                border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                color: COLORS.TEXT_PRIMARY,
                fontSize: isSmallMobile ? '0.8125rem' : '0.875rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.BORDER_PRIMARY;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = COLORS.BORDER_PRIMARY;
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: isSmallMobile ? '0.625rem' : '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <SearchIcon width={isSmallMobile ? 16 : 20} height={isSmallMobile ? 16 : 20} />
            </span>
          </div>

          {/* Right Side - Profile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                minWidth: '44px',
                minHeight: '44px',
                maxWidth: '44px',
                maxHeight: '44px',
                borderRadius: '50px',
                background: COLORS.OVERLAY_05,
                border: `1px solid ${COLORS.BORDER_SECONDARY}`,
                color: COLORS.TEXT_PRIMARY,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.25rem',
                transition: 'all 0.2s',
                overflow: 'hidden',
                padding: 0,
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.OVERLAY_10;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.OVERLAY_05;
              }}
            >
              <ProfileIcon width={35} height={35} style={{ transform: 'translateY(5px)' }} />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Desktop Layout */}
          {/* Left Side - Search Bar */}
          <div
            style={{
              width: getSearchWidth(),
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              placeholder="Search Job"
              style={{
                width: '100%',
                height: '50px',
                padding: '0.625rem 1rem 0.625rem 2.5rem',
                borderRadius: '0.5rem',
                background: COLORS.TRANSPARENT,
                border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                color: COLORS.TEXT_PRIMARY,
                fontSize: '0.875rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.BORDER_PRIMARY;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = COLORS.BORDER_PRIMARY;
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
              flexShrink: 0,
            }}
          >
            {/* Notifications */}
            <button
              style={{
                width: '50px',
                height: '50px',
                minWidth: '50px',
                minHeight: '50px',
                maxWidth: '50px',
                maxHeight: '50px',
                borderRadius: '50px',
                background: COLORS.OVERLAY_05,
                border: `1px solid ${COLORS.BORDER_SECONDARY}`,
                color: COLORS.TEXT_PRIMARY,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.25rem',
                transition: 'all 0.2s',
                overflow: 'hidden',
                padding: 0,
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.OVERLAY_10;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.OVERLAY_05;
              }}
            >
              <BellIcon width={25} height={26} />
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
                  minWidth: '50px',
                  minHeight: '50px',
                  maxWidth: '50px',
                  maxHeight: '50px',
                  borderRadius: '50px',
                  background: COLORS.OVERLAY_05,
                  border: `1px solid ${COLORS.BORDER_SECONDARY}`,
                  color: COLORS.TEXT_PRIMARY,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  transition: 'all 0.2s',
                  overflow: 'hidden',
                  padding: 0,
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = COLORS.OVERLAY_10;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = COLORS.OVERLAY_05;
                }}
              >
                <ProfileIcon width={40} height={40} style={{ transform: 'translateY(5px)' }} />
              </div>
              <div>
                <div
                  style={{
                    color: COLORS.TEXT_PRIMARY,
                    fontSize: '0.875rem',
                    fontWeight: '500',
                  }}
                >
                  Akash Gupta
                </div>
                <div
                  style={{
                    color: COLORS.TEXT_SECONDARY,
                    fontSize: '0.75rem',
                  }}
                >
                  Super Admin
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

