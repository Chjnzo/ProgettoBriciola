import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/auth'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AdminLayout } from '@/components/admin/AdminLayout'
import Home from '@/pages/Home'
import ChiSiamo from '@/pages/ChiSiamo'
import CosaFacciamo from '@/pages/CosaFacciamo'
import CosaPuoiFareTu from '@/pages/CosaPuoiFareTu'
import Etiopia from '@/pages/Etiopia'
import GalleryVideo from '@/pages/GalleryVideo'
import Contatti from '@/pages/Contatti'
import Login from '@/pages/admin/Login'
import CaricaImmagini from '@/pages/admin/CaricaImmagini'
import Messaggi from '@/pages/admin/Messaggi'

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
      <AuthProvider>
        <Toaster position="bottom-right" richColors />
        <ScrollToTop />
        <Routes>
          {/* ── Sito pubblico ─────────────────────────────────────────────── */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/chi-siamo" element={<PublicLayout><ChiSiamo /></PublicLayout>} />
          <Route path="/cosa-facciamo" element={<PublicLayout><CosaFacciamo /></PublicLayout>} />
          <Route path="/cosa-puoi-fare-tu" element={<PublicLayout><CosaPuoiFareTu /></PublicLayout>} />
          <Route path="/etiopia" element={<PublicLayout><Etiopia /></PublicLayout>} />
          <Route path="/gallery-video" element={<PublicLayout><GalleryVideo /></PublicLayout>} />
          <Route path="/contatti" element={<PublicLayout><Contatti /></PublicLayout>} />

          {/* ── Area admin ─────────────────────────────────────────────────── */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/carica" replace />} />
            <Route path="carica" element={<CaricaImmagini />} />
            <Route path="messaggi" element={<Messaggi />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
