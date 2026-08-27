import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Helmet } from 'react-helmet-async'
import { MapPin, Phone, Facebook, Instagram, Youtube, Send, ExternalLink } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Eyebrow } from '@/components/Eyebrow'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { orgInfo } from '@/data/content'

// ─── Schema validazione ───────────────────────────────────────────────────────
const schema = z.object({
  nome:     z.string().min(2, 'Inserisci il tuo nome (almeno 2 caratteri)'),
  email:    z.string().email('Inserisci un indirizzo email valido'),
  oggetto:  z.string().min(3, 'Inserisci un oggetto (almeno 3 caratteri)'),
  messaggio: z.string().min(20, 'Il messaggio deve contenere almeno 20 caratteri'),
  privacy:  z.literal(true, { errorMap: () => ({ message: 'Devi accettare la privacy policy' }) }),
})

type FormData = z.infer<typeof schema>

// ─── Campo form con etichetta ed errore ───────────────────────────────────────
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-[0.78rem] font-semibold tracking-[.08em] uppercase text-ink">
        {label}
        {required && <span className="text-terra ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="font-sans text-[0.72rem] text-terra mt-0.5">{error}</p>
      )}
    </div>
  )
}

// ─── Blocco informazione contatto ─────────────────────────────────────────────
function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-start gap-4 group">
      <div className="w-9 h-9 rounded-sm bg-terra/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-terra/20 transition-colors">
        <Icon className="w-4 h-4 text-terra" strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-sans text-[0.72rem] font-semibold tracking-[.1em] uppercase text-ink-light/60 mb-0.5">
          {label}
        </p>
        <p className="font-lora text-ink">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {content}
      </a>
    )
  }
  return content
}

