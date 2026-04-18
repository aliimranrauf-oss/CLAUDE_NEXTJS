// app/tools/page.tsx
import type { Metadata } from 'next'
import ToolsClient from './ToolsClient'

export const metadata: Metadata = {
  title: '7 Free Ecommerce Tools for Store Owners | MakeMyStore',
  description:
    'Free ecommerce tools: Store Audit, Shopify Cost Calculator, Profit Calculator, Product Page Analyzer, Fake Store Checker, Store Name Generator & Speed Checker. No signup required.',
  keywords: [
    // High-intent tool-specific
    'free store audit tool',
    'shopify cost calculator free',
    'ecommerce profit calculator',
    'product page analyzer tool',
    'fake store checker online',
    'ecommerce store name generator',
    'website speed checker ecommerce',
    // Broader SEO terms
    'free ecommerce tools',
    'online store tools free',
    'ecommerce business tools',
    'shopify alternatives calculator',
    'is this store legit checker',
    'dropshipping profit calculator',
    'store name ideas generator',
    'ecommerce seo audit free',
  ],
  alternates: { canonical: 'https://www.makemystore.online/tools' },
  openGraph: {
    title: '7 Free Ecommerce Tools for Store Owners | MakeMyStore',
    description:
      'Free tools to audit, analyze, and grow your ecommerce store. No signup needed. Run SEO audits, calculate real profits, check for fake stores, and more.',
    url: 'https://www.makemystore.online/tools',
    type: 'website',
    siteName: 'MakeMyStore',
    images: [
      {
        url: 'https://www.makemystore.online/og-tools.png', // create a 1200x630 OG image for this page
        width: 1200,
        height: 630,
        alt: '7 Free Ecommerce Tools by MakeMyStore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '7 Free Ecommerce Tools for Store Owners',
    description:
      'Free tools to audit, analyze & grow your ecommerce store. No signup. Store Audit, Profit Calculator, Fake Store Checker & more.',
    images: ['https://www.makemystore.online/og-tools.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

// JSON-LD Structured Data for Google rich results
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.makemystore.online/tools',
      url: 'https://www.makemystore.online/tools',
      name: '7 Free Ecommerce Tools for Store Owners | MakeMyStore',
      description:
        'Free ecommerce tools including Store Audit, Shopify Cost Calculator, Profit Calculator, Product Page Analyzer, Fake Store Checker, Store Name Generator, and Speed Checker.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.makemystore.online',
        url: 'https://www.makemystore.online',
        name: 'MakeMyStore',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.makemystore.online',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Free Tools',
            item: 'https://www.makemystore.online/tools',
          },
        ],
      },
    },
    {
      '@type': 'ItemList',
      name: 'Free Ecommerce Tools',
      description: '7 free tools to help ecommerce store owners audit, analyze, and grow.',
      url: 'https://www.makemystore.online/tools',
      numberOfItems: 7,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Store Audit Tool',
            description:
              'Get an instant SEO, speed & trust score for any ecommerce store URL. Free, no signup required.',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            url: 'https://www.makemystore.online/tools#store-audit',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Shopify Cost Calculator',
            description:
              'Calculate exactly how much Shopify costs per year vs a one-time custom build. Free ecommerce cost comparison tool.',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            url: 'https://www.makemystore.online/tools#shopify-cost',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Profit Calculator',
            description:
              'Calculate your real ecommerce profit after product cost, ad spend, and platform fees. Free dropshipping profit calculator.',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            url: 'https://www.makemystore.online/tools#profit-calculator',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Product Page Analyzer',
            description:
              'Paste your product description and get an instant conversion score with actionable feedback. Free product page analysis tool.',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            url: 'https://www.makemystore.online/tools#product-page-analyzer',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Fake Store Checker',
            description:
              'Detect red flags in any online store URL before you buy or partner. Free scam store detection tool.',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            url: 'https://www.makemystore.online/tools#fake-store-checker',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
        },
        {
          '@type': 'ListItem',
          position: 6,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Store Name Generator',
            description:
              'Generate brandable, memorable names for your ecommerce store instantly. Free business name generator for online stores.',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            url: 'https://www.makemystore.online/tools#store-name-generator',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
        },
        {
          '@type': 'ListItem',
          position: 7,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Speed Checker',
            description:
              'Simulate a performance audit and see if your store speed is costing you sales. Free ecommerce speed test tool.',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            url: 'https://www.makemystore.online/tools#speed-checker',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are all the ecommerce tools on MakeMyStore free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, all 7 tools are completely free to use. No signup, no credit card, and no hidden fees required.',
          },
        },
        {
          '@type': 'Question',
          name: 'What tools does MakeMyStore offer for ecommerce store owners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MakeMyStore offers 7 free tools: Store Audit Tool, Shopify Cost Calculator, Profit Calculator, Product Page Analyzer, Fake Store Checker, Store Name Generator, and Speed Checker.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I check if an online store is fake or a scam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use the free Fake Store Checker on MakeMyStore. Enter any store URL and it will instantly detect red flags like suspicious domain age, missing contact info, or copied content.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I calculate profit for my dropshipping store?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use the free Profit Calculator on MakeMyStore. Enter your product cost, selling price, ad spend, and platform fees to see your real net profit per order.',
          },
        },
      ],
    },
  ],
}

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolsClient />
    </>
  )
}
