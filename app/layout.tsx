import type { Metadata } from 'next';

import { Geist, Montserrat_Alternates, Space_Grotesk } from 'next/font/google';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { SITE_CONFIG, SITE_URL } from '@/lib/site';

import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

const montserrat = Montserrat_Alternates({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['700'],
});

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  description: SITE_CONFIG.description,
  metadataBase: SITE_URL,
  openGraph: {
    description: SITE_CONFIG.description,
    locale: 'pt_BR',
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    type: 'website',
    url: '/',
  },
  title: SITE_CONFIG.title,
  twitter: {
    card: 'summary_large_image',
    description: SITE_CONFIG.description,
    title: SITE_CONFIG.title,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${spaceGrotesk.variable} ${montserrat.variable} h-full antialiased`}
      lang="pt-BR"
    >
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
