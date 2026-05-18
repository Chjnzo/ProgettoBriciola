import { useEffect, useState } from 'react'
import { Mail, MailOpen, Trash2, Reply, Inbox, Clock, CircleDot } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

interface Messaggio {
  id: string
  nome: string
  email: string
  oggetto: string
  messaggio: string
  letto: boolean
  created_at: string
}

function formatData(iso: string) {
  return new Date(iso).toLocaleDateString('it-IT', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function iniziali(nome: string) {
  return nome.trim().split(' ').slice(0, 2).map(p => p[0]?.toUpperCase() ?? '').join('')
}

function avatarBg(nome: string) {
  const colors = [
    'bg-terra/20 text-terra-dark',
    'bg-gold/20 text-amber-700',
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-violet-100 text-violet-700',
  ]
  const i = nome.charCodeAt(0) % colors.length
  return colors[i]
}

export default function Messaggi() {
  const [messaggi, setMessaggi] = useState<Messaggio[]>([])
  const [loading, setLoading]   = useState(true)
  const [aperto, setAperto]     = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('contatti')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setMessaggi(data ?? [])
        setLoading(false)
      })
  }, [])

  async function segnaLetto(msg: Messaggio) {
    if (msg.letto) return
    await supabase.from('contatti').update({ letto: true }).eq('id', msg.id)
    setMessaggi(prev => prev.map(m => m.id === msg.id ? { ...m, letto: true } : m))
  }

  async function elimina(id: string) {
    if (!confirm('Eliminare questo messaggio? L\'operazione non è reversibile.')) return
    const { error } = await supabase.from('contatti').delete().eq('id', id)
    if (error) { toast.error('Errore nell\'eliminazione.'); return }
    setMessaggi(prev => prev.filter(m => m.id !== id))
    if (aperto === id) setAperto(null)
    toast.success('Messaggio eliminato.')
  }

  function apriMessaggio(msg: Messaggio) {
    setAperto(aperto === msg.id ? null : msg.id)
    segnaLetto(msg)
  }

  const nonLetti    = messaggi.filter(m => !m.letto).length
  const oggi        = new Date().toDateString()
  const ricevutiOggi = messaggi.filter(m => new Date(m.created_at).toDateString() === oggi).length

  return (
    <div className="max-w-3xl">

      {/* ── Titolo ──────────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="font-display text-3xl text-ink mb-1">Messaggi</h1>
        <p className="font-sans text-sm text-zinc-500">
          Messaggi ricevuti dal form di contatto del sito
        </p>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
          <div className="flex items-center gap-2 mb-2">
            <Inbox className="w-4 h-4 text-zinc-400" />
            <span className="font-sans text-xs text-zinc-400 uppercase tracking-wider">Totali</span>
          </div>
          <p className="font-display text-3xl text-ink">{loading ? '—' : messaggi.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
          <div className="flex items-center gap-2 mb-2">
            <CircleDot className="w-4 h-4 text-terra" />
            <span className="font-sans text-xs text-zinc-400 uppercase tracking-wider">Non letti</span>
          </div>
          <p className="font-display text-3xl text-terra">{loading ? '—' : nonLetti}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span className="font-sans text-xs text-zinc-400 uppercase tracking-wider">Oggi</span>
          </div>
          <p className="font-display text-3xl text-ink">{loading ? '—' : ricevutiOggi}</p>
        </div>
      </div>

      {/* ── Lista ───────────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-zinc-100 animate-pulse">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-zinc-100 rounded w-1/3" />
                  <div className="h-3 bg-zinc-100 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : messaggi.length === 0 ? (
        <div className="bg-white rounded-xl p-16 text-center shadow-sm border border-zinc-100">
          <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-zinc-300" strokeWidth={1.5} />
          </div>
          <p className="font-sans font-semibold text-ink mb-1">Nessun messaggio</p>
          <p className="font-sans text-sm text-zinc-400">I messaggi inviati dal sito appariranno qui.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {messaggi.map(msg => (
            <div
              key={msg.id}
              className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
                msg.letto ? 'border-zinc-100' : 'border-terra/30 shadow-terra/5'
              }`}
            >
              {/* Riga riassuntiva */}
              <button
                onClick={() => apriMessaggio(msg)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-zinc-50 transition-colors"
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-sans font-bold text-sm shrink-0 ${avatarBg(msg.nome)}`}>
                  {iniziali(msg.nome)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {!msg.letto && (
                      <span className="w-2 h-2 rounded-full bg-terra shrink-0" />
                    )}
                    <span className={`font-sans font-semibold text-sm ${msg.letto ? 'text-zinc-600' : 'text-ink'}`}>
                      {msg.nome}
                    </span>
                    <span className="font-sans text-xs text-zinc-400 truncate hidden sm:block">
                      {msg.email}
                    </span>
                  </div>
                  <p className={`font-sans text-sm truncate ${msg.letto ? 'text-zinc-400' : 'text-ink-light'}`}>
                    {msg.oggetto}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <span className="font-sans text-xs text-zinc-400 hidden sm:block">
                    {formatData(msg.created_at)}
                  </span>
                  {msg.letto
                    ? <MailOpen className="w-4 h-4 text-zinc-300" />
                    : <Mail className="w-4 h-4 text-terra" />
                  }
                </div>
              </button>

              {/* Corpo espanso */}
              {aperto === msg.id && (
                <div className="px-5 pb-5 border-t border-zinc-100">
                  <div className="sm:hidden font-sans text-xs text-zinc-400 pt-3 pb-2">
                    {msg.email} · {formatData(msg.created_at)}
                  </div>
                  <div className="bg-zinc-50 rounded-lg p-5 my-4">
                    <p className="font-lora text-ink text-base leading-relaxed whitespace-pre-wrap">
                      {msg.messaggio}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.oggetto)}`}
                      className="inline-flex items-center gap-2 bg-terra hover:bg-terra-dark text-cream font-sans font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      <Reply className="w-4 h-4" />
                      Rispondi
                    </a>
                    <button
                      onClick={() => elimina(msg.id)}
                      className="inline-flex items-center gap-2 text-red-500 hover:bg-red-50 border border-red-200 font-sans font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Elimina
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
