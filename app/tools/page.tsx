// app/tools/page.tsx
import type { Metadata } from 'next'
import ToolsClient from './ToolsClient'

export const metadata: Metadata = {
  title: '8 Free Ecommerce Tools for Store Owners | MakeMyStore',
  description:
    'Free ecommerce tools: Store Audit, Shopify Cost Calculator, Profit Calculator, Product Page Analyzer, Fake Store Checker, Store Name Generator & Speed Checker. No signup required.',
  keywords: [
    'free ecommerce tools',
    'store audit tool',
    'shopify cost calculator',
    'profit calculator ecommerce',
    'fake store checker',
    'store name generator',
    'ecommerce speed checker',
  ],
  alternates: { canonical: 'https://www.makemystore.online/tools' },
  openGraph: {
    title: '8 Free Ecommerce Tools for Store Owners | MakeMyStore',
    description: 'Free tools to audit, compare, and grow your ecommerce store. No signup needed.',
    url: 'https://www.makemystore.online/tools',
    type: 'website',
  },
}

export default function ToolsPage() {
  return <ToolsClient />
}
