import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { Images, Mail, LogOut, Home } from 'lucide-react'
import { useAuth } from '@/lib/auth'

const navItems = [
  { to: '/admin/carica',   icon: Images, label: 'Foto & Missioni' },
  { to: '/admin/messaggi', icon: Mail,   label: 'Messaggi' },
]

export function AdminLayout() {
  const { isAdmin, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-terra border-t-transparent animate-spin" />
          <p className="font-sans text-cream/40 text-xs tracking-[.2em] uppercase">Caricamento</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) return <Navigate to="/admin/login" replace />

  return (
    <div className="min-h-screen bg-zinc-100 flex">

      {/* ── Sidebar desktop ──────────────────────────────────────────────────── */}
      <aside className="w-60 bg-ink shrink-0 hidden sm:flex flex-col sticky top-0 h-screen">
        {/* Brand */}
        <div className="px-6 pt-7 pb-6 border-b border-white/10">
          <p className="font-display font-bold text-lg text-cream leading-tight">Progetto Briciola</p>
          <span className="inline-block mt-1.5 font-sans text-[0.6rem] tracking-[.16em] uppercase text-terra-light bg-terra/25 px-2 py-0.5 rounded">
            Area Riservata
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-5 px-3 space-y-0.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans font-semibold text-sm transition-all ${
                  isActive
                    ? 'bg-terra text-cream shadow-md shadow-terra/30'
                    : 'text-cream/55 hover:bg-white/8 hover:text-cream'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5 pt-3 border-t border-white/10 space-y-0.5">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans text-sm text-cream/45 hover:bg-white/8 hover:text-cream transition-all"
          >
            <Home className="w-4 h-4 shrink-0" />
            Sito pubblico
          </NavLink>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-sans text-sm text-cream/45 hover:bg-red-500/15 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Esci dall'area admin
          </button>
        </div>
      </aside>

      {/* ── Contenuto principale ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header solo mobile */}
        <header className="sm:hidden bg-ink text-cream px-5 py-4 flex items-center justify-between">
          <p className="font-display font-bold text-lg">Progetto Briciola</p>
          <button
            onClick={signOut}
            aria-label="Esci"
            className="p-2 text-cream/50 hover:text-cream transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </header>

        <main className="flex-1 p-6 sm:p-10 pb-24 sm:pb-10 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* ── Nav mobile bottom ─────────────────────────────────────────────────── */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-ink border-t border-white/10 flex z-40">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-3 font-sans text-[0.65rem] font-semibold transition-colors ${
                isActive ? 'text-terra' : 'text-cream/45'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
        <NavLink
          to="/"
          className="flex-1 flex flex-col items-center gap-1 py-3 font-sans text-[0.65rem] font-semibold text-cream/45"
        >
          <Home className="w-5 h-5" />
          Sito
        </NavLink>
      </nav>
    </div>
  )
}
