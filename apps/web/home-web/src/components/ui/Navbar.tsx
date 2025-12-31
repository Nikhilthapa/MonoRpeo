'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './Button';

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface NavbarProps {
  logo?: React.ReactNode;
  items?: NavItem[];
  ctaButtons?: Array<{
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  }>;
  className?: string;
}

const defaultItems: NavItem[] = [
  { label: 'Build Your Team', href: '#', hasDropdown: true },
  { label: 'Find Job', href: '#', hasDropdown: true },
  { label: 'About Us', href: '#' },
  { label: 'Contact', href: '#' },
];

const defaultCtaButtons = [
  { label: 'Build Your Team', href: '/login', variant: 'primary' as const },
  { label: 'Find a Job', href: '/login', variant: 'secondary' as const },
];

export function Navbar({
  logo,
  items = defaultItems,
  ctaButtons = defaultCtaButtons,
  className = '',
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {logo}
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8 2xl:gap-[60px]">
          {items.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="nav-menu-item hover:text-white transition-colors flex items-center whitespace-nowrap"
              >
                {item.label}
                {item.hasDropdown && (
                  <svg
                    className="w-3 h-3 xl:w-3.5 xl:h-3.5 2xl:w-4 2xl:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </Link>
            </div>
          ))}
          <div className="flex items-center gap-3 xl:gap-5 2xl:gap-[25px] lg:ml-4 xl:ml-8 2xl:ml-[60px]">
            {ctaButtons.map((button) => (
              <Link key={button.label} href={button.href}>
                <Button variant={button.variant} className="whitespace-nowrap">
                  {button.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden w-8 h-8 flex items-center justify-center text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-border">
          <div className="flex flex-col gap-4 pt-4">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-[25px] px-4 pt-2">
              {ctaButtons.map((button) => (
                <Link
                  key={button.label}
                  href={button.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant={button.variant} className="w-full">
                    {button.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

