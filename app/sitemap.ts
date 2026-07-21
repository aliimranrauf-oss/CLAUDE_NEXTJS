import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    // Core & High-Priority Pages
    {
      url: 'https://www.makemystore.online/',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      // ── NEW: Website Speed Optimization service page ──────────────────
      url: 'https://www.makemystore.online/website-speed-optimization',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // Service Pages (0.8)
    {
      url: 'https://www.makemystore.online/how-it-works',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.makemystore.online/space',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.makemystore.online/tools',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.makemystore.online/pricing',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.makemystore.online/blog',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    {
      url: 'https://www.makemystore.online/pk',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.makemystore.online/ar/badil-salla-zid',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Core Pages (0.5)
    {
      url: 'https://www.makemystore.online/about',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.makemystore.online/contact',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    // Legal Pages (0.3)
    {
      url: 'https://www.makemystore.online/privacy',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://www.makemystore.online/terms',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
