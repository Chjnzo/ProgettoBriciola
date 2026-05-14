import { Helmet } from 'react-helmet-async'
import { MapPin, Globe, Users, Languages, Church, Coins, Clock } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Eyebrow } from '@/components/Eyebrow'
import { ScrollReveal } from '@/components/ScrollReveal'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { etiopiaFacts, etiopiaStats } from '@/data/content'

const factIcons: Record<string, React.ElementType> = {
  Capitale:     Globe,
  Superficie:   MapPin,
  Popolazione:  Users,
  Lingue:       Languages,
  Religioni:    Church,
  Moneta:       Coins,
  'Fuso orario': Clock,
}

const volunteerFaqs = [
  {
    value: 'visti',
    title: 'Passaporti e visti',
    content:
      'È necessario il passaporto valido. Il visto di ingresso va richiesto all\'Ambasciata Etiope prima della partenza. Verifica i requisiti aggiornati sul sito dell\'ambasciata italiana a Addis Abeba.',
  },
  {
    value: 'vaccinazioni',
    title: 'Vaccinazioni',
    content:
      'Obbligatoria la vaccinazione contro la Febbre Gialla. Raccomandate: epatite A e B, tifo, meningite, tetano. Portare con sé il libretto vaccinale internazionale.',
  },
  {
    value: 'bagaglio',
    title: 'Bagaglio',
    content:
      'La franchigia standard è di 20 kg. È possibile portare materiale di utilità (medicinali, cancelleria, abbigliamento) da destinare alla comunità — concordare con il team prima della partenza.',
  },
  {
    value: 'clima',
    title: 'Clima e stagioni',
    content:
      'Stagione piovosa: giugno–settembre. Stagione secca: ottobre–maggio. Le temperature nella zona di Guraghe sono miti tutto l\'anno (altitudine ~2.000 m slm). Portare strati leggeri e un impermeabile.',
  },
  {
    value: 'abbigliamento',
    title: 'Abbigliamento',
    content:
      'Abbigliamento sobrio e rispettoso della cultura locale. Evitare pantaloni corti e spalle scoperte nei villaggi. Indispensabili scarpe robuste per i percorsi su strade sterrate.',
  },
  {
    value: 'valuta',
    title: 'Valuta e pagamenti',
    content:
      'La valuta locale è il Birr etiope (ETB). I pagamenti sono quasi esclusivamente in contanti. Portare euro da cambiare in loco presso banche o uffici cambio ad Addis Abeba.',
  },
  {
    value: 'strade',
    title: 'Strade e trasporti',
    content:
      'Le strade verso Hured sono in parte sterrate e sconnesse. Attenzione ai problemi alla schiena su lunghi percorsi fuoristrada — portare cuscino lombare. Consigliati veicoli 4×4.',
  },
  {
    value: 'telefono',
    title: 'Telefono e connessione',
    content:
      'Prefisso Italia: 0039. Prefisso Etiopia: 00251. La copertura nella zona di Hured è limitata. Ethio Telecom è l\'operatore principale — una SIM locale è acquistabile ad Addis Abeba.',
  },
  {
    value: 'sicurezza',
    title: 'Sicurezza degli oggetti di valore',
    content:
      'Non esibire oggetti di valore (gioielli, dispositivi costosi) nei mercati o nei luoghi affollati. Ad Addis Abeba prestare la stessa attenzione di qualsiasi grande città. La zona di Hured è generalmente tranquilla.',
  },
]

