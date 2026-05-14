import { useRef, useState, useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import { Upload, Trash2, ImagePlus, CheckCircle2, AlertCircle, Plus, X, FolderPlus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// ── Tipi ──────────────────────────────────────────────────────────────────────
interface Sezione { id: string; value: string; label: string; sort_order: number }

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

// ── Slug da nome leggibile ─────────────────────────────────────────────────────
function toSlug(label: string) {
  return label
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function CaricaImmagini() {
  const [sezioni, setSezioni] = useState<Sezione[]>([])
  const [sezioneSelezionata, setSezioneSelezionata] = useState<string>('')
  const [coda, setCoda] = useState<FileInCoda[]>([])
  const [drag, setDrag] = useState(false)
  const [immaginiCaricate, setImmaginiCaricate] = useState<ImmagineCaricata[]>([])
  const [caricaGalleria, setCaricaGalleria] = useState(false)
  const [eliminando, setEliminando] = useState<string | null>(null)

  // Nuova sezione
  const [mostraFormSezione, setMostraFormSezione] = useState(false)
  const [nuovaLabel, setNuovaLabel] = useState('')
  const [creando, setCreando] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const inputNuovaRef = useRef<HTMLInputElement>(null)

  // ── Carica sezioni dal DB ──────────────────────────────────────────────────
  const caricaSezioni = useCallback(async () => {
    const { data } = await supabase
      .from('sezioni')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    if (data && data.length > 0) {
      setSezioni(data)
      setSezioneSelezionata(prev => prev || data[0].value)
    }
  }, [])

  useEffect(() => { caricaSezioni() }, [caricaSezioni])

  // Focus sul campo quando si apre il form
  useEffect(() => {
    if (mostraFormSezione) {
      setTimeout(() => inputNuovaRef.current?.focus(), 50)
    }
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
      if (error.code === '23505') {
        toast.error('Esiste già una sezione con questo nome.')
      } else {
        toast.error('Errore nella creazione. Riprova.')
      }
      return
    }

    toast.success(`Sezione "${label}" creata!`)
    setNuovaLabel('')
    setMostraFormSezione(false)
    await caricaSezioni()
    setSezioneSelezionata(value)
  }

  // ── Carica immagini per sezione ────────────────────────────────────────────
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

  // ── Gestione file ──────────────────────────────────────────────────────────
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
      const ext = file.name.split('.').pop()
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

  // ── Eliminazione immagine ──────────────────────────────────────────────────
  async function eliminaImmagine(img: ImmagineCaricata) {
    if (!confirm(`Vuoi eliminare questa foto?\nNon sarà più visibile sul sito.`)) return
    setEliminando(img.id)
    await supabase.storage.from('immagini').remove([img.storage_path])
    await supabase.from('immagini').delete().eq('id', img.id)
    setImmaginiCaricate(prev => prev.filter(i => i.id !== img.id))
    toast.success('Foto eliminata.')
    setEliminando(null)
  }

  const tuttiCaricati = coda.length > 0 && coda.every(f => f.stato === 'fatto')
  const inAttesaCount = coda.filter(f => f.stato === 'attesa').length
  const caricamentoInCorso = coda.some(f => f.stato === 'caricamento')
  const labelSezioneCorrente = sezioni.find(s => s.value === sezioneSelezionata)?.label ?? ''

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-2">Carica nuove foto</h1>
        <p className="font-lora text-ink-light text-lg">
          Scegli la sezione, seleziona le foto e premi il pulsante verde per caricarle sul sito.
        </p>
      </div>

      {/* STEP 1 — Sezione */}
      <div className="bg-white rounded-sm p-8 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-terra text-cream flex items-center justify-center font-display font-bold text-lg shrink-0">1</div>
          <h2 className="font-display text-xl text-ink">In quale sezione vanno le foto?</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {sezioni.map(s => (
            <button
              key={s.value}
              onClick={() => { setSezioneSelezionata(s.value); setMostraFormSezione(false) }}
              className={`rounded-sm border-2 p-4 text-left transition-all font-sans font-semibold text-base ${
                sezioneSelezionata === s.value
                  ? 'border-terra bg-terra/10 text-terra'
                  : 'border-sand-dark bg-sand text-ink hover:border-terra/50'
              }`}
            >
              {sezioneSelezionata === s.value && <CheckCircle2 className="w-5 h-5 text-terra mb-1" />}
              {s.label}
            </button>
          ))}

          {/* Bottone "Nuova sezione" */}
          {!mostraFormSezione ? (
            <button
              onClick={() => { setMostraFormSezione(true); setSezioneSelezionata('') }}
              className="rounded-sm border-2 border-dashed border-terra/40 bg-terra/5 p-4 text-left transition-all font-sans font-semibold text-base text-terra hover:border-terra hover:bg-terra/10 flex items-center gap-2"
            >
              <Plus className="w-5 h-5 shrink-0" />
              Nuova sezione…
            </button>
          ) : (
            <div className="col-span-2 sm:col-span-3 mt-1" />
          )}
        </div>

        {/* Form nuova sezione — inline sotto la griglia */}
        {mostraFormSezione && (
          <div className="mt-5 bg-terra/5 border-2 border-terra/30 rounded-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <FolderPlus className="w-5 h-5 text-terra shrink-0" />
              <p className="font-display text-lg text-ink">Crea una nuova sezione</p>
            </div>

            <p className="font-lora text-ink-light mb-4">
              Dai un nome alla nuova raccolta di foto. Ad esempio: <em>"Missione 2024"</em> oppure <em>"Inaugurazione ospedale"</em>.
            </p>

            <div className="flex gap-3 items-start flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <Input
                  ref={inputNuovaRef}
                  value={nuovaLabel}
                  onChange={e => setNuovaLabel(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') creaNuovaSezione() }}
                  placeholder="Es. Missione 2024"
                  className="text-lg py-4 h-auto"
                  maxLength={60}
                />
                {nuovaLabel.trim() && (
                  <p className="font-sans text-xs text-ink-light/50 mt-1.5">
                    Identificatore: <span className="font-mono">{toSlug(nuovaLabel.trim())}</span>
                  </p>
                )}
              </div>

              <Button
                onClick={creaNuovaSezione}
                disabled={creando || !nuovaLabel.trim()}
                className="bg-terra hover:bg-terra-dark text-cream font-sans font-bold text-base py-4 px-6 h-auto rounded-sm disabled:opacity-50 whitespace-nowrap"
              >
                {creando ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Creazione…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Crea sezione
                  </span>
                )}
              </Button>

              <button
                onClick={() => { setMostraFormSezione(false); setNuovaLabel(''); setSezioneSelezionata(sezioni[0]?.value ?? '') }}
                className="p-3 text-ink-light/60 hover:text-ink transition-colors rounded-sm hover:bg-sand"
                aria-label="Annulla"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* STEP 2 — Selezione file (solo se sezione scelta) */}
      {sezioneSelezionata && (
        <div className="bg-white rounded-sm p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-terra text-cream flex items-center justify-center font-display font-bold text-lg shrink-0">2</div>
            <h2 className="font-display text-xl text-ink">Seleziona le foto da caricare</h2>
          </div>

          <div
            onDragOver={e => { e.preventDefault(); setDrag(true) }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-sm p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all text-center ${
              drag ? 'border-terra bg-terra/5 scale-[1.01]' : 'border-sand-dark hover:border-terra/60 hover:bg-sand'
            }`}
          >
            <ImagePlus className="w-14 h-14 text-terra/60" strokeWidth={1.2} />
            <div>
              <p className="font-sans font-bold text-xl text-ink mb-1">Clicca qui per scegliere le foto</p>
              <p className="font-lora text-ink-light text-base">oppure trascina le foto in questo riquadro</p>
              <p className="font-sans text-sm text-ink-light/50 mt-2">Formati accettati: JPG, PNG, WebP · Dimensione massima: 10 MB per foto</p>
            </div>
          </div>

          <input ref={inputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" multiple className="hidden" onChange={e => aggiungiFile(e.target.files)} />

          {coda.length > 0 && (
            <div className="mt-6 space-y-3">
              <p className="font-sans font-semibold text-ink text-base">
                {coda.length} foto selezionata{coda.length !== 1 ? 'e' : ''}:
              </p>
              {coda.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-sand rounded-sm p-3">
                  <img src={item.preview} alt="" className="w-16 h-16 object-cover rounded-sm shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-semibold text-ink truncate">{item.file.name}</p>
                    <p className="font-sans text-xs text-ink-light/60">{(item.file.size / 1024 / 1024).toFixed(1)} MB</p>
                    {item.stato === 'caricamento' && (
                      <div className="mt-1.5 h-1.5 bg-sand-dark rounded-full overflow-hidden">
                        <div className="h-full bg-terra rounded-full transition-all duration-500" style={{ width: `${item.progresso}%` }} />
                      </div>
                    )}
                  </div>
                  <div className="shrink-0">
                    {item.stato === 'attesa' && (
                      <button onClick={() => rimuoviDaCoda(i)} className="p-2 text-ink-light/50 hover:text-red-500 transition-colors" aria-label="Rimuovi">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                    {item.stato === 'caricamento' && <div className="w-6 h-6 rounded-full border-2 border-terra border-t-transparent animate-spin" />}
                    {item.stato === 'fatto' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    {item.stato === 'errore' && <AlertCircle className="w-6 h-6 text-red-500" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STEP 3 — Carica */}
      {sezioneSelezionata && coda.length > 0 && !tuttiCaricati && (
        <div className="bg-white rounded-sm p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-terra text-cream flex items-center justify-center font-display font-bold text-lg shrink-0">3</div>
            <h2 className="font-display text-xl text-ink">Carica le foto sul sito</h2>
          </div>

          <div className="bg-sand rounded-sm p-5 mb-6 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-terra shrink-0 mt-0.5" />
            <p className="font-lora text-ink text-base leading-relaxed">
              Le foto verranno caricate nella sezione <strong>{labelSezioneCorrente}</strong>. Verifica di aver scelto la sezione giusta prima di procedere.
            </p>
          </div>

          <Button
            onClick={caricaTutti}
            disabled={caricamentoInCorso || inAttesaCount === 0}
            className="bg-green-600 hover:bg-green-700 text-white font-sans font-bold text-xl py-5 px-10 h-auto rounded-sm gap-3 transition-all disabled:opacity-50 w-full sm:w-auto shadow-lg"
          >
            <Upload className="w-6 h-6" />
            {caricamentoInCorso ? 'Caricamento in corso…' : `Carica ${inAttesaCount} foto sul sito`}
          </Button>
        </div>
      )}

      {tuttiCaricati && (
        <div className="bg-green-50 border-2 border-green-300 rounded-sm p-6 mb-6 flex items-center gap-4">
          <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" />
          <p className="font-display text-xl text-green-800">Tutte le foto sono state caricate con successo!</p>
        </div>
      )}

      {/* Galleria foto esistenti */}
      {sezioneSelezionata && (
        <div className="bg-white rounded-sm p-8 shadow-sm">
          <h2 className="font-display text-xl text-ink mb-2">
            Foto già presenti — <span className="text-terra">{labelSezioneCorrente}</span>
          </h2>
          <p className="font-lora text-ink-light mb-6">Clicca il cestino rosso per eliminare una foto dal sito.</p>

          {caricaGalleria ? (
            <p className="font-lora text-ink-light/50 animate-pulse py-8 text-center">Caricamento foto…</p>
          ) : immaginiCaricate.length === 0 ? (
            <div className="border-2 border-dashed border-sand-dark rounded-sm p-10 text-center">
              <p className="font-lora text-ink-light/60 text-lg">Nessuna foto in questa sezione.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {immaginiCaricate.map(img => (
                <div key={img.id} className="group relative aspect-square rounded-sm overflow-hidden bg-sand-dark">
                  <img src={img.url} alt="" loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors flex items-center justify-center">
                    <button
                      onClick={() => eliminaImmagine(img)}
                      disabled={eliminando === img.id}
                      aria-label="Elimina foto"
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg disabled:opacity-50"
                    >
                      {eliminando === img.id
                        ? <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        : <Trash2 className="w-5 h-5" />
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
