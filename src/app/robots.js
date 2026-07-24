import { MetadataRoute } from 'next';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://snaptik-din.vercel.app/sitemap.xml',
  };
}
