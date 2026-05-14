import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Home from '@/pages/Home'
import ChiSiamo from '@/pages/ChiSiamo'
import CosaFacciamo from '@/pages/CosaFacciamo'
import CosaPuoiFareTu from '@/pages/CosaPuoiFareTu'
import Etiopia from '@/pages/Etiopia'
import GalleryVideo from '@/pages/GalleryVideo'
import Contatti from '@/pages/Contatti'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/chi-siamo" element={<Layout><ChiSiamo /></Layout>} />
        <Route path="/cosa-facciamo" element={<Layout><CosaFacciamo /></Layout>} />
        <Route path="/cosa-puoi-fare-tu" element={<Layout><CosaPuoiFareTu /></Layout>} />
        <Route path="/etiopia" element={<Layout><Etiopia /></Layout>} />
        <Route path="/gallery-video" element={<Layout><GalleryVideo /></Layout>} />
        <Route path="/contatti" element={<Layout><Contatti /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
