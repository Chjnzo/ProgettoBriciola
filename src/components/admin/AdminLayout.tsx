import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { Images, Mail, LogOut, Home } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'

const navItems = [
  { to: '/admin/carica',   icon: Images, label: 'Carica Foto' },
  { to: '/admin/messaggi', icon: Mail,   label: 'Messaggi' },
]

export function AdminLayout() {
  const { isAdmin, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-lora text-ink-light text-xl animate-pulse">Caricamento…</p>
      </div>
    )
  }

  if (!isAdmin) return <Navigate to="/admin/login" replace />

  return (
    <div className="min-h-screen bg-sand flex flex-col">
      {/* Header admin */}
      <header className="bg-ink text-cream px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <span className="font-display font-bold text-xl text-cream">Progetto Briciola</span>
          <span className="font-sans text-[0.72rem] tracking-[.14em] uppercase text-terra-light bg-terra/30 px-2 py-0.5 rounded-sm">
            Area Riservata
          </span>
        </div>
        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className="font-sans text-sm text-cream/60 hover:text-cream transition-colors flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Sito pubblico</span>
          </NavLink>
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="border-cream/20 text-cream hover:bg-white/10 hover:text-cream font-sans text-sm gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            Esci
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-56 bg-white border-r border-sand-dark shrink-0 py-6 hidden sm:block">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-4 font-sans font-semibold text-base transition-colors ${
                  isActive
                    ? 'bg-terra/10 text-terra border-r-2 border-terra'
                    : 'text-ink-light hover:bg-sand hover:text-ink'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile bottom nav */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-sand-dark flex z-40">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-3 font-sans text-xs font-semibold transition-colors ${
                  isActive ? 'text-terra' : 'text-ink-light'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Contenuto */}
        <main className="flex-1 p-6 sm:p-10 pb-24 sm:pb-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
