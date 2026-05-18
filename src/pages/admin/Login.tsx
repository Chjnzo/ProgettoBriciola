import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn, Lock } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { Input } from '@/components/ui/input'

export default function Login() {
  const { isAdmin, loading, signIn } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && isAdmin) return <Navigate to="/admin/carica" replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error: err } = await signIn(email, password)
    setSubmitting(false)
    if (err) {
      setError('Email o password non corretti. Riprova.')
    } else {
      navigate('/admin/carica', { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Pannello sinistro — branding ─────────────────────────────────────── */}
      <div
        className="hidden lg:flex w-[46%] shrink-0 flex-col justify-between p-14 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(193,102,58,0.5) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 15%, rgba(212,168,71,0.15) 0%, transparent 45%),
            linear-gradient(175deg, #100a05 0%, #2A1E14 60%, #1a0f08 100%)
          `,
        }}
      >
        <div>
          <p className="font-sans text-[0.7rem] font-semibold tracking-[.18em] uppercase text-terra-light mb-6">
            Area Riservata
          </p>
          <p className="font-display font-bold text-4xl text-cream leading-tight mb-4">
            Progetto Briciola
          </p>
          <p className="font-lora text-cream/60 text-lg leading-relaxed max-w-xs">
            Gestisci le foto delle missioni e i messaggi ricevuti dal sito.
          </p>
        </div>

        <p className="font-sans text-xs text-cream/25 tracking-wide">
          Accesso riservato ai gestori dell'associazione
        </p>
      </div>

      {/* ── Pannello destro — form ───────────────────────────────────────────── */}
      <div className="flex-1 bg-zinc-50 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">

          {/* Header mobile */}
          <div className="lg:hidden text-center mb-10">
            <p className="font-display font-bold text-3xl text-ink mb-1">Progetto Briciola</p>
            <p className="font-lora text-ink-light">Area riservata ai gestori</p>
          </div>

          {/* Icona */}
          <div className="w-12 h-12 rounded-xl bg-terra/10 flex items-center justify-center mb-8">
            <Lock className="w-5 h-5 text-terra" />
          </div>

          <h1 className="font-display text-2xl text-ink mb-1">Bentornato</h1>
          <p className="font-lora text-ink-light mb-8">Inserisci le tue credenziali per accedere.</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block font-sans text-sm font-semibold text-ink">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nome@esempio.it"
                autoComplete="email"
                className="h-11 bg-white border-zinc-200 focus:border-terra"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block font-sans text-sm font-semibold text-ink">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-11 bg-white border-zinc-200 focus:border-terra pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  aria-label={showPw ? 'Nascondi password' : 'Mostra password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-ink transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="font-sans text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !email || !password}
              className="w-full flex items-center justify-center gap-2 bg-terra hover:bg-terra-dark text-cream font-sans font-semibold text-sm tracking-wide py-3 rounded-lg transition-all disabled:opacity-50 mt-2 shadow-md shadow-terra/20"
            >
              <LogIn className="w-4 h-4" />
              {submitting ? 'Accesso in corso…' : 'Accedi'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