// ─── Pagina ───────────────────────────────────────────────────────────────────
export default function Contatti() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    const body = `Nome: ${data.nome}\nEmail: ${data.email}\n\n${data.messaggio}`
    const mailto = `mailto:${orgInfo.emailInfo}?subject=${encodeURIComponent(data.oggetto)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    toast.success('Apertura client email…', {
      description: 'Si aprirà la tua app di posta con il messaggio precompilato.',
    })
    reset()
  }

  return (
    <>
      <Helmet>
        <title>Contatti — Progetto Briciola ODV</title>
        <meta
          name="description"
          content="Contatta Progetto Briciola ODV. Via F. Corridoni 61, Bergamo. Tel. +39 339 3849741."
        />
      </Helmet>

      <PageHero
        eyebrow="Siamo qui"
        title="Contatti"
        subtitle="Scrivici per adozioni a distanza, donazioni, informazioni sulle missioni o per qualsiasi domanda. Ti risponderemo entro 48 ore."
        bg="bg-cream"
        align="left"
      />

      {/* ── Form + info ───────────────────────────────────────────────────── */}
      <section className="bg-sand py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-16 items-start">

            {/* Form */}
            <ScrollReveal>
              <div className="bg-white rounded-sm p-8 sm:p-12">
                <h2 className="font-display text-2xl text-ink mb-2">Scrivici</h2>
                <p className="font-lora text-ink-light mb-8">
                  Tutti i campi contrassegnati con <span className="text-terra">*</span> sono obbligatori.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Nome e cognome" error={errors.nome?.message} required>
                      <Input
                        {...register('nome')}
                        placeholder="Mario Rossi"
                        autoComplete="name"
                        aria-invalid={!!errors.nome}
                      />
                    </Field>

                    <Field label="Email" error={errors.email?.message} required>
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="mario@esempio.it"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                      />
                    </Field>
                  </div>

                  <Field label="Oggetto" error={errors.oggetto?.message} required>
                    <Input
                      {...register('oggetto')}
                      placeholder="Informazioni sull'adozione a distanza"
                      aria-invalid={!!errors.oggetto}
                    />
                  </Field>

                  <Field label="Messaggio" error={errors.messaggio?.message} required>
                    <Textarea
                      {...register('messaggio')}
                      rows={6}
                      placeholder="Scrivi il tuo messaggio..."
                      aria-invalid={!!errors.messaggio}
                    />
                  </Field>

                  {/* Privacy */}
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        {...register('privacy')}
                        type="checkbox"
                        className="mt-1 w-4 h-4 rounded-sm accent-terra shrink-0 cursor-pointer"
                        aria-invalid={!!errors.privacy}
                      />
                      <span className="font-lora text-sm text-ink-light leading-relaxed">
                        Ho letto e accetto la{' '}
                        <a href="/privacy" className="text-terra underline underline-offset-2 hover:text-terra-dark transition-colors">
                          privacy policy
                        </a>
                        . I dati saranno trattati esclusivamente per rispondere alla tua richiesta.
                        <span className="text-terra ml-1">*</span>
                      </span>
                    </label>
                    {errors.privacy && (
                      <p className="font-sans text-[0.72rem] text-terra ml-7">{errors.privacy.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-terra hover:bg-terra-dark text-cream font-sans font-semibold tracking-[.06em] uppercase rounded-sm px-8 py-4 transition-all hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(193,102,58,.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Invio in corso…' : 'Invia messaggio'}
                  </Button>
                </form>
              </div>
            </ScrollReveal>

            {/* Info contatto */}
            <div className="space-y-10">
              <ScrollReveal delay={0.1}>
                <div>
                  <Eyebrow className="mb-6">Dove siamo</Eyebrow>
                  <div className="space-y-5">
                    <ContactRow
                      icon={MapPin}
                      label="Ufficio operativo"
                      value={orgInfo.address}
                    />
                    <ContactRow
                      icon={MapPin}
                      label="Sede legale"
                      value={orgInfo.sedeLegale}
                    />
                    <ContactRow
                      icon={Phone}
                      label={`Telefono (${orgInfo.phoneLabel})`}
                      value={orgInfo.phone}
                      href={`tel:${orgInfo.phone.replace(/\s/g, '')}`}
                    />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.18}>
                <div className="pt-8 border-t border-sand-dark">
                  <Eyebrow className="mb-6">Email</Eyebrow>
                  <div className="space-y-5">
                    {[
                      { label: 'Email', value: orgInfo.emailInfo },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-sm bg-terra/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Send className="w-4 h-4 text-terra" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="font-sans text-[0.72rem] font-semibold tracking-[.1em] uppercase text-ink-light/60 mb-0.5">
                            {label}
                          </p>
                          {value.startsWith('[') ? (
                            <p className="font-lora text-ink-light/50 italic text-sm">{value}</p>
                          ) : (
                            <a
                              href={`mailto:${value}`}
                              className="font-lora text-terra hover:text-terra-dark transition-colors underline underline-offset-2"
                            >
                              {value}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.26}>
                <div className="pt-8 border-t border-sand-dark">
                  <Eyebrow className="mb-6">Seguici</Eyebrow>
                  <div className="flex flex-col gap-4">
                    {[
                      { icon: Facebook,  label: 'Facebook',  href: orgInfo.facebook,  handle: 'progettobriciola' },
                      { icon: Instagram, label: 'Instagram', href: orgInfo.instagram, handle: '@progettobriciolaonlus' },
                      { icon: Youtube,   label: 'YouTube',   href: orgInfo.youtube,   handle: 'Canale YouTube' },
                    ].map(({ icon: Icon, label, href, handle }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-4 group"
                        aria-label={`${label} di Progetto Briciola`}
                      >
                        <div className="w-9 h-9 rounded-sm bg-terra/10 flex items-center justify-center shrink-0 group-hover:bg-terra group-hover:text-cream transition-colors">
                          <Icon className="w-4 h-4 text-terra group-hover:text-cream transition-colors" strokeWidth={1.5} />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-lora text-ink group-hover:text-terra transition-colors">{handle}</span>
                          <ExternalLink className="w-3 h-3 text-ink-light/40 group-hover:text-terra transition-colors" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.32}>
                <div className="pt-8 border-t border-sand-dark bg-sand-dark rounded-sm p-6">
                  <p className="font-sans text-[0.72rem] font-semibold tracking-[.1em] uppercase text-ink-light/60 mb-2">
                    Codice fiscale
                  </p>
                  <p className="font-mono text-ink text-lg tracking-wider">{orgInfo.codiceFiscale}</p>
                  <p className="font-lora text-ink-light/60 text-sm mt-1">
                    Valido per le donazioni e il 5×1000
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
