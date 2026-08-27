import { Helmet } from 'react-helmet-async'
import { Hospital, GraduationCap, Wrench, Home, HeartHandshake, Stethoscope, BookOpen, Sprout } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Eyebrow } from '@/components/Eyebrow'
import { ScrollReveal } from '@/components/ScrollReveal'
import { timeline, etiopiaStats } from '@/data/content'

const progettiInCorso = [
  {
    icon: Hospital,
    title: 'Invio volontari',
    description:
      "Ogni anno organizziamo due turni da 15 giorni a Hured: in media 15–20 persone tra medici, infermieri e manutentori. Portano competenze, strumenti e presenza umana dove entrambe fanno la differenza.",
    status: 'Annuale',
  },
  {
    icon: GraduationCap,
    title: 'Adozioni a distanza',
    description:
      "260 bambini seguiti oggi, 200 dei quali tramite adozione a distanza. Ogni adozione garantisce cibo, istruzione e cure mediche fino ai 18 anni. Il 96% dei fondi arriva direttamente al bambino: nessuna burocrazia, nessuno spreco.",
    status: 'Attivo',
  },
  {
    icon: Wrench,
    title: 'Mantenimento opere esistenti',
    description:
      "Strade, ponti, acquedotto, cisterne, scuole: ogni infrastruttura costruita richiede manutenzione. Una parte costante del nostro lavoro garantisce che le opere degli anni passati continuino a funzionare per le generazioni future.",
    status: 'Continuo',
  },
  {
    icon: Sprout,
    title: 'Agricoltura e allevamento',
    description:
      "Stiamo raccogliendo fondi per avviare un progetto di sviluppo rurale che cambi le prospettive economiche dei villaggi: campi da coltivare, animali da allevare, risorse che rimangono nella comunità. Un'autonomia che non dipende dagli aiuti, ma li trasforma in futuro.",
    status: 'In sviluppo',
  },
]

const iniziativeSpeciali = [
  {
    icon: Home,
    stat: '25+',
    title: 'Case per senzatetto',
    description:
      "Venticinque abitazioni costruite per le famiglie più vulnerabili di Hured. Mattone dopo mattone, abbiamo trasformato situazioni di precarietà assoluta in un luogo sicuro dove crescere, ripararsi e ricominciare.",
  },
  {
    icon: BookOpen,
    stat: '800+',
    title: 'La scuola di Hured',
    description:
      "Costruita e cresciuta grazie a Progetto Briciola, la scuola di Hured ha formato generazioni di ragazzi: oggi accoglie oltre 800 alunni. È ora gestita dallo Stato etiopico — il segno concreto che un'istituzione nata dal nulla è diventata un pilastro della comunità.",
  },
  {
    icon: Stethoscope,
    stat: '160+',
    title: 'Operazioni prolasso uterino',
    description:
      "Oltre 160 interventi chirurgici finanziati interamente da Progetto Briciola. Il prolasso uterino — patologia diffusa tra le donne di Hured — è debilitante ma curabile. Abbiamo restituito salute e dignità a centinaia di donne.",
  },
]

export default function CosaFacciamo() {
  return (
    <>
      <Helmet>
        <title>Cosa facciamo — Progetto Briciola ODV</title>
        <meta
          name="description"
          content="I progetti di Progetto Briciola a Hured: ospedale, scuole, acquedotto, adozioni a distanza e molto altro dal 1992."
        />
      </Helmet>

      <PageHero
        eyebrow="I nostri progetti"
        title="Cosa facciamo"
        subtitle="Dal 1992 costruiamo infrastrutture, sosteniamo bambini e finanziamo cure mediche nel villaggio di Hured."
        bg="bg-cream"
        align="left"
      />

      {/* ── Progetti in corso ─────────────────────────────────────────────── */}
      <section className="bg-sand py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <Eyebrow className="mb-5">Oggi</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="text-ink max-w-xl mb-14">Progetti in corso</h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-8">
            {progettiInCorso.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="bg-white rounded-sm p-10 h-full flex flex-col transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 rounded-sm bg-terra/10 flex items-center justify-center mb-6 shrink-0">
                    <p.icon className="w-6 h-6 text-terra" strokeWidth={1.5} />
                  </div>
                  <span className="font-sans text-[0.72rem] font-semibold tracking-[.12em] uppercase text-terra mb-3">
                    {p.status}
                  </span>
                  <h3 className="font-display text-xl text-ink leading-snug mb-4">{p.title}</h3>
                  <p className="font-lora text-ink-light leading-relaxed text-base flex-1">
                    {p.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <ScrollReveal>
              <Eyebrow center className="mb-5">Dal 1992 ad oggi</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 className="text-ink">Quello che abbiamo costruito</h2>
            </ScrollReveal>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* linea verticale */}
            <div className="absolute left-[3.25rem] sm:left-1/2 top-0 bottom-0 w-px bg-terra/20 -translate-x-1/2" />

            <div className="space-y-0">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div
                      className={`relative flex items-start gap-6 sm:gap-0 pb-10 ${
                        isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                      }`}
                    >
                      {/* testo */}
                      <div
                        className={`flex-1 pl-20 sm:pl-0 ${
                          isLeft ? 'sm:pr-14 sm:text-right' : 'sm:pl-14 sm:text-left'
                        }`}
                      >
                        <p className="font-display text-[1.05rem] text-ink font-normal leading-snug">
                          {item.title}
                        </p>
                      </div>

                      {/* dot + anno */}
                      <div className="absolute left-10 sm:left-1/2 top-0 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-terra border-2 border-white ring-2 ring-terra/30 shrink-0" />
                        <span className="mt-1 font-sans text-[0.72rem] font-bold tracking-wider text-terra">
                          {item.year}
                        </span>
                      </div>

                      {/* spacer lato opposto su desktop */}
                      <div className="hidden sm:block flex-1" />
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Iniziative speciali ───────────────────────────────────────────── */}
      <section className="bg-terra py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <ScrollReveal>
              <Eyebrow
                center
                className="mb-5 text-terra-light before:bg-terra-light"
              >
                Oltre i progetti
              </Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 className="text-cream">Iniziative speciali</h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {iniziativeSpeciali.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6 text-cream" strokeWidth={1.5} />
                  </div>
                  {item.stat !== '—' && (
                    <p className="font-display text-[3.5rem] leading-none text-gold mb-2">
                      {item.stat}
                    </p>
                  )}
                  <h3 className="font-display text-xl text-cream mb-4">{item.title}</h3>
                  <p className="font-lora text-cream/80 leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statistiche Etiopia ───────────────────────────────────────────── */}
      <section className="bg-ink py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <ScrollReveal>
              <Eyebrow
                center
                className="mb-5 text-terra-light before:bg-terra-light"
              >
                Il contesto
              </Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 className="text-cream">Perché Hured ha bisogno di noi</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <p className="mt-4 font-lora text-cream/70 text-lg leading-relaxed">
                I numeri dell'Etiopia rurale raccontano una realtà che non lascia spazio
                all'indifferenza.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 rounded-sm overflow-hidden">
            {etiopiaStats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-ink/90 p-8 lg:p-10 flex flex-col gap-2 h-full">
                  <p className="font-display text-[2.8rem] lg:text-[3.2rem] leading-none text-terra-light">
                    {stat.value}
                  </p>
                  <p className="font-lora text-cream/80 leading-snug text-[0.95rem] lg:text-base">
                    {stat.label}
                  </p>
                  <p className="font-sans text-[0.68rem] tracking-[.1em] uppercase text-cream/30 mt-auto pt-4">
                    Fonte: {stat.source}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
