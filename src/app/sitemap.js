import { MetadataRoute } from 'next';

export default function sitemap() {
  const base = 'https://snaptik-din.vercel.app';
  return [
    { url: base,             lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/terms`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/dmca`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];
}