export default function Etiopia() {
  return (
    <>
      <Helmet>
        <title>L'Etiopia — Progetto Briciola Onlus</title>
        <meta
          name="description"
          content="Hured, Woreda di Enemorina, Zona di Guraghe: dove lavoriamo. Scheda paese, contesto sociale e info utili per i volontari."
        />
      </Helmet>

      <PageHero
        eyebrow="Dove operiamo"
        title="L'Etiopia"
        subtitle="Hured si trova nella Zona di Guraghe, regione SNNPR. Un villaggio remoto, raggiungibile da Gunchire, sede amministrativa più vicina."
        bg="bg-cream"
        align="left"
      />

      {/* ── Dove si trova Hured ───────────────────────────────────────────── */}
      <section className="bg-sand py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <Eyebrow className="mb-5">Localizzazione</Eyebrow>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <h2 className="text-ink mb-6">Dove si trova Hured</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.14}>
                <p className="font-lora text-ink-light text-lg leading-relaxed mb-5">
                  Hured è un piccolo villaggio nella <strong className="text-ink font-semibold">Woreda
                  di Enemorina and Eaner</strong>, parte della <strong className="text-ink font-semibold">Zona
                  di Guraghe</strong> nella regione SNNPR (Southern Nations, Nationalities and Peoples'
                  Region) dell'Etiopia.
                </p>
                <p className="font-lora text-ink-light text-lg leading-relaxed mb-5">
                  Il centro amministrativo più vicino è <strong className="text-ink font-semibold">Gunchire</strong>,
                  raggiungibile da Addis Abeba in circa 4–5 ore su strada. L'ultimo tratto fino a
                  Hured percorre strade sterrate di montagna.
                </p>
                <p className="font-lora text-ink-light text-lg leading-relaxed">
                  L'isolamento geografico è uno dei motivi principali per cui la comunità di Hured
                  fatica ad accedere a servizi essenziali come cure mediche, istruzione e acqua
                  potabile — e perché la presenza di Progetto Briciola fa una differenza così concreta.
                </p>
              </ScrollReveal>
            </div>

            {/* Mappa embed */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-sm overflow-hidden shadow-md aspect-[4/3] bg-sand-dark">
                <iframe
                  title="Mappa di Hured, Etiopia"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126804.44!2d37.85!3d8.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b02f2b3e6c2c1d%3A0x0!2sHured%2C+Ethiopia!5e1!3m2!1sit!2sit!4v1"
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Scheda paese ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <ScrollReveal>
              <Eyebrow center className="mb-5">Dati essenziali</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 className="text-ink">Scheda paese</h2>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {etiopiaFacts.map((fact, i) => {
              const Icon = factIcons[fact.label] ?? Globe
              return (
                <ScrollReveal key={fact.label} delay={i * 0.06}>
                  <div className="bg-white rounded-sm p-8 flex flex-col gap-3 h-full transition-transform hover:-translate-y-1 duration-300">
                    <div className="w-10 h-10 rounded-sm bg-terra/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-terra" strokeWidth={1.5} />
                    </div>
                    <p className="font-sans text-[0.72rem] font-semibold tracking-[.12em] uppercase text-terra">
                      {fact.label}
                    </p>
                    <p className="font-lora text-ink leading-snug">{fact.value}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Contesto sociale ──────────────────────────────────────────────── */}
      <section className="bg-ink py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <Eyebrow className="mb-5 text-terra-light before:bg-terra-light">
                  Il contesto
                </Eyebrow>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <h2 className="text-cream mb-6">Una realtà che non lascia spazio all'indifferenza</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.14}>
                <p className="font-lora text-cream/70 text-lg leading-relaxed mb-5">
                  L'Etiopia è uno dei paesi più poveri del mondo. Nelle zone rurali come Hured, la
                  situazione è ancora più critica: servizi sanitari assenti, scuole insufficienti,
                  accesso all'acqua potabile limitato a poco più della metà della popolazione.
                </p>
                <p className="font-lora text-cream/70 text-lg leading-relaxed">
                  I numeri che seguono non sono astratti: sono le condizioni di vita quotidiana delle
                  famiglie che Progetto Briciola cerca di sostenere da oltre trent'anni.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {etiopiaStats.map((stat, i) => (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <div className="bg-white/5 rounded-sm p-6 flex flex-col gap-2">
                    <p className="font-display text-[2.4rem] leading-none text-terra-light">
                      {stat.value}
                    </p>
                    <p className="font-lora text-cream/75 text-sm leading-snug">{stat.label}</p>
                    <p className="font-sans text-[0.65rem] tracking-[.1em] uppercase text-cream/30 mt-auto">
                      {stat.source}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Info volontari ────────────────────────────────────────────────── */}
      <section className="bg-sand py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <ScrollReveal>
                <Eyebrow className="mb-5">Prima di partire</Eyebrow>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <h2 className="text-ink mb-6">Info utili per i volontari</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.14}>
                <p className="font-lora text-ink-light text-lg leading-relaxed">
                  Ogni anno un gruppo di volontari parte per Hured. Se stai pensando di unirti a
                  una missione, queste sono le informazioni pratiche da sapere prima di partire.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.1}>
              <Accordion type="multiple" className="bg-white rounded-sm px-6 sm:px-10">
                {volunteerFaqs.map((faq) => (
                  <AccordionItem key={faq.value} value={faq.value}>
                    <AccordionTrigger>{faq.title}</AccordionTrigger>
                    <AccordionContent>{faq.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
