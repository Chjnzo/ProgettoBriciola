import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Play, HeartHandshake, Landmark, Gift, Copy, Check, ChevronDown, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Eyebrow } from '@/components/Eyebrow'
import { VideoModal } from '@/components/VideoModal'
import { keyStats, videos, ibanList, orgInfo } from '@/data/content'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

const galleryPlaceholders = [
  { label: 'Missione 2016', bg: 'from-terra/60 to-terra-dark/80' },
  { label: 'Missione 2015', bg: 'from-gold/40 to-terra/60' },
  { label: 'Missione 2014', bg: 'from-terra-light/50 to-terra/70' },
  { label: 'Progetti', bg: 'from-ink-light/60 to-ink/80' },
  { label: 'Missione 2013', bg: 'from-terra/50 to-gold/40' },
  { label: 'Hured', bg: 'from-terra-dark/70 to-terra-light/50' },
  { label: 'Comunità', bg: 'from-gold/50 to-terra-dark/60' },
  { label: 'Scuola', bg: 'from-terra/60 to-ink-light/60' },
]

// ─── Sezione Hero ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Sfondo — placeholder gradient cinematico in attesa di hero.mp4 */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 25% 75%, rgba(193,102,58,0.55) 0%, transparent 55%),
            radial-gradient(ellipse at 75% 20%, rgba(212,168,71,0.18) 0%, transparent 45%),
            linear-gradient(175deg, #100a05 0%, #2A1E14 55%, #1a0f08 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Overlay dal basso */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
        aria-hidden="true"
      />

      {/* Contenuto — bottom left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 lg:pb-28">
        <div className="max-w-2xl">
          <ScrollReveal>
            <p className="font-sans text-[0.75rem] font-semibold tracking-[.18em] uppercase text-terra-light mb-5">
              ODV · Hured, Etiopia
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-cream leading-[1.08] mb-6">
              Dal 1992,{' '}
              <em className="italic text-terra-light not-italic">
                una briciola
              </em>
              <br />
              cambia tutto
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-lora text-cream/75 text-lg leading-relaxed mb-8 max-w-lg">
              Sosteniamo i bambini di Hured attraverso adozioni a distanza, missioni annuali e
              infrastrutture che durano nel tempo.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/cosa-puoi-fare-tu">Dona ora</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-cream/60 text-cream hover:bg-cream/10"
              >
                <Link to="/cosa-facciamo">Scopri il progetto</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40 animate-bounce z-10">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  )
}

// ─── Barra numeri ─────────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <section className="bg-terra" aria-label="Numeri chiave">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-14">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-terra-light/30">
          {keyStats.map((stat, i) => (
            <ScrollReveal key={stat.value} delay={i * 0.08}>
              <div className="text-center lg:px-8">
                <dt className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-normal text-cream leading-none">
                  {stat.value}
                </dt>
                <dd className="mt-2 font-sans text-[0.8rem] font-semibold tracking-[.1em] uppercase text-terra-light/80">
                  {stat.label}
                </dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ─── Chi siamo in breve ───────────────────────────────────────────────────────

function ChiSiamoBreve() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Placeholder immagine */}
          <ScrollReveal>
            <div className="aspect-[4/3] bg-sand rounded-sm overflow-hidden flex flex-col items-center justify-center gap-3 text-ink-light/40">
              <Camera className="h-10 w-10" />
              <span className="font-sans text-xs tracking-widest uppercase">Foto in arrivo</span>
            </div>
          </ScrollReveal>

          {/* Testo */}
          <ScrollReveal delay={0.15}>
            <div>
              <Eyebrow className="mb-5">Chi siamo</Eyebrow>
              <h2 className="text-ink mb-6">
                Trent'anni a fianco di Hured
              </h2>
              <p className="font-lora text-ink-light leading-relaxed mb-4">
                Progetto Briciola ODV è un'associazione italiana non lucrativa nata nel 1992
                con finalità di solidarietà internazionale a favore dei bambini orfani e di
                strada in Etiopia, in particolare nel villaggio di Hured, nella provincia di Shoa.
              </p>
              <blockquote className="border-l-[3px] border-terra pl-6 my-7 font-serif italic text-xl text-ink leading-relaxed">
                "Piccolo quanto una briciola, ma grande nella sua carica di speranza."
              </blockquote>
              <Button asChild variant="ghost" className="px-0 hover:bg-transparent text-terra hover:text-terra-dark font-sans text-sm tracking-widest uppercase">
                <Link to="/chi-siamo">Scopri la nostra storia →</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// ─── Tre modi per aiutare ─────────────────────────────────────────────────────

const helpCards = [
  {
    icon: HeartHandshake,
    title: 'Adozione a distanza',
    description: '€25 al mese. Il 96% dei fondi arriva direttamente al bambino che scegli, fino ai suoi 18 anni.',
    cta: 'Adotta un bambino',
    href: '/cosa-puoi-fare-tu',
  },
  {
    icon: Landmark,
    title: 'Donazione libera',
    description: 'Ogni importo conta. Tre conti correnti disponibili, con intestazione chiara e tracciabilità garantita.',
    cta: 'Vedi gli IBAN',
    href: '/cosa-puoi-fare-tu',
  },
  {
    icon: Gift,
    title: '5×1000',
    description: 'Nella tua dichiarazione dei redditi, senza spendere un euro in più. Basta un codice fiscale.',
    cta: 'Come funziona',
    href: '/cosa-puoi-fare-tu',
  },
]

function ComePuoiAiutare() {
  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Eyebrow center className="mb-5">Come aiutare</Eyebrow>
            <h2 className="text-ink">Tre modi per fare la differenza</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {helpCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <div className="bg-white rounded-sm p-10 flex flex-col h-full transition-transform hover:-translate-y-1 duration-300">
                <card.icon
                  className="h-9 w-9 text-terra mb-6 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="font-serif text-xl text-ink mb-3">{card.title}</h3>
                <p className="font-lora text-ink-light text-base leading-relaxed flex-1 mb-8">
                  {card.description}
                </p>
                <Button asChild variant="outline" size="sm" className="border-terra text-terra hover:bg-terra/5 self-start">
                  <Link to={card.href}>{card.cta}</Link>
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Video in evidenza ────────────────────────────────────────────────────────

function VideoSection({ onPlay }: { onPlay: (id: string, title: string) => void }) {
  const featured = videos[0]
  const secondary = [videos[1], videos[4]]

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal>
          <div className="mb-12">
            <Eyebrow className="mb-5">Video</Eyebrow>
            <h2 className="text-ink">Il lavoro in immagini</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Video grande */}
          <ScrollReveal className="lg:col-span-2">
            <VideoCard video={featured} onPlay={onPlay} large />
          </ScrollReveal>

          {/* Due video piccoli */}
          <div className="flex flex-col gap-4">
            {secondary.map((v, i) => (
              <ScrollReveal key={v.id} delay={0.1 + i * 0.1} className="flex-1">
                <VideoCard video={v} onPlay={onPlay} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 text-center">
            <Button asChild variant="ghost" className="text-terra hover:text-terra-dark font-sans text-sm tracking-widest uppercase px-0 hover:bg-transparent">
              <Link to="/gallery-video">Vedi tutti i video →</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function VideoCard({
  video,
  onPlay,
  large = false,
}: {
  video: (typeof videos)[0]
  onPlay: (id: string, title: string) => void
  large?: boolean
}) {
  return (
    <button
      onClick={() => onPlay(video.id, video.title)}
      className="group relative w-full overflow-hidden rounded-sm bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-2"
      style={{ aspectRatio: large ? '16/9' : '16/9' }}
      aria-label={`Guarda: ${video.title}`}
    >
      <img
        src={ytThumb(video.id)}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
      />

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
          <Play className="h-6 w-6 text-terra fill-terra ml-0.5" />
        </div>
      </div>

      {/* Titolo e anno */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="font-sans text-[0.72rem] font-semibold tracking-widest uppercase text-terra-light mb-1">
          {video.year} · {video.lang}
        </p>
        <p className="font-serif text-cream text-sm leading-snug line-clamp-2">
          {video.title}
        </p>
      </div>
    </button>
  )
}

// ─── Gallery strip ────────────────────────────────────────────────────────────

function GalleryStrip() {
  const tiles = [...galleryPlaceholders, ...galleryPlaceholders]

  return (
    <section className="bg-sand-dark py-16 overflow-hidden" aria-label="Anteprima galleria fotografica">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-8 flex items-end justify-between">
          <div>
            <Eyebrow className="mb-3">Gallery</Eyebrow>
            <h2 className="text-ink">Trent'anni di missioni</h2>
          </div>
          <Button asChild variant="ghost" className="text-terra hover:text-terra-dark font-sans text-sm tracking-widest uppercase px-0 hover:bg-transparent hidden sm:inline-flex">
            <Link to="/gallery-video">Vedi tutte le foto →</Link>
          </Button>
        </div>
      </ScrollReveal>

      <div className="flex animate-marquee gap-4 w-max">
        {tiles.map((tile, i) => (
          <div
            key={i}
            className={`relative w-56 h-40 shrink-0 rounded-sm overflow-hidden bg-gradient-to-br ${tile.bg} flex flex-col items-center justify-center gap-2`}
            aria-hidden="true"
          >
            <Camera className="h-7 w-7 text-cream/50" />
            <span className="font-sans text-[0.7rem] font-semibold tracking-widest uppercase text-cream/50">
              {tile.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Sezione donazione ────────────────────────────────────────────────────────

function DonazioneSection() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <section className="bg-ink py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <ScrollReveal>
          <Eyebrow center className="mb-5 text-terra-light before:bg-terra-light">
            Fai la differenza
          </Eyebrow>
          <h2 className="text-cream mb-4">
            Ogni euro arriva dove serve
          </h2>
          <p className="font-lora text-cream/65 text-lg mb-14">
            Il 96% dei fondi va direttamente ai bambini. Nessuna intermediazione, nessun margine.
          </p>
        </ScrollReveal>

        {/* IBAN */}
        <ScrollReveal delay={0.1}>
          <div className="space-y-4 mb-12 text-left">
            {ibanList.map((iban) => (
              <div
                key={iban.label}
                className="bg-white/5 border border-white/10 rounded-sm px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <p className="font-sans text-[0.7rem] font-semibold tracking-[.12em] uppercase text-terra-light mb-1">
                    {iban.label}
                  </p>
                  <p className="font-mono text-cream text-[0.95rem] tracking-wide">
                    {iban.display}
                  </p>
                  {iban.note && (
                    <p className="font-sans text-xs text-cream/40 mt-0.5">{iban.note}</p>
                  )}
                </div>
                <button
                  onClick={() => copy(iban.value, iban.label)}
                  aria-label={`Copia IBAN ${iban.label}`}
                  className="flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-terra-light hover:text-cream transition-colors shrink-0"
                >
                  {copied === iban.label
                    ? <><Check className="h-3.5 w-3.5" /> Copiato</>
                    : <><Copy className="h-3.5 w-3.5" /> Copia</>
                  }
                </button>
              </div>
            ))}
            <p className="font-sans text-xs text-cream/35 text-center pt-1">
              Intestato a: {orgInfo.name} — C.F. {orgInfo.codiceFiscale}
            </p>
          </div>
        </ScrollReveal>

        {/* 5×1000 */}
        <ScrollReveal delay={0.2}>
          <div className="bg-gold/10 border border-gold/30 rounded-sm px-8 py-8 mb-10">
            <p className="font-sans text-[0.72rem] font-semibold tracking-[.14em] uppercase text-gold mb-3">
              5×1000 — è gratuito
            </p>
            <p className="font-lora text-cream/70 text-base mb-5">
              Nella dichiarazione dei redditi scrivi il nostro codice fiscale nel riquadro
              "Sostegno del volontariato". Non ti costa nulla.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="font-mono text-2xl font-bold text-cream tracking-widest">
                {orgInfo.codiceFiscale}
              </span>
              <button
                onClick={() => copy(orgInfo.codiceFiscale, 'cf')}
                className="flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-gold hover:text-cream transition-colors"
                aria-label="Copia codice fiscale"
              >
                {copied === 'cf'
                  ? <><Check className="h-3.5 w-3.5" /> Copiato</>
                  : <><Copy className="h-3.5 w-3.5" /> Copia</>
                }
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <Button asChild size="lg">
            <Link to="/cosa-puoi-fare-tu">Tutte le modalità di aiuto</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null)

  return (
    <>
      <Helmet>
        <title>Progetto Briciola ODV — Dal 1992 con Hured, Etiopia</title>
        <meta
          name="description"
          content="Associazione bergamasca che dal 1992 sostiene i bambini di Hured, Etiopia. Adozioni a distanza da €25/mese, donazioni libere e 5×1000."
        />
        <meta property="og:title" content="Progetto Briciola ODV" />
        <meta
          property="og:description"
          content="Dal 1992 sosteniamo il villaggio di Hured in Etiopia. 1000+ bambini aiutati. Il 96% dei fondi va direttamente al bambino."
        />
      </Helmet>

      <HeroSection />
      <StatsBar />
      <ChiSiamoBreve />
      <ComePuoiAiutare />
      <VideoSection onPlay={(id, title) => setActiveVideo({ id, title })} />
      <GalleryStrip />
      <DonazioneSection />

      {activeVideo && (
        <VideoModal
          videoId={activeVideo.id}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  )
}
