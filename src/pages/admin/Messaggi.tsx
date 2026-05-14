import { useEffect, useState } from 'react'
import { Mail, MailOpen, Trash2 } from 'lucide-react'
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
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function Messaggi() {
  const [messaggi, setMessaggi] = useState<Messaggio[]>([])
  const [loading, setLoading] = useState(true)
  const [aperto, setAperto] = useState<string | null>(null)

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
    if (!confirm('Vuoi eliminare questo messaggio? L\'operazione non è reversibile.')) return
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

  const nonLetti = messaggi.filter(m => !m.letto).length

  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-2">
          Messaggi ricevuti
        </h1>
        <p className="font-lora text-ink-light text-lg">
          {loading ? '…' : (
            nonLetti > 0
              ? `${nonLetti} messaggio${nonLetti > 1 ? 'i' : ''} non letto${nonLetti > 1 ? 'i' : ''}`
              : 'Tutti i messaggi sono stati letti'
          )}
        </p>
      </div>

      {loading ? (
        <p className="font-lora text-ink-light/50 animate-pulse py-8">Caricamento messaggi…</p>
      ) : messaggi.length === 0 ? (
        <div className="bg-white rounded-sm p-12 text-center shadow-sm">
          <Mail className="w-12 h-12 text-ink-light/30 mx-auto mb-4" strokeWidth={1} />
          <p className="font-lora text-ink-light text-lg">Nessun messaggio ricevuto.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messaggi.map(msg => (
            <div key={msg.id} className={`bg-white rounded-sm shadow-sm overflow-hidden border-l-4 ${msg.letto ? 'border-sand-dark' : 'border-terra'}`}>
              {/* Riga riassuntiva */}
              <button
                onClick={() => apriMessaggio(msg)}
                className="w-full flex items-start gap-4 p-6 text-left hover:bg-sand/50 transition-colors"
              >
                <div className="shrink-0 mt-0.5">
                  {msg.letto
                    ? <MailOpen className="w-5 h-5 text-ink-light/40" />
                    : <Mail className="w-5 h-5 text-terra" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className={`font-sans font-bold text-base ${msg.letto ? 'text-ink-light' : 'text-ink'}`}>
                      {msg.nome}
                    </span>
                    <span className="font-lora text-ink-light/60 text-sm">{msg.email}</span>
                    <span className="font-sans text-xs text-ink-light/40 ml-auto shrink-0">
                      {formatData(msg.created_at)}
                    </span>
                  </div>
                  <p className={`font-lora text-base mt-1 truncate ${msg.letto ? 'text-ink-light/70' : 'text-ink'}`}>
                    {msg.oggetto}
                  </p>
                </div>
              </button>

              {/* Corpo messaggio espanso */}
              {aperto === msg.id && (
                <div className="px-6 pb-6 border-t border-sand-dark pt-5">
                  <div className="bg-sand rounded-sm p-5 mb-4">
                    <p className="font-lora text-ink text-base leading-relaxed whitespace-pre-wrap">
                      {msg.messaggio}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.oggetto)}`}
                      className="inline-flex items-center gap-2 bg-terra hover:bg-terra-dark text-cream font-sans font-semibold text-sm px-5 py-2.5 rounded-sm transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Rispondi via email
                    </a>
                    <button
                      onClick={() => elimina(msg.id)}
                      className="inline-flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 font-sans font-semibold text-sm px-5 py-2.5 rounded-sm transition-colors"
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
