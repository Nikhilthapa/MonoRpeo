import React from "react";

import { Logo } from "@org/ui";

interface AuthPageLayoutProps {
  title: React.ReactNode;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  showProgressHeader?: boolean;
  progressHeader?: React.ReactNode;
}

export const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({
  title,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  showProgressHeader = false,
  progressHeader,
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-auto bg-gradient-to-br from-[#110128] via-[#1a0538] to-[#0d0217] px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        {showProgressHeader && progressHeader && (
          <div className="w-full pt-2 sm:pt-1">{progressHeader}</div>
        )}

        <div className="mt-4 w-full sm:mt-6">
          <div className="mb-4 flex w-full justify-start sm:mb-6">
            <Logo />
          </div>

          <h1 className="mb-5 text-left text-xl font-bold leading-tight sm:mb-6 sm:text-2xl md:text-3xl lg:mb-8 lg:text-4xl">
            {title}
          </h1>

          <div className="space-y-3 sm:space-y-4">{children}</div>

          <div className="mt-3 text-center sm:mt-4">
            <span className="text-xs text-white sm:text-sm">{footerText} </span>
            <a
              href={footerLinkHref}
              className="text-xs font-medium text-primary transition-colors hover:text-primary-dark sm:text-sm"
            >
              {footerLinkText}
            </a>
          </div>

          <div className="mt-4 flex items-center sm:mt-6">
            <div className="flex-1 border-t border-white"></div>
            <span className="px-3 text-xs text-white sm:px-4">OR</span>
            <div className="flex-1 border-t border-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
