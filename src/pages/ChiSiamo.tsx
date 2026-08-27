import { Helmet } from 'react-helmet-async'
import { FileText, Camera } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Eyebrow } from '@/components/Eyebrow'
import { PageHero } from '@/components/PageHero'
import { team, teamEtiopia } from '@/data/content'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const avatarPalette = [
  'bg-terra/15 text-terra-dark',
  'bg-gold/20 text-ink',
  'bg-sand-dark text-ink-light',
  'bg-terra-light/20 text-terra-dark',
  'bg-ink/10 text-ink',
]

function initials(name: string) {
  return name
    .replace(/["""]/g, '')
    .split(' ')
    .filter((w) => w.length > 1 && !/^["']/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

// ─── Sezione Perché Briciola ──────────────────────────────────────────────────

function PercheBriciola() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-xl mb-16">
            <Eyebrow className="mb-5">Le origini</Eyebrow>
            <h2 className="text-ink">Perché "Briciola"?</h2>
          </div>
        </ScrollReveal>

        {/* Layout editoriale — testo largo + immagine */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* Colonna testo — 3/5 */}
          <div className="lg:col-span-3 space-y-6 font-lora text-ink-light text-[1.05rem] leading-[1.8]">
            <ScrollReveal>
              <p>
                Progetto Briciola ODV è un'associazione italiana non lucrativa nata nel{' '}
                <strong className="text-ink font-medium">1992</strong> con finalità di solidarietà
                internazionale a favore dei bambini orfani e di strada in Etiopia, in particolare
                nel villaggio di Hured, nella provincia di Shoa.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <p>
                Il nome nasce da una storia vera. Nasce dalla visione di Busu di aiutare il suo
                popolo: i primi contributi erano appena 500 lire — briciole, letteralmente. Un nome
                scelto non per caso, ma per portare con sé un messaggio preciso: basta davvero poco
                per fare la differenza nella vita di qualcuno. Anche una briciola, donata con il
                cuore, può accendere una speranza.
              </p>
            </ScrollReveal>

            {/* Pull quote */}
            <ScrollReveal delay={0.12}>
              <blockquote className="border-l-[3px] border-terra pl-6 my-10 font-serif italic text-xl text-ink leading-relaxed not-italic">
                <span className="italic">
                  "Piccolo quanto una briciola, ma grande nella sua carica di speranza."
                </span>
              </blockquote>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <p>
                L'ispirazione viene dal{' '}
                <strong className="text-ink font-medium">Secondo Libro dei Re, capitolo 7</strong>
                : quattro lebbrosi ai margini di una città assediata e affamata decidono di alzarsi
                e andare incontro al nemico. Nulla li ferma, perché la sola alternativa è la morte
                certa. Arrivano all'accampamento nemico e lo trovano vuoto — la provvidenza li ha
                preceduti.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p>
                Quella stessa fiducia — che basti una briciola di coraggio per rompere
                l'immobilismo — è il cuore del nome. Come i quattro lebbrosi del Secondo Libro dei
                Re che, invece di restare fermi ad aspettare la morte, decisero di muoversi verso
                l'ignoto e trovarono abbondanza, così i fondatori di Progetto Briciola scelsero di
                agire: non aspettare che qualcun altro risolvesse, ma fare il primo passo, piccolo
                quanto una briciola, nella direzione giusta.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <p>
                Dal 1992 ad oggi quell'impulso originario si è trasformato in azione concreta:{' '}
                scuole, un ospedale, un acquedotto, strade, chiese. E soprattutto{' '}
                <strong className="text-ink font-medium">oltre mille bambini</strong> sostenuti
                attraverso le adozioni a distanza.
              </p>
            </ScrollReveal>
          </div>

          {/* Colonna destra — immagine + sidebar info */}
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="aspect-[3/4] bg-sand rounded-sm overflow-hidden flex flex-col items-center justify-center gap-3 text-ink-light/40">
                <Camera className="h-10 w-10" />
                <span className="font-sans text-xs tracking-widest uppercase">Foto in arrivo</span>
              </div>
            </ScrollReveal>

            {/* Card laterale con la citazione biblica */}
            <ScrollReveal delay={0.18}>
              <div className="bg-sand rounded-sm p-7">
                <p className="font-sans text-[0.7rem] font-semibold tracking-[.14em] uppercase text-terra mb-3">
                  2 Re 7:3
                </p>
                <p className="font-serif italic text-ink text-base leading-relaxed">
                  "Perché stiamo qui ad aspettare la morte? […] Andiamo all'accampamento degli
                  Aramei: se ci lasciano vivere, vivremo; se ci fanno morire, moriremo."
                </p>
              </div>
            </ScrollReveal>

            {/* Card fondazione */}
            <ScrollReveal delay={0.22}>
              <div className="bg-terra/8 border border-terra/20 rounded-sm p-7">
                <dl className="space-y-4">
                  {[
                    { dt: 'Fondata', dd: '1992' },
                    { dt: 'Iscritta come ODV', dd: '2002' },
                    { dt: 'Sede operativa', dd: 'Bergamo' },
                    { dt: 'Codice Fiscale', dd: '02996790164' },
                  ].map(({ dt, dd }) => (
                    <div key={dt}>
                      <dt className="font-sans text-[0.7rem] font-semibold tracking-[.12em] uppercase text-ink-light/60">
                        {dt}
                      </dt>
                      <dd className="font-serif text-lg text-ink mt-0.5">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Sezione Team ─────────────────────────────────────────────────────────────

function TeamCard({
  name,
  role,
  colorClass,
}: {
  name: string
  role: string
  colorClass: string
}) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 text-lg font-serif font-bold transition-transform duration-300 group-hover:scale-105 ${colorClass}`}
        aria-hidden="true"
      >
        {initials(name)}
      </div>
      <h3 className="font-serif text-base text-ink mb-0.5">{name}</h3>
      <p className="font-sans text-[0.72rem] font-semibold tracking-[.1em] uppercase text-terra">
        {role}
      </p>
    </div>
  )
}

function TeamSection() {
  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Team Italia */}
        <ScrollReveal>
          <div className="mb-14">
            <Eyebrow className="mb-5">Le persone</Eyebrow>
            <h2 className="text-ink">Il team</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 mb-20">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.07}>
              <TeamCard
                {...member}
                colorClass={avatarPalette[i % avatarPalette.length]}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Divisore */}
        <ScrollReveal>
          <div className="border-t border-sand-dark mb-16" />
        </ScrollReveal>

        {/* Referenti Etiopia */}
        <ScrollReveal>
          <div className="mb-12">
            <Eyebrow className="mb-4">Sul campo</Eyebrow>
            <h3 className="font-serif text-2xl text-ink">Referenti in Etiopia</h3>
            <p className="mt-3 font-lora text-ink-light max-w-lg">
              Il lavoro a Hured è coordinato dall'associazione locale{' '}
              <strong className="text-ink font-medium">TESFA</strong>, che gestisce i progetti
              sul territorio.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamEtiopia.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.1}>
              <TeamCard
                name={member.name}
                role={`${member.role} · ${member.location}`}
                colorClass={avatarPalette[(team.length + i) % avatarPalette.length]}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Organi Statutari ─────────────────────────────────────────────────────────

function OrganiStatutari() {
  return (
    <section className="bg-cream py-16 lg:py-20 border-t border-sand-dark">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">

            <div>
              <Eyebrow className="mb-5">Governance</Eyebrow>
              <h3 className="font-serif text-2xl text-ink mb-4">Organi statutari</h3>
              <p className="font-lora text-ink-light">
                <span className="font-sans text-xs font-semibold tracking-widest uppercase text-terra">
                  Assemblea dei soci
                </span>
                <br />
                Franco Zana · Bzunesh Kifle · Davide Manenti
              </p>
            </div>


          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ─── Pagina ───────────────────────────────────────────────────────────────────

export default function ChiSiamo() {
  return (
    <>
      <Helmet>
        <title>Chi siamo — Progetto Briciola ODV</title>
        <meta
          name="description"
          content="La storia di Progetto Briciola ODV: dal 1992 a Hured, Etiopia. Le origini del nome, il team e la filosofia dell'associazione."
        />
        <meta property="og:title" content="Chi siamo — Progetto Briciola ODV" />
      </Helmet>

      <PageHero
        eyebrow="La nostra storia"
        title="Chi siamo"
        subtitle="Un'associazione bergamasca nata nel 1992 da un gesto semplice: la scelta di non restare fermi."
        bg="bg-sand"
        align="left"
      />
      <PercheBriciola />
      <TeamSection />
      <OrganiStatutari />
    </>
  )
}
