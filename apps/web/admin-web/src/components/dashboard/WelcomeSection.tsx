'use client';

import { useState, useRef, useEffect } from 'react';
import { DashboardAlignedItem } from '@/components/layout/DashboardAlignedItem';
import { headingStyles, subHeadingStyles, COLORS } from '@/constants/styles';
import { DropdownArrowIcon } from '@/components/icons';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface WelcomeSectionProps {
  userName?: string;
}

export function WelcomeSection({ userName = 'Akash Gupta' }: WelcomeSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('this-month');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isMobile, isSmallMobile } = useMediaQuery();

  const options = [
    { value: 'this-month', label: 'This Month' },
    { value: 'this-week', label: 'This Week' },
    { value: 'today', label: 'Today' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === selectedValue) || options[0];
  return (
    <div style={{ marginBottom: isSmallMobile ? '1rem' : (isMobile ? '1.5rem' : '2rem') }}>
      <div
        style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1rem' : '0',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <DashboardAlignedItem>
            <h1
              style={{
                ...headingStyles,
                margin: 0,
              }}
            >
              Admin Dashboard
            </h1> 
          </DashboardAlignedItem>
          <p
            style={{
              ...subHeadingStyles,
              margin: 0,
            }}
          >
            Welcome Back, {userName}. Here&apos;s What Needs Your Attention Today.
          </p>
        </div>

        {/* This Month Filter - Aligned with Admin Dashboard text */}
        <DashboardAlignedItem>
          <div
            ref={dropdownRef}
            style={{
              position: 'relative',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            {/* Dropdown Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: isSmallMobile ? '44px' : '50px',
                padding: isSmallMobile ? '0.5rem 1rem' : '0.625rem 1.25rem',
                gap: '0.75rem',
                borderRadius: '0.5rem',
                background: COLORS.TRANSPARENT,
                border: `1px solid ${COLORS.BORDER_PRIMARY_OPACITY}`,
                color: COLORS.PRIMARY,
                fontSize: isSmallMobile ? '0.8125rem' : '0.875rem',
                fontWeight: '500',
                fontFamily: '"Space Grotesk", sans-serif',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.2s',
                minWidth: isMobile ? '100%' : '150px',
                width: isMobile ? '100%' : 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.BORDER_PRIMARY_OPACITY_HOVER;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.BORDER_PRIMARY_OPACITY;
              }}
            >
              <span>{selectedOption.label}</span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              >
                <DropdownArrowIcon color={COLORS.PRIMARY} />
              </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  left: 0,
                  right: 0,
                  background: COLORS.BG,
                  border: `1px solid ${COLORS.BORDER_SECONDARY}`,
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  zIndex: 1000, 
                  boxShadow: `0 4px 12px ${COLORS.SHADOW_DARK}`,
                }}
              >
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedValue(option.value);
                      setIsOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1.25rem',
                      background: COLORS.TRANSPARENT,
                      color: COLORS.TEXT_PRIMARY,
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      fontFamily: '"Space Grotesk", sans-serif',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = COLORS.PRIMARY_OVERLAY_10;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = COLORS.TRANSPARENT;
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </DashboardAlignedItem>
      </div>
    </div>
  );
}

