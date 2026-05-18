import { useState, useEffect, useRef, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Play, X, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Eyebrow } from '@/components/Eyebrow'
import { ScrollReveal } from '@/components/ScrollReveal'
import { VideoModal } from '@/components/VideoModal'
import { videos } from '@/data/content'
import { supabase } from '@/lib/supabase'

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
interface Foto {
  id: string
  storage_path: string
  gallery_section: string
  descrizione: string | null
  url: string
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Foto[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const photo = photos[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visualizza foto"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4"
      onClick={onClose}
    >
      <button onClick={onClose} aria-label="Chiudi" className="absolute top-4 right-4 text-cream/60 hover:text-cream z-10 p-2">
        <X className="w-7 h-7" />
      </button>
      <button onClick={e => { e.stopPropagation(); onPrev() }} aria-label="Precedente" className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 text-cream/60 hover:text-cream p-3">
        <ChevronLeft className="w-8 h-8" />
      </button>

      <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
        <img
          src={photo.url}
          alt={photo.descrizione ?? ''}
          className="w-full max-h-[80vh] object-contain rounded-sm"
        />
        {photo.descrizione && (
          <p className="mt-3 font-lora text-cream/70 text-center text-sm">{photo.descrizione}</p>
        )}
        <p className="mt-1 font-sans text-[0.65rem] tracking-[.1em] uppercase text-cream/30 text-center">
          {index + 1} / {photos.length}
        </p>
      </div>

      <button onClick={e => { e.stopPropagation(); onNext() }} aria-label="Successiva" className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 text-cream/60 hover:text-cream p-3">
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  )
}

// ── Video card ────────────────────────────────────────────────────────────────
function VideoCard({ video, featured, onClick }: { video: typeof videos[number]; featured?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-sm bg-ink aspect-video w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra"
      aria-label={`Guarda: ${video.title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
        alt={video.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/55 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-cream/95 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="w-5 h-5 text-terra fill-terra translate-x-0.5" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/80 to-transparent">
        <div className="flex items-end justify-between gap-2">
          <p className={`font-display text-cream leading-snug text-left ${featured ? 'text-base' : 'text-xs'}`}>{video.title}</p>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="font-sans text-[0.6rem] font-bold tracking-[.1em] uppercase text-terra-light bg-ink/60 px-1.5 py-0.5 rounded-sm">{video.lang}</span>
            <span className="font-sans text-[0.6rem] text-cream/50">{video.year}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

// ── Info missione ─────────────────────────────────────────────────────────────
function InfoMissione({ sezione }: { sezione: Sezione }) {
  const { sottotitolo, data_partenza, data_rientro, volontari, descrizione } = sezione
  const hasDati = sottotitolo || data_partenza || volontari || descrizione
  if (!hasDati) return null

  const righeDescrizione = descrizione
    ? descrizione.split('\n').map(r => r.trim()).filter(Boolean)
    : []

  const listaVolontari = volontari
    ? volontari.split(',').map(v => v.trim()).filter(Boolean)
    : []

  return (
    <div className="bg-white rounded-sm shadow-sm border border-sand-dark p-7 mb-10">
      {sottotitolo && (
        <p className="font-sans text-[0.75rem] font-semibold tracking-[.14em] uppercase text-terra mb-5">
          {sottotitolo}
        </p>
      )}

      {(data_partenza || data_rientro) && (
        <div className="flex flex-wrap gap-6 mb-5">
          {data_partenza && (
            <div>
              <span className="font-sans text-xs font-bold tracking-widest uppercase text-ink-light/50 block mb-0.5">
                Partenza
              </span>
              <span className="font-lora text-ink">{data_partenza}</span>
            </div>
          )}
          {data_rientro && (
            <div>
              <span className="font-sans text-xs font-bold tracking-widest uppercase text-ink-light/50 block mb-0.5">
                Rientro
              </span>
              <span className="font-lora text-ink">{data_rientro}</span>
            </div>
          )}
        </div>
      )}

      {listaVolontari.length > 0 && (
        <div className="mb-5">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-ink-light/50 block mb-2">
            Volontari
          </span>
          <p className="font-lora text-ink leading-relaxed">
            {listaVolontari.join(' · ')}
          </p>
        </div>
      )}

      {righeDescrizione.length > 0 && (
        <div>
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-ink-light/50 block mb-3">
            Obiettivi e attività
          </span>
          <ul className="space-y-2">
            {righeDescrizione.map((riga, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-terra shrink-0" />
                <span className="font-lora text-ink leading-relaxed">{riga}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ── Pagina ────────────────────────────────────────────────────────────────────
export default function GalleryVideo() {
  const [activeVideo, setActiveVideo] = useState<typeof videos[number] | null>(null)

  // Sezioni da Supabase
  const [sezioni, setSezioni]         = useState<Sezione[]>([])
  const [sezioneAttiva, setSezioneAttiva] = useState<string>('')

  // Foto della sezione attiva
  const [foto, setFoto]               = useState<Foto[]>([])
  const [loadingFoto, setLoadingFoto] = useState(false)

  // Lightbox
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  // Ref per la nav sezioni (scroll orizzontale)
  const navRef = useRef<HTMLDivElement>(null)

  // Carica sezioni
  useEffect(() => {
    supabase
      .from('sezioni')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setSezioni(data)
          setSezioneAttiva(data[0].value)
        }
      })
  }, [])

  // Carica foto quando cambia sezione
  const caricaFoto = useCallback(async (sezione: string) => {
    if (!sezione) return
    setLoadingFoto(true)
    setFoto([])
    const { data } = await supabase
      .from('immagini')
      .select('*')
      .eq('gallery_section', sezione)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })

    const conUrl = (data ?? []).map(img => ({
      ...img,
      url: supabase.storage.from('immagini').getPublicUrl(img.storage_path).data.publicUrl,
    }))
    setFoto(conUrl)
    setLoadingFoto(false)
  }, [])

  useEffect(() => { caricaFoto(sezioneAttiva) }, [sezioneAttiva, caricaFoto])

  // Scroll automatico del tab attivo nella nav
  useEffect(() => {
    if (!navRef.current || !sezioneAttiva) return
    const btn = navRef.current.querySelector(`[data-section="${sezioneAttiva}"]`) as HTMLElement
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [sezioneAttiva])

  function prevPhoto() {
    setLightboxIdx(i => i !== null ? (i - 1 + foto.length) % foto.length : null)
  }
  function nextPhoto() {
    setLightboxIdx(i => i !== null ? (i + 1) % foto.length : null)
  }

  const [featuredVideo, ...sideVideos] = videos
  const sezioneAttivaObj   = sezioni.find(s => s.value === sezioneAttiva)
  const labelSezioneAttiva = sezioneAttivaObj?.label ?? ''

  return (
    <>
      <Helmet>
        <title>Gallery e Video — Progetto Briciola Onlus</title>
        <meta name="description" content="Foto e video delle missioni di Progetto Briciola a Hured, Etiopia." />
      </Helmet>

      <PageHero
        eyebrow="La nostra storia in immagini"
        title="Gallery e Video"
        subtitle="Trent'anni di missioni documentati. I video e le fotografie delle nostre missioni a Hured."
        bg="bg-sand"
        align="left"
      />

      {/* ── Video ─────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal><Eyebrow className="mb-5">Documentazione</Eyebrow></ScrollReveal>
          <ScrollReveal delay={0.08}><h2 className="text-ink mb-12">Video</h2></ScrollReveal>

          <div className="grid lg:grid-cols-[3fr_2fr] gap-5 mb-4">
            <ScrollReveal>
              <VideoCard video={featuredVideo} featured onClick={() => setActiveVideo(featuredVideo)} />
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-5">
              {sideVideos.map((v, i) => (
                <ScrollReveal key={v.id} delay={i * 0.07}>
                  <VideoCard video={v} onClick={() => setActiveVideo(v)} />
                </ScrollReveal>
              ))}
            </div>
          </div>
          <p className="font-sans text-[0.65rem] tracking-[.1em] uppercase text-ink-light/30 text-right">
            I video si aprono su YouTube · nessun tracciamento al caricamento
          </p>
        </div>
      </section>

      {/* ── Galleria fotografica ──────────────────────────────────────────── */}
      <section className="bg-sand pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24">
          <ScrollReveal><Eyebrow className="mb-5">Le nostre missioni</Eyebrow></ScrollReveal>
          <ScrollReveal delay={0.08}><h2 className="text-ink mb-3">Galleria fotografica</h2></ScrollReveal>
          <ScrollReveal delay={0.14}>
            <p className="font-lora text-ink-light text-lg leading-relaxed max-w-2xl">
              Ogni foto è una storia. Seleziona una sezione per sfogliare le immagini delle nostre missioni.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Nav sezioni (sticky) ─────────────────────────────────────────── */}
        {sezioni.length > 0 && (
          <div className="sticky top-16 z-30 bg-sand/95 backdrop-blur-sm border-b border-sand-dark mt-10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div
                ref={navRef}
                className="flex gap-1 overflow-x-auto py-3 scrollbar-none"
                style={{ scrollbarWidth: 'none' }}
              >
                {sezioni.map(s => (
                  <button
                    key={s.value}
                    data-section={s.value}
                    onClick={() => setSezioneAttiva(s.value)}
                    className={`shrink-0 px-5 py-2.5 rounded-sm font-sans font-semibold text-sm tracking-wide transition-all whitespace-nowrap ${
                      sezioneAttiva === s.value
                        ? 'bg-terra text-cream shadow-sm'
                        : 'bg-white text-ink-light hover:bg-sand-dark hover:text-ink border border-sand-dark'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Griglia foto ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-10">
          {/* Header sezione */}
          {labelSezioneAttiva && (
            <div className="flex items-baseline gap-3 mb-8">
              <h3 className="font-display text-2xl text-ink">{labelSezioneAttiva}</h3>
              {!loadingFoto && (
                <span className="font-sans text-sm text-ink-light/50">
                  {foto.length} {foto.length === 1 ? 'foto' : 'foto'}
                </span>
              )}
            </div>
          )}

          {/* Descrizione missione */}
          {sezioneAttivaObj && !loadingFoto && (
            <InfoMissione sezione={sezioneAttivaObj} />
          )}

          {loadingFoto ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-sm bg-sand-dark animate-pulse" />
              ))}
            </div>
          ) : foto.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <Images className="w-16 h-16 text-ink-light/20" strokeWidth={1} />
              <p className="font-display text-xl text-ink-light/40">
                Nessuna foto in questa sezione
              </p>
              <p className="font-lora text-ink-light/30 text-base">
                Le foto verranno aggiunte dai gestori del sito
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {foto.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => setLightboxIdx(i)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-sand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra"
                  aria-label={`Apri foto ${i + 1}`}
                >
                  <img
                    src={f.url}
                    alt={f.descrizione ?? `Foto ${i + 1} — ${labelSezioneAttiva}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modali */}
      {activeVideo && (
        <VideoModal videoId={activeVideo.id} title={activeVideo.title} onClose={() => setActiveVideo(null)} />
      )}
      {lightboxIdx !== null && foto.length > 0 && (
        <Lightbox
          photos={foto}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  )
}
