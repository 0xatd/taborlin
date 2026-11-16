import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://taborlin.co';

  return [
    { url: `${baseUrl}/orpg`, changeFrequency: 'monthly', priority: 0.7 },
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
