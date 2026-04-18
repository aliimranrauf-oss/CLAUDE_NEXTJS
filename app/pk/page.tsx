import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UrduStoreClient from '@/components/UrduStoreClient'

export default function PakistanUrduPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" dir="rtl" lang="ur">
        <UrduStoreClient />
      </main>
      <Footer />
    </>
  )
}
