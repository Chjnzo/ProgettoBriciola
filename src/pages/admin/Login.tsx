import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Login() {
  const { isAdmin, loading, signIn } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
    <div className="min-h-screen bg-sand flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-display font-bold text-3xl text-ink mb-2">Progetto Briciola</p>
          <p className="font-lora text-ink-light text-lg">Area riservata ai gestori</p>
        </div>

        <div className="bg-white rounded-sm shadow-md p-8 sm:p-12">
          <h1 className="font-display text-2xl text-ink mb-8 text-center">Accedi</h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block font-sans text-base font-semibold text-ink"
              >
                Indirizzo email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nome@esempio.it"
                autoComplete="email"
                className="text-lg py-4 h-auto"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-sans text-base font-semibold text-ink"
              >
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
                  className="text-lg py-4 h-auto pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  aria-label={showPw ? 'Nascondi password' : 'Mostra password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink transition-colors p-1"
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3">
                <p className="font-lora text-red-700 text-base">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={submitting || !email || !password}
              className="w-full bg-terra hover:bg-terra-dark text-cream font-sans font-bold text-lg tracking-wide py-4 h-auto rounded-sm transition-all disabled:opacity-50"
            >
              <LogIn className="w-5 h-5 mr-2" />
              {submitting ? 'Accesso in corso…' : 'Entra'}
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 font-lora text-ink-light/60 text-sm">
          Accesso riservato ai gestori di Progetto Briciola
        </p>
      </div>
    </div>
  )
}
