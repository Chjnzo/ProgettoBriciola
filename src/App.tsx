import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Home from '@/pages/Home'
import ChiSiamo from '@/pages/ChiSiamo'
import CosaFacciamo from '@/pages/CosaFacciamo'
import CosaPuoiFareTu from '@/pages/CosaPuoiFareTu'
import Etiopia from '@/pages/Etiopia'
import Contatti from '@/pages/Contatti'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout({ children }: { children: React.ReactNode }) {
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
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/chi-siamo" element={<PublicLayout><ChiSiamo /></PublicLayout>} />
        <Route path="/cosa-facciamo" element={<PublicLayout><CosaFacciamo /></PublicLayout>} />
        <Route path="/cosa-puoi-fare-tu" element={<PublicLayout><CosaPuoiFareTu /></PublicLayout>} />
        <Route path="/etiopia" element={<PublicLayout><Etiopia /></PublicLayout>} />
        <Route path="/contatti" element={<PublicLayout><Contatti /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
