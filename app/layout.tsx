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

const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin'],
  variable: '--font-montserrat-alternates',
  weight: ['700'],
});

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },

  authors: [
    {
      name: SITE_CONFIG.professional.name,
    },
  ],

  category: 'Saúde e fisioterapia',

  creator: SITE_CONFIG.professional.name,

  description: SITE_CONFIG.description,

  metadataBase: SITE_URL,
  openGraph: {
    description: SITE_CONFIG.description,
    images: [
      {
        alt: `${SITE_CONFIG.professional.name} — ${SITE_CONFIG.professional.title}`,
        height: 630,
        url: '/opengraph-image.jpg',
        width: 1200,
      },
    ],
    locale: 'pt_BR',
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    type: 'website',
    url: '/',
  },

  publisher: SITE_CONFIG.name,

  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },

    index: true,
  },

  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  twitter: {
    card: 'summary_large_image',
    description: SITE_CONFIG.description,
    images: ['/twitter-image.jpg'],
    title: SITE_CONFIG.title,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = SITE_URL.toString();
  const imageUrl = new URL('/opengraph-image.jpg', SITE_URL).toString();

  const jsonLd = {
    '@context': 'https://schema.org',

    '@graph': [
      {
        '@id': `${siteUrl}#physiotherapy`,
        '@type': 'Physiotherapy',

        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BR',
          addressLocality: 'Mococa',
          addressRegion: 'SP',
        },
        areaServed: {
          '@type': 'City',
          containedInPlace: {
            '@type': 'State',
            name: 'São Paulo',
          },
          name: 'Mococa',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          areaServed: 'BR',
          availableLanguage: 'Portuguese',
          contactType: 'Agendamento e atendimento',
          email: SITE_CONFIG.contact.email,
          telephone: SITE_CONFIG.contact.phoneHref,
        },
        description: SITE_CONFIG.description,

        email: SITE_CONFIG.contact.email,
        employee: {
          '@id': `${siteUrl}#davi-faria`,
        },

        founder: {
          '@id': `${siteUrl}#davi-faria`,
        },

        image: imageUrl,

        name: SITE_CONFIG.name,

        potentialAction: {
          '@type': 'ReserveAction',
          name: SITE_CONFIG.agenda.text,
          target: {
            '@type': 'EntryPoint',
            actionPlatform: [
              'https://schema.org/DesktopWebPlatform',
              'https://schema.org/MobileWebPlatform',
            ],
            urlTemplate: SITE_CONFIG.agenda.href,
          },
        },

        telephone: SITE_CONFIG.contact.phoneHref,

        url: siteUrl,
      },

      {
        '@id': `${siteUrl}#davi-faria`,
        '@type': 'Person',

        description: SITE_CONFIG.professional.manifesto,
        email: SITE_CONFIG.contact.email,
        image: imageUrl,
        jobTitle: SITE_CONFIG.professional.title,
        knowsAbout: [
          'Fisioterapia cardiorrespiratória',
          'Reabilitação cardiorrespiratória',
          'Fisioterapia respiratória',
          'Reabilitação pulmonar',
          'Qualidade de vida',
        ],

        name: SITE_CONFIG.professional.name,
        telephone: SITE_CONFIG.contact.phoneHref,

        url: siteUrl,

        workLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'BR',
            addressLocality: 'Mococa',
            addressRegion: 'SP',
          },

          name: SITE_CONFIG.contact.location,
        },

        worksFor: {
          '@id': `${siteUrl}#physiotherapy`,
        },
      },

      {
        '@id': `${siteUrl}#website`,
        '@type': 'WebSite',

        alternateName: SITE_CONFIG.professional.name,
        description: SITE_CONFIG.description,
        inLanguage: 'pt-BR',
        name: SITE_CONFIG.name,
        publisher: {
          '@id': `${siteUrl}#physiotherapy`,
        },

        url: siteUrl,
      },

      {
        '@id': `${siteUrl}#webpage`,
        '@type': 'WebPage',

        about: [
          {
            '@id': `${siteUrl}#physiotherapy`,
          },
          {
            '@id': `${siteUrl}#davi-faria`,
          },
        ],
        description: SITE_CONFIG.description,
        inLanguage: 'pt-BR',
        isPartOf: {
          '@id': `${siteUrl}#website`,
        },

        name: SITE_CONFIG.title,

        primaryImageOfPage: {
          '@type': 'ImageObject',
          height: 630,
          url: imageUrl,
          width: 1200,
        },

        url: siteUrl,
      },
    ],
  };

  return (
    <html
      className={`${geistSans.variable} ${spaceGrotesk.variable} ${montserratAlternates.variable} h-full antialiased`}
      lang="pt-BR"
    >
      <body className="flex min-h-screen flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
          type="application/ld+json"
        />

        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
