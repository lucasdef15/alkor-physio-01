import type { Metadata } from 'next';

import { Geist, Montserrat_Alternates, Space_Grotesk } from 'next/font/google';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

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
  description:
    'Reabilitação cardiorrespiratória guiada por evidência científica — recupere fôlego, força e qualidade de vida com acompanhamento próximo e humano.',
  title: 'ΛLKOR Physio — Fisioterapia Cardiorrespiratória',
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
