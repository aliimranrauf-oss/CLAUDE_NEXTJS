import Navbar from '@/components/Navbar' // Adjust this path if your components are in a different folder
import Footer from '@/components/Footer'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
