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
      url: 'https://www.makemystore.online/ar/badil-salla-zid',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: 'https://www.makemystore.online/',
          ar: 'https://www.makemystore.online/ar/badil-salla-zid',
        },
      },
    },

    {
      url: 'https://www.makemystore.online/pk/online-store-pakistan',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: 'https://www.makemystore.online/',
          ur: 'https://www.makemystore.online/pk/online-store-pakistan',
        },
      },
    },

    // Service Pages (0.8)
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
