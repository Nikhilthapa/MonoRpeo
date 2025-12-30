import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition-colors py-1">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors py-1">
              Terms of Service
            </Link>
            <Link href="#faq" className="hover:text-white transition-colors py-1">
              FAQ
            </Link>
            <Link href="#" className="hover:text-white transition-colors py-1">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} HireNova. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

