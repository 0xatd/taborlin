import type { MetadataRoute } from 'next';
import { updates } from './data/updates';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://taborlin.co';

  const sortedUpdates = [...updates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const latestUpdateDate = sortedUpdates[0]?.date
    ? new Date(sortedUpdates[0].date)
    : new Date();

  const updateEntries: MetadataRoute.Sitemap = sortedUpdates.map((post) => ({
    url: `${baseUrl}/updates/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: latestUpdateDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: latestUpdateDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...updateEntries,
  ];
}
