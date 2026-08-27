import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Check, Copy, Heart, Building2, FileText, HandHeart } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Eyebrow } from '@/components/Eyebrow'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { ibanList, adozioneInfo, orgInfo } from '@/data/content'

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 font-sans text-[0.72rem] font-semibold tracking-[.1em] uppercase text-terra hover:text-terra-dark transition-colors"
      aria-label={`Copia ${label ?? value}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copiato
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copia
        </>
      )}
    </button>
  )
}

function IbanCard({ iban }: { iban: (typeof ibanList)[number] }) {
  return (
    <div className="bg-white rounded-sm p-8 flex flex-col gap-4 h-full">
      <p className="font-sans text-[0.78rem] font-semibold tracking-[.12em] uppercase text-terra">
        {iban.label}
      </p>
      <p className="font-mono text-ink text-[1rem] leading-relaxed tracking-wide break-all">
        {iban.display}
      </p>
      {iban.note && (
        <p className="font-lora text-ink-light text-sm">{iban.note}</p>
      )}
      <div className="mt-auto pt-2">
        <CopyButton value={iban.value} label={`IBAN ${iban.label}`} />
      </div>
    </div>
  )
}

export default function CosaPuoiFareTu() {
  return (
    <>
      <Helmet>
        <title>Come puoi aiutare — Progetto Briciola ODV</title>
        <meta
          name="description"
          content="Adozione a distanza da €25/mese, donazioni libere via bonifico, 5×1000 gratuito, lasciti e sponsorizzazioni aziendali."
        />
      </Helmet>

      <PageHero
        eyebrow="Fai la differenza"
        title="Cosa puoi fare tu"
        subtitle="Dal 1992 ad oggi l'attività di Progetto Briciola è sempre stata in costante crescita. Il vostro aiuto è fondamentale per continuare in questo impegno umanitario."
        bg="bg-sand"
        align="left"
      />

      {/* ── Adozione a distanza ───────────────────────────────────────────── */}
      <section id="adozione" className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* testo */}
            <div>
              <ScrollReveal>
                <Eyebrow className="mb-5">La scelta più concreta</Eyebrow>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <h2 className="text-ink mb-6">Adozione a distanza</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.14}>
                <p className="font-lora text-ink-light text-lg leading-relaxed mb-6">
                  Con <strong className="text-ink font-semibold">€25 al mese</strong> sostieni un
                  bambino specifico — scelto da te — per tutto il percorso fino ai 18 anni. Cibo,
                  istruzione, cure mediche: il <strong className="text-ink font-semibold">96%</strong>{' '}
                  dei fondi arriva direttamente a lui.
                </p>
                <p className="font-lora text-ink-light text-lg leading-relaxed mb-8">
                  Oggi seguiamo <strong className="text-ink font-semibold">260 bambini</strong>, di
                  cui 200 tramite adozione a distanza. Ogni bambino ha un nome, una storia, un
                  futuro che dipende anche da te.
                </p>
              </ScrollReveal>

              {/* opzioni versamento */}
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-3 gap-3 mb-10">
                  {[
                    { label: 'Annuale', amount: adozioneInfo.annuale },
                    { label: 'Semestrale', amount: adozioneInfo.semestrale },
                    { label: 'Trimestrale', amount: adozioneInfo.trimestrale },
                  ].map((opt) => (
                    <div
                      key={opt.label}
                      className="bg-sand rounded-sm p-4 text-center border border-sand-dark"
                    >
                      <p className="font-display text-2xl text-terra leading-none mb-1">
                        €{opt.amount}
                      </p>
                      <p className="font-sans text-[0.72rem] font-semibold tracking-[.1em] uppercase text-ink-light">
                        {opt.label}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.26}>
                <Button
                  asChild
                  className="bg-terra hover:bg-terra-dark text-cream font-sans font-semibold tracking-[.06em] uppercase rounded-sm px-8 py-4 transition-all hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(193,102,58,.35)]"
                >
                  <a href={`mailto:${orgInfo.emailAdozioni}`}>
                    <Heart className="w-4 h-4 mr-2" />
                    Adotta un bambino
                  </a>
                </Button>
                <p className="mt-3 font-sans text-[0.72rem] text-ink-light/60 tracking-wide">
                  Scriverai direttamente al team adozioni — ti risponderemo entro 48 ore.
                </p>
              </ScrollReveal>
            </div>

            {/* callout numeri */}
            <ScrollReveal delay={0.1}>
              <div className="bg-terra rounded-sm p-10 lg:p-14 text-cream">
                <p className="font-display text-[0.85rem] tracking-[.12em] uppercase text-terra-light mb-8">
                  In numeri
                </p>
                <div className="space-y-8">
                  {[
                    { value: '€25', desc: 'al mese per sostenere un bambino' },
                    { value: '96%', desc: 'dei fondi va direttamente al bambino' },
                    { value: '260', desc: 'bambini attualmente in carico' },
                    { value: '18', desc: 'anni: la durata dell\'adozione' },
                  ].map((item) => (
                    <div key={item.value} className="flex items-baseline gap-4">
                      <p className="font-display text-4xl text-gold leading-none w-24 shrink-0">
                        {item.value}
                      </p>
                      <p className="font-lora text-cream/80 leading-snug">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Donazioni libere ──────────────────────────────────────────────── */}
      <section id="donazioni" className="bg-sand py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-12">
            <ScrollReveal>
              <Eyebrow className="mb-5">Bonifico bancario</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 className="text-ink mb-4">Donazioni libere</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <p className="font-lora text-ink-light text-lg leading-relaxed">
                Puoi donare l'importo che vuoi, quando vuoi, tramite bonifico bancario o bollettino
                postale. Ogni importo fa la differenza.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {ibanList.map((iban, i) => (
              <ScrollReveal key={iban.label} delay={i * 0.08}>
                <IbanCard iban={iban} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="bg-terra/8 border border-terra/20 rounded-sm p-6 flex flex-wrap items-center gap-x-12 gap-y-4">
              <div>
                <p className="font-sans text-[0.72rem] font-semibold tracking-[.12em] uppercase text-ink-light mb-1">
                  Intestatario
                </p>
                <p className="font-display text-xl text-ink">{orgInfo.name}</p>
              </div>
              <div className="hidden sm:block w-px self-stretch bg-terra/20" />
              <div>
                <p className="font-sans text-[0.72rem] font-semibold tracking-[.12em] uppercase text-ink-light mb-1">
                  Codice Fiscale
                </p>
                <p className="font-mono text-ink text-xl tracking-wider">{orgInfo.codiceFiscale}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 5×1000 ────────────────────────────────────────────────────────── */}
      <section id="cinquepermille" className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <Eyebrow className="mb-5">Non ti costa nulla</Eyebrow>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <h2 className="text-ink mb-6">5×1000</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.14}>
                <p className="font-lora text-ink-light text-lg leading-relaxed mb-10">
                  Il 5×1000 è una quota delle tue tasse che lo Stato destina a un'organizzazione
                  non-profit a tua scelta. Non è un costo aggiuntivo: è denaro già dovuto al fisco
                  che puoi redirigere verso chi fa del bene. Basta una firma.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="space-y-8">
                  {[
                    {
                      n: '1',
                      title: 'Hai la dichiarazione dei redditi?',
                      body: 'Nella sezione "Sostegno del volontariato e delle altre organizzazioni non lucrative" firma e scrivi il codice fiscale 02996790164 nell\'apposita casella.',
                    },
                    {
                      n: '2',
                      title: 'Sei esonerato dalla dichiarazione?',
                      body: 'Puoi destinare il 5×1000 lo stesso. Recati al CAF o all\'ufficio postale e chiedi il modulo apposito: la firma è gratuita e non comporta nessun obbligo.',
                    },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-6">
                      <div className="w-9 h-9 rounded-full bg-terra text-cream flex items-center justify-center font-display font-bold text-lg shrink-0 mt-0.5">
                        {step.n}
                      </div>
                      <div>
                        <p className="font-sans font-semibold text-ink text-[1rem] mb-2">{step.title}</p>
                        <p className="font-lora text-ink-light leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Codice fiscale callout */}
            <ScrollReveal delay={0.1}>
              <div className="bg-ink rounded-sm p-10 lg:p-14 text-center flex flex-col items-center gap-8">
                <div>
                  <p className="font-sans text-[0.78rem] font-semibold tracking-[.14em] uppercase text-terra-light mb-6">
                    Codice fiscale da inserire
                  </p>
                  <p className="font-mono text-gold text-[2.4rem] sm:text-[3rem] leading-none tracking-[.14em]">
                    {orgInfo.codiceFiscale}
                  </p>
                </div>
                <CopyButton value={orgInfo.codiceFiscale} label="codice fiscale" />
                <div className="w-full pt-6 border-t border-white/10 text-left">
                  <p className="font-sans text-[0.72rem] font-semibold tracking-[.1em] uppercase text-terra-light mb-2">
                    Dove trovare la casella
                  </p>
                  <p className="font-lora text-cream/60 text-sm leading-relaxed">
                    Modello 730 o Redditi PF — sezione <em>"Sostegno del volontariato e delle
                    organizzazioni non lucrative di utilità sociale"</em>.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Lasciti e testamenti ──────────────────────────────────────────── */}
      <section id="lasciti" className="bg-sand py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <ScrollReveal>
                <Eyebrow className="mb-5">Un gesto che dura nel tempo</Eyebrow>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <h2 className="text-ink mb-6">Lasciti e testamenti</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.14}>
                <p className="font-lora text-ink-light text-lg leading-relaxed mb-6">
                  C'è chi, nel momento in cui pensa al proprio futuro, sceglie di lasciare
                  qualcosa a chi ha meno. Un lascito a Progetto Briciola è un gesto di speranza
                  che continua a fare del bene molto dopo di noi.
                </p>
                <p className="font-lora text-ink-light text-lg leading-relaxed">
                  Per informazioni su come predisporre un lascito testamentario, ti invitiamo a
                  contattarci direttamente: ti accompagneremo con discrezione in ogni passaggio.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-sm p-10">
                <p className="font-sans text-[0.78rem] font-semibold tracking-[.12em] uppercase text-terra mb-6">
                  Cosa si può lasciare
                </p>
                <ul className="space-y-3">
                  {[
                    'Denaro contante o depositi bancari',
                    'Beni mobili (gioielli, oggetti d\'arte, collezioni)',
                    'Beni immobili (case, terreni)',
                    'TFR non ancora riscosso',
                    'Polizze assicurative sulla vita',
                    'Raccolte fondi in occasione del proprio funerale',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-lora text-ink-light">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-terra shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-sand-dark">
                  <Button
                    asChild
                    variant="outline"
                    className="border-terra text-terra hover:bg-terra hover:text-cream font-sans font-semibold tracking-[.06em] uppercase rounded-sm transition-colors"
                  >
                    <a href={`mailto:${orgInfo.emailInfo}`}>Contattaci per informazioni</a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Per le aziende ────────────────────────────────────────────────── */}
      <section id="aziende" className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-16">
            <ScrollReveal>
              <Eyebrow className="mb-5">Responsabilità sociale</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 className="text-ink mb-4">Per le aziende</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <p className="font-lora text-ink-light text-lg leading-relaxed">
                Le aziende possono contribuire con sponsorizzazioni economiche o con il supporto
                tecnico dei propri professionisti. Il vostro aiuto ci permette di pianificare
                progetti a lungo termine.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ScrollReveal delay={0}>
              <div className="bg-white border border-sand-dark rounded-sm p-10 h-full">
                <div className="w-12 h-12 rounded-sm bg-terra/10 flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6 text-terra" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl text-ink mb-4">Sponsorizzazione economica</h3>
                <p className="font-lora text-ink-light leading-relaxed">
                  Contribuisci al finanziamento diretto di progetti specifici — una scuola, un
                  blocco dell'ospedale, un sistema idrico. Riceverai aggiornamenti documentati
                  sull'utilizzo dei fondi e potrai comunicare il tuo impegno ai tuoi clienti e
                  collaboratori.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-white border border-sand-dark rounded-sm p-10 h-full">
                <div className="w-12 h-12 rounded-sm bg-terra/10 flex items-center justify-center mb-6">
                  <HandHeart className="w-6 h-6 text-terra" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl text-ink mb-4">Supporto tecnico</h3>
                <p className="font-lora text-ink-light leading-relaxed">
                  Sei un'impresa edile, un ingegnere, un medico, un professionista IT? Le tue
                  competenze valgono quanto il denaro. Contattaci per scoprire come mettere a
                  disposizione il know-how della tua azienda per i nostri progetti in Etiopia.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Benefici fiscali in accordion */}
          <ScrollReveal delay={0.2}>
            <div className="bg-sand border border-sand-dark rounded-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-5 h-5 text-terra shrink-0" strokeWidth={1.5} />
                <p className="font-sans font-semibold text-ink tracking-wide">
                  Benefici fiscali per le aziende
                </p>
              </div>
              <Accordion type="single" collapsible className="max-w-3xl">
                <AccordionItem value="art14">
                  <AccordionTrigger>
                    Art. 14 D.L. 35/2005 — Deducibilità dal reddito d'impresa
                  </AccordionTrigger>
                  <AccordionContent>
                    Le erogazioni liberali in denaro a favore di ODV sono deducibili dal reddito
                    complessivo del soggetto erogante <strong>fino al 10% del reddito dichiarato</strong>{' '}
                    e, comunque, nella misura massima di <strong>€70.000 annui</strong>.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="art100">
                  <AccordionTrigger>
                    Art. 100 c. 2 lett. h) D.P.R. 917/86 — Spese di pubblicità
                  </AccordionTrigger>
                  <AccordionContent>
                    Le erogazioni a enti non-profit per attività culturali e di spettacolo sono
                    deducibili dal reddito d'impresa fino a{' '}
                    <strong>€2.065,83 o al 2% del reddito d'impresa dichiarato</strong>.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <p className="mt-6 font-sans text-[0.72rem] text-ink-light/60 leading-relaxed max-w-3xl">
                Ti consigliamo di verificare la normativa vigente con il tuo consulente fiscale.
                Progetto Briciola è iscritta al RUNTS come ODV, CF 02996790164.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
