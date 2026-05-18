import { useRef, useState, useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import {
  Upload, Trash2, ImagePlus, CheckCircle2, AlertCircle,
  Plus, X, FolderPlus, FolderX, ChevronDown, Save, Pencil,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'

// ── Tipi ──────────────────────────────────────────────────────────────────────
interface Sezione {
  id: string
  value: string
  label: string
  sort_order: number
  sottotitolo: string | null
  data_partenza: string | null
  data_rientro: string | null
  volontari: string | null
  descrizione: string | null
}

interface ImmagineCaricata {
  id: string
  storage_path: string
  gallery_section: string
  descrizione: string | null
  sort_order: number
  created_at: string
  url: string
}

interface FileInCoda {
  file: File
  preview: string
  stato: 'attesa' | 'caricamento' | 'fatto' | 'errore'
  progresso: number
}

function toSlug(label: string) {
  return label
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// ── Form descrizione missione ─────────────────────────────────────────────────
function FormDescrizioneMissione({
  sezione,
  onSaved,
}: {
  sezione: Sezione
  onSaved: (updated: Sezione) => void
}) {
  const [aperto, setAperto]           = useState(false)
  const [salvando, setSalvando]       = useState(false)
  const [sottotitolo, setSottotitolo] = useState(sezione.sottotitolo ?? '')
  const [dataPartenza, setDataPartenza] = useState(sezione.data_partenza ?? '')
  const [dataRientro, setDataRientro]   = useState(sezione.data_rientro ?? '')
  const [volontari, setVolontari]       = useState(sezione.volontari ?? '')
  const [descrizione, setDescrizione]   = useState(sezione.descrizione ?? '')

  // Aggiorna i campi locali quando cambia la sezione selezionata
  useEffect(() => {
    setSottotitolo(sezione.sottotitolo ?? '')
    setDataPartenza(sezione.data_partenza ?? '')
    setDataRientro(sezione.data_rientro ?? '')
    setVolontari(sezione.volontari ?? '')
    setDescrizione(sezione.descrizione ?? '')
  }, [sezione.id])

  const hasDati = sezione.sottotitolo || sezione.data_partenza || sezione.volontari || sezione.descrizione

  async function salva() {
    setSalvando(true)
    const { data, error } = await supabase
      .from('sezioni')
      .update({
        sottotitolo:   sottotitolo.trim()   || null,
        data_partenza: dataPartenza.trim()  || null,
        data_rientro:  dataRientro.trim()   || null,
        volontari:     volontari.trim()     || null,
        descrizione:   descrizione.trim()   || null,
      })
      .eq('id', sezione.id)
      .select()
      .single()

    setSalvando(false)

    if (error) { toast.error('Errore nel salvataggio.'); return }
    toast.success('Informazioni missione salvate!')
    setAperto(false)
    onSaved(data as Sezione)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
      {/* Header collassabile */}
      <button
        onClick={() => setAperto(v => !v)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Pencil className="w-4 h-4 text-terra shrink-0" />
          <span className="font-sans font-semibold text-sm text-ink">
            Descrizione missione
          </span>
          {hasDati && !aperto && (
            <span className="font-sans text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              compilata
            </span>
          )}
          {!hasDati && !aperto && (
            <span className="font-sans text-xs text-zinc-400">
              nessuna info aggiunta
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform ${aperto ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Form espanso */}
      {aperto && (
        <div className="px-6 pb-6 border-t border-zinc-100 pt-5 space-y-4">
          <p className="font-sans text-xs text-zinc-400">
            Queste informazioni vengono mostrate sul sito sopra le foto della sezione.
          </p>

          <div className="space-y-1.5">
            <label className="block font-sans text-sm font-semibold text-ink">
              Sottotitolo
            </label>
            <Input
              value={sottotitolo}
              onChange={e => setSottotitolo(e.target.value)}
              placeholder="Es. Missione umanitaria in Etiopia — Villaggio di Hured"
              className="h-10 bg-zinc-50 border-zinc-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block font-sans text-sm font-semibold text-ink">
                Data partenza
              </label>
              <Input
                value={dataPartenza}
                onChange={e => setDataPartenza(e.target.value)}
                placeholder="Es. 5 febbraio 2014"
                className="h-10 bg-zinc-50 border-zinc-200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-sans text-sm font-semibold text-ink">
                Data rientro
              </label>
              <Input
                value={dataRientro}
                onChange={e => setDataRientro(e.target.value)}
                placeholder="Es. 20 febbraio 2014"
                className="h-10 bg-zinc-50 border-zinc-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-sans text-sm font-semibold text-ink">
              Volontari
            </label>
            <Input
              value={volontari}
              onChange={e => setVolontari(e.target.value)}
              placeholder="Es. Mario Rossi, Anna Bianchi, Francesco Zana…"
              className="h-10 bg-zinc-50 border-zinc-200"
            />
            <p className="font-sans text-xs text-zinc-400">Nomi separati da virgola</p>
          </div>

          <div className="space-y-1.5">
            <label className="block font-sans text-sm font-semibold text-ink">
              Descrizione e obiettivi
            </label>
            <textarea
              value={descrizione}
              onChange={e => setDescrizione(e.target.value)}
              placeholder={`Es.\nRealizzazione impianto elettrico ospedale\nFormazione sanitaria donne del villaggio\nDistribuzione materiale scolastico`}
              rows={5}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 font-sans text-sm text-ink placeholder:text-zinc-400 focus:outline-none focus:border-terra resize-y"
            />
            <p className="font-sans text-xs text-zinc-400">
              Ogni riga diventa un punto elenco sul sito
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={salva}
              disabled={salvando}
              className="inline-flex items-center gap-2 bg-terra hover:bg-terra-dark text-cream font-sans font-semibold text-sm px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {salvando
                ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                : <Save className="w-4 h-4" />
              }
              {salvando ? 'Salvataggio…' : 'Salva'}
            </button>
            <button
              onClick={() => setAperto(false)}
              className="font-sans text-sm text-zinc-400 hover:text-ink px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              Annulla
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Pagina principale ─────────────────────────────────────────────────────────
export default function CaricaImmagini() {
  const [sezioni, setSezioni]                       = useState<Sezione[]>([])
  const [sezioneSelezionata, setSezioneSelezionata] = useState<string>('')
  const [coda, setCoda]                             = useState<FileInCoda[]>([])
  const [drag, setDrag]                             = useState(false)
  const [immaginiCaricate, setImmaginiCaricate]     = useState<ImmagineCaricata[]>([])
  const [caricaGalleria, setCaricaGalleria]         = useState(false)
  const [eliminando, setEliminando]                 = useState<string | null>(null)
  const [eliminandoSezione, setEliminandoSezione]   = useState<string | null>(null)

  const [mostraFormSezione, setMostraFormSezione] = useState(false)
  const [nuovaLabel, setNuovaLabel]               = useState('')
  const [creando, setCreando]                     = useState(false)

  const inputRef      = useRef<HTMLInputElement>(null)
  const inputNuovaRef = useRef<HTMLInputElement>(null)

  // ── Sezioni dal DB ─────────────────────────────────────────────────────────
  const caricaSezioni = useCallback(async () => {
    const { data } = await supabase
      .from('sezioni')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    if (data && data.length > 0) {
      setSezioni(data)
      setSezioneSelezionata(prev => prev || data[0].value)
    } else {
      setSezioni([])
    }
  }, [])

  useEffect(() => { caricaSezioni() }, [caricaSezioni])
  useEffect(() => {
    if (mostraFormSezione) setTimeout(() => inputNuovaRef.current?.focus(), 50)
  }, [mostraFormSezione])

  // ── Crea nuova sezione ─────────────────────────────────────────────────────
  async function creaNuovaSezione() {
    const label = nuovaLabel.trim()
    if (!label) return
    const value = toSlug(label)
    if (!value) { toast.error('Nome non valido. Usa lettere e numeri.'); return }

    setCreando(true)
    const maxOrder = sezioni.reduce((m, s) => Math.max(m, s.sort_order), 0)
    const { error } = await supabase
      .from('sezioni')
      .insert({ value, label, sort_order: maxOrder + 1 })
    setCreando(false)

    if (error) {
      if (error.code === '23505') toast.error('Esiste già una sezione con questo nome.')
      else toast.error('Errore nella creazione. Riprova.')
      return
    }

    toast.success(`Sezione "${label}" creata!`)
    setNuovaLabel('')
    setMostraFormSezione(false)
    await caricaSezioni()
    setSezioneSelezionata(value)
  }

  // ── Elimina sezione ────────────────────────────────────────────────────────
  async function eliminaSezione(s: Sezione) {
    const conferma = window.confirm(
      `Vuoi eliminare la sezione "${s.label}"?\n\nVerranno eliminate anche tutte le foto al suo interno.\nL'operazione non è reversibile.`
    )
    if (!conferma) return

    setEliminandoSezione(s.value)

    const { data: imgs } = await supabase
      .from('immagini')
      .select('storage_path')
      .eq('gallery_section', s.value)

    if (imgs && imgs.length > 0) {
      await supabase.storage.from('immagini').remove(imgs.map(i => i.storage_path))
      await supabase.from('immagini').delete().eq('gallery_section', s.value)
    }

    const { error } = await supabase.from('sezioni').delete().eq('id', s.id)
    setEliminandoSezione(null)

    if (error) { toast.error('Errore nell\'eliminazione della sezione.'); return }

    toast.success(`Sezione "${s.label}" eliminata.`)

    if (sezioneSelezionata === s.value) {
      setSezioneSelezionata('')
      setImmaginiCaricate([])
      setCoda([])
    }

    await caricaSezioni()
  }

  // ── Immagini per sezione ───────────────────────────────────────────────────
  const caricaImmaginiSezione = useCallback(async (sezione: string) => {
    if (!sezione) return
    setCaricaGalleria(true)
    const { data, error } = await supabase
      .from('immagini')
      .select('*')
      .eq('gallery_section', sezione)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) { setCaricaGalleria(false); return }

    const conUrl = (data ?? []).map(img => ({
      ...img,
      url: supabase.storage.from('immagini').getPublicUrl(img.storage_path).data.publicUrl,
    }))
    setImmaginiCaricate(conUrl)
    setCaricaGalleria(false)
  }, [])

  useEffect(() => {
    if (sezioneSelezionata) caricaImmaginiSezione(sezioneSelezionata)
  }, [sezioneSelezionata, caricaImmaginiSezione])

  // ── File ──────────────────────────────────────────────────────────────────
  function aggiungiFile(files: FileList | null) {
    if (!files) return
    const nuovi: FileInCoda[] = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .map(file => ({ file, preview: URL.createObjectURL(file), stato: 'attesa', progresso: 0 }))
    setCoda(prev => [...prev, ...nuovi])
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDrag(false)
    aggiungiFile(e.dataTransfer.files)
  }

  function rimuoviDaCoda(index: number) {
    setCoda(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  // ── Caricamento ────────────────────────────────────────────────────────────
  async function caricaTutti() {
    const inAttesa = coda.filter(f => f.stato === 'attesa')
    if (inAttesa.length === 0) return

    for (let i = 0; i < coda.length; i++) {
      if (coda[i].stato !== 'attesa') continue

      setCoda(prev => prev.map((f, idx) => idx === i ? { ...f, stato: 'caricamento', progresso: 10 } : f))

      const file = coda[i].file
      const ext  = file.name.split('.').pop()
      const path = `${sezioneSelezionata}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('immagini')
        .upload(path, file, { contentType: file.type, upsert: false })

      if (uploadError) {
        setCoda(prev => prev.map((f, idx) => idx === i ? { ...f, stato: 'errore', progresso: 0 } : f))
        toast.error(`Errore nel caricamento di "${file.name}"`)
        continue
      }

      setCoda(prev => prev.map((f, idx) => idx === i ? { ...f, progresso: 70 } : f))

      const { error: dbError } = await supabase.from('immagini').insert({
        storage_path: path,
        gallery_section: sezioneSelezionata,
        sort_order: 0,
      })

      if (dbError) {
        await supabase.storage.from('immagini').remove([path])
        setCoda(prev => prev.map((f, idx) => idx === i ? { ...f, stato: 'errore', progresso: 0 } : f))
        toast.error(`Errore nel salvataggio di "${file.name}"`)
        continue
      }

      setCoda(prev => prev.map((f, idx) => idx === i ? { ...f, stato: 'fatto', progresso: 100 } : f))
      toast.success(`"${file.name}" caricata!`)
    }

    await caricaImmaginiSezione(sezioneSelezionata)
    setTimeout(() => {
      setCoda(prev => {
        prev.filter(f => f.stato === 'fatto').forEach(f => URL.revokeObjectURL(f.preview))
        return prev.filter(f => f.stato === 'errore')
      })
    }, 2000)
  }

  // ── Elimina immagine ───────────────────────────────────────────────────────
  async function eliminaImmagine(img: ImmagineCaricata) {
    if (!confirm('Eliminare questa foto? Non sarà più visibile sul sito.')) return
    setEliminando(img.id)
    await supabase.storage.from('immagini').remove([img.storage_path])
    await supabase.from('immagini').delete().eq('id', img.id)
    setImmaginiCaricate(prev => prev.filter(i => i.id !== img.id))
    toast.success('Foto eliminata.')
    setEliminando(null)
  }

  const tuttiCaricati      = coda.length > 0 && coda.every(f => f.stato === 'fatto')
  const inAttesaCount      = coda.filter(f => f.stato === 'attesa').length
  const caricamentoInCorso = coda.some(f => f.stato === 'caricamento')
  const sezioneCorrente    = sezioni.find(s => s.value === sezioneSelezionata)

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl">

      <div className="mb-8">
        <h1 className="font-display text-3xl text-ink mb-1">Foto & Missioni</h1>
        <p className="font-sans text-sm text-zinc-500">
          Gestisci le sezioni della galleria, la loro descrizione e carica nuove foto.
        </p>
      </div>

      {/* ── STEP 1 — Sezione ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl p-7 mb-5 shadow-sm border border-zinc-100">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 rounded-full bg-terra text-cream flex items-center justify-center font-sans font-bold text-sm shrink-0">1</div>
          <h2 className="font-sans font-semibold text-base text-ink">Scegli la sezione (missione)</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {sezioni.map(s => (
            <div key={s.value} className="relative group">
              <button
                onClick={() => { setSezioneSelezionata(s.value); setMostraFormSezione(false) }}
                className={`w-full rounded-lg border-2 px-4 py-3.5 text-left transition-all font-sans font-semibold text-sm pr-10 ${
                  sezioneSelezionata === s.value
                    ? 'border-terra bg-terra/8 text-terra'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-terra/40 hover:bg-terra/4'
                }`}
              >
                {sezioneSelezionata === s.value && (
                  <CheckCircle2 className="w-4 h-4 text-terra mb-1.5" />
                )}
                <span className="block truncate">{s.label}</span>
                {s.sottotitolo || s.descrizione ? (
                  <span className="font-sans text-xs font-normal text-emerald-600 mt-0.5 block">
                    con descrizione
                  </span>
                ) : null}
              </button>

              <button
                onClick={e => { e.stopPropagation(); eliminaSezione(s) }}
                disabled={eliminandoSezione === s.value}
                aria-label={`Elimina sezione ${s.label}`}
                className="absolute top-2 right-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
              >
                {eliminandoSezione === s.value
                  ? <div className="w-3.5 h-3.5 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
                  : <Trash2 className="w-3.5 h-3.5" />
                }
              </button>
            </div>
          ))}

          {!mostraFormSezione && (
            <button
              onClick={() => { setMostraFormSezione(true); setSezioneSelezionata('') }}
              className="rounded-lg border-2 border-dashed border-zinc-200 bg-transparent px-4 py-3.5 text-left transition-all font-sans font-semibold text-sm text-zinc-400 hover:border-terra/50 hover:text-terra hover:bg-terra/4 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 shrink-0" />
              Nuova missione…
            </button>
          )}
        </div>

        {/* Form nuova sezione */}
        {mostraFormSezione && (
          <div className="mt-5 bg-terra/5 border border-terra/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <FolderPlus className="w-4 h-4 text-terra shrink-0" />
              <p className="font-sans font-semibold text-sm text-ink">Crea una nuova sezione</p>
            </div>
            <p className="font-sans text-sm text-zinc-500 mb-4">
              Dai un nome alla raccolta. Es. <em>"Missione 2025"</em> o <em>"Inaugurazione ospedale"</em>.
            </p>
            <div className="flex gap-2 flex-wrap">
              <div className="flex-1 min-w-[180px]">
                <Input
                  ref={inputNuovaRef}
                  value={nuovaLabel}
                  onChange={e => setNuovaLabel(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') creaNuovaSezione() }}
                  placeholder="Es. Missione 2025"
                  className="h-10 bg-white border-zinc-200"
                  maxLength={60}
                />
                {nuovaLabel.trim() && (
                  <p className="font-sans text-xs text-zinc-400 mt-1">
                    Slug: <span className="font-mono">{toSlug(nuovaLabel.trim())}</span>
                  </p>
                )}
              </div>
              <button
                onClick={creaNuovaSezione}
                disabled={creando || !nuovaLabel.trim()}
                className="inline-flex items-center gap-2 bg-terra hover:bg-terra-dark text-cream font-sans font-semibold text-sm px-5 py-2 rounded-lg disabled:opacity-50 transition-colors whitespace-nowrap"
              >
                {creando
                  ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  : <Plus className="w-4 h-4" />
                }
                {creando ? 'Creazione…' : 'Crea'}
              </button>
              <button
                onClick={() => { setMostraFormSezione(false); setNuovaLabel(''); setSezioneSelezionata(sezioni[0]?.value ?? '') }}
                className="p-2 text-zinc-400 hover:text-ink hover:bg-zinc-100 rounded-lg transition-colors"
                aria-label="Annulla"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {sezioni.length === 0 && !mostraFormSezione && (
          <div className="mt-4 text-center py-8">
            <FolderX className="w-10 h-10 text-zinc-300 mx-auto mb-3" strokeWidth={1.5} />
            <p className="font-sans text-sm text-zinc-400">
              Nessuna sezione ancora. Creane una per iniziare.
            </p>
          </div>
        )}
      </div>

      {/* ── Descrizione missione ───────────────────────────────────────────── */}
      {sezioneCorrente && (
        <div className="mb-5">
          <FormDescrizioneMissione
            sezione={sezioneCorrente}
            onSaved={updated => {
              setSezioni(prev => prev.map(s => s.id === updated.id ? updated : s))
            }}
          />
        </div>
      )}

      {/* ── STEP 2 — Selezione file ────────────────────────────────────────── */}
      {sezioneSelezionata && (
        <div className="bg-white rounded-xl p-7 mb-5 shadow-sm border border-zinc-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-7 rounded-full bg-terra text-cream flex items-center justify-center font-sans font-bold text-sm shrink-0">2</div>
            <h2 className="font-sans font-semibold text-base text-ink">Seleziona le foto da caricare</h2>
          </div>

          <div
            onDragOver={e => { e.preventDefault(); setDrag(true) }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all text-center ${
              drag ? 'border-terra bg-terra/5 scale-[1.01]' : 'border-zinc-200 hover:border-terra/50 hover:bg-zinc-50'
            }`}
          >
            <ImagePlus className="w-12 h-12 text-zinc-300" strokeWidth={1.2} />
            <div>
              <p className="font-sans font-semibold text-sm text-ink mb-0.5">Clicca per scegliere le foto</p>
              <p className="font-sans text-sm text-zinc-400">oppure trascina qui i file</p>
              <p className="font-sans text-xs text-zinc-300 mt-1.5">JPG · PNG · WebP — max 10 MB per foto</p>
            </div>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={e => aggiungiFile(e.target.files)}
          />

          {coda.length > 0 && (
            <div className="mt-5 space-y-2">
              <p className="font-sans font-semibold text-sm text-ink">
                {coda.length} foto selezionata{coda.length !== 1 ? 'e' : ''}
              </p>
              {coda.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-zinc-50 rounded-lg p-3 border border-zinc-100">
                  <img src={item.preview} alt="" className="w-12 h-12 object-cover rounded-md shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-semibold text-ink truncate">{item.file.name}</p>
                    <p className="font-sans text-xs text-zinc-400">{(item.file.size / 1024 / 1024).toFixed(1)} MB</p>
                    {item.stato === 'caricamento' && (
                      <div className="mt-1.5 h-1 bg-zinc-200 rounded-full overflow-hidden">
                        <div className="h-full bg-terra rounded-full transition-all duration-500" style={{ width: `${item.progresso}%` }} />
                      </div>
                    )}
                  </div>
                  <div className="shrink-0">
                    {item.stato === 'attesa' && (
                      <button onClick={() => rimuoviDaCoda(i)} className="p-1.5 text-zinc-300 hover:text-red-400 transition-colors rounded-md hover:bg-red-50" aria-label="Rimuovi">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {item.stato === 'caricamento' && <div className="w-5 h-5 rounded-full border-2 border-terra border-t-transparent animate-spin" />}
                    {item.stato === 'fatto'        && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {item.stato === 'errore'       && <AlertCircle  className="w-5 h-5 text-red-500" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── STEP 3 — Carica ───────────────────────────────────────────────── */}
      {sezioneSelezionata && coda.length > 0 && !tuttiCaricati && (
        <div className="bg-white rounded-xl p-7 mb-5 shadow-sm border border-zinc-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-7 rounded-full bg-terra text-cream flex items-center justify-center font-sans font-bold text-sm shrink-0">3</div>
            <h2 className="font-sans font-semibold text-base text-ink">Carica sul sito</h2>
          </div>

          <div className="bg-zinc-50 rounded-lg p-4 mb-5 flex items-start gap-3 border border-zinc-100">
            <CheckCircle2 className="w-4 h-4 text-terra shrink-0 mt-0.5" />
            <p className="font-sans text-sm text-zinc-600">
              Le foto andranno nella sezione <strong className="text-ink">{sezioneCorrente?.label}</strong>.
            </p>
          </div>

          <button
            onClick={caricaTutti}
            disabled={caricamentoInCorso || inAttesaCount === 0}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-base py-3 px-8 rounded-lg transition-all disabled:opacity-50 shadow-md shadow-emerald-600/20"
          >
            <Upload className="w-5 h-5" />
            {caricamentoInCorso ? 'Caricamento in corso…' : `Carica ${inAttesaCount} foto`}
          </button>
        </div>
      )}

      {tuttiCaricati && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-5 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <p className="font-sans font-semibold text-emerald-800">Tutte le foto caricate con successo!</p>
        </div>
      )}

      {/* ── Galleria foto esistenti ────────────────────────────────────────── */}
      {sezioneSelezionata && (
        <div className="bg-white rounded-xl p-7 shadow-sm border border-zinc-100">
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="font-sans font-semibold text-base text-ink">Foto nella sezione</h2>
            <span className="font-sans text-sm text-terra font-semibold">{sezioneCorrente?.label}</span>
          </div>
          <p className="font-sans text-sm text-zinc-400 mb-5">Passa sopra a una foto per eliminarla.</p>

          {caricaGalleria ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-zinc-100 animate-pulse" />
              ))}
            </div>
          ) : immaginiCaricate.length === 0 ? (
            <div className="border-2 border-dashed border-zinc-100 rounded-xl p-12 text-center">
              <ImagePlus className="w-8 h-8 text-zinc-200 mx-auto mb-3" strokeWidth={1.5} />
              <p className="font-sans text-sm text-zinc-400">Nessuna foto in questa sezione.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {immaginiCaricate.map(img => (
                <div key={img.id} className="group relative aspect-square rounded-lg overflow-hidden bg-zinc-100">
                  <img src={img.url} alt="" loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <button
                      onClick={() => eliminaImmagine(img)}
                      disabled={eliminando === img.id}
                      aria-label="Elimina foto"
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white rounded-full p-2.5 shadow-lg disabled:opacity-50"
                    >
                      {eliminando === img.id
                        ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        : <Trash2 className="w-4 h-4" />
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
