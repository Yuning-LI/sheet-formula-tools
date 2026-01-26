import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    // 注意：这里也要换成你的正式域名
    sitemap: 'https://www.excelformulagenerator.net/sitemap.xml',
  };
}