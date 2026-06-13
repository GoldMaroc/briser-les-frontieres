import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin-blf/', '/espace/', '/api/'],
    },
    sitemap: 'https://www.briserlesfrontieres.fr/sitemap.xml',
  };
}
