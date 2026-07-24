import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE_URL.toString(),
    rules: {
      allow: '/',
      userAgent: '*',
    },
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
  };
}
