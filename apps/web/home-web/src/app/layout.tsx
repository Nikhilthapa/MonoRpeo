import './global.css';
import { Inter, Space_Grotesk, Nunito } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'HireNova - AI-Powered Job Matching Platform',
  description: 'Find your dream job with HireNova. Connect with top employers and discover opportunities tailored to your skills and aspirations.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${nunito.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
