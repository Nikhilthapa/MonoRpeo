"use client";

import React, { useState } from "react";

import { Button } from "./Button";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  children?: NavItem[];
}

export interface ActionButton {
  label: string;
  variant: "primary" | "secondary" | "primary-nav" | "secondary-nav";
  onClick: () => void;
  className?: string;
}

interface NavbarProps {
  logoComponent?: React.ReactNode;
  navItems?: NavItem[];
  actionButtons?: ActionButton[];
  mobileMenuButton?: React.ReactNode;
  onMobileMenuClick?: () => void;
}

const defaultNavItems: NavItem[] = [
  {
    label: "Build Your Team",
    children: [],
  },
  {
    label: "Find Job",
    children: [],
  },
  {
    
    label: "About Us",
    href: "#about",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  logoComponent,
  navItems = defaultNavItems,
  actionButtons,
  mobileMenuButton,
  onMobileMenuClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMobileMenuClick?.();
  };

  const renderNavItem = (item: NavItem) => {
    const hasChildren = item.children !== undefined;
    const content = (
      <>
        {item.label}
        {hasChildren && <Icon name="ChevronDown" size="sm" className="w-4 h-4" />}
      </>
    );

    if (item.href) {
      return (
        <a
          key={item.label}
          href={item.href}
          className="text-base font-medium text-[#CCC] transition-colors hover:text-primary"
        >
          {item.label}
        </a>
      );
    }

    if (item.onClick) {
      return (
        <button
          key={item.label}
          onClick={item.onClick}
          className="flex items-center gap-[12px] text-base font-medium text-[#CCC] transition-colors hover:text-primary"
        >
          {content}
        </button>
      );
    }

    return (
      <button
        key={item.label}
        className="flex items-center gap-[12px] text-base font-medium text-[#CCC] transition-colors hover:text-primary"
      >
        {content}
      </button>
    );
  };

  const defaultMobileMenuButton = (
    <button className="p-2 text-white md:hidden" onClick={handleMobileMenuClick}>
      <Icon name="Menu" size="lg" className="h-6 w-6" />
    </button>
  );

  return (
    <nav className="w-full pt-[20px]">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <div className="flex-shrink-0">{logoComponent || <Logo />}</div>

          <div className="hidden items-center gap-[60px] md:flex">
            {navItems.map(renderNavItem)}
          </div>

          <div className="flex items-center gap-3">
            {actionButtons?.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                onClick={button.onClick}
                className={`hidden whitespace-nowrap sm:flex ${button.className || ""}`}
              >
                {button.label}
              </Button>
            ))}
            {mobileMenuButton || defaultMobileMenuButton}
          </div>
        </div>
      </div>
    </nav>
  );
};
