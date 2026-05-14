import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/chi-siamo',        label: 'Chi siamo' },
  { to: '/cosa-facciamo',    label: 'Cosa facciamo' },
  { to: '/cosa-puoi-fare-tu', label: 'Come aiutare' },
  { to: '/etiopia',          label: "L'Etiopia" },
  { to: '/gallery-video',    label: 'Gallery & Video' },
  { to: '/contatti',         label: 'Contatti' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream/95 backdrop-blur-sm shadow-[0_1px_0_rgba(42,30,20,.1)] text-ink'
          : 'bg-transparent text-cream'
      )}
      role="banner"
    >
      <a href="#main-content" className="skip-to-content">
        Vai al contenuto
      </a>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif font-bold text-lg hover:opacity-80 transition-opacity"
            aria-label="Progetto Briciola Onlus — homepage"
          >
            Progetto Briciola
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navigazione principale">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-sans text-[.85rem] font-semibold tracking-[.08em] uppercase transition-opacity hover:opacity-70 ${
                    isActive ? 'opacity-100 border-b border-current pb-0.5' : 'opacity-90'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Mobile menu */}
          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/cosa-puoi-fare-tu">Dona ora</Link>
            </Button>

            {/* Mobile hamburger */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden p-2 rounded-sm hover:opacity-70 transition-opacity"
                  aria-label="Apri menu di navigazione"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Progetto Briciola</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-6 pt-6" aria-label="Navigazione mobile">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `font-sans text-[.9rem] font-semibold tracking-[.08em] uppercase py-3 border-b border-sand-dark transition-opacity hover:opacity-70 ${
                          isActive ? 'text-terra' : 'text-ink'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <Button asChild className="mt-6">
                    <Link to="/cosa-puoi-fare-tu" onClick={() => setOpen(false)}>
                      Dona ora
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
