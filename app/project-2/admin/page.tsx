import type { Metadata } from 'next'
import AdminGate from './AdminGate'

export const metadata: Metadata = {
  title: 'Admin — Project-2 Content Editor',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminGate />
}
