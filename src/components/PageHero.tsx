import { ChevronDown } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: PageHeroProps) {
  const isCenter = align === 'center'

  return (
    <section className="relative min-h-[58vh] flex items-end overflow-hidden">
      {/* Sfondo gradiente cinematico */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(193,102,58,0.45) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 15%, rgba(212,168,71,0.14) 0%, transparent 45%),
            linear-gradient(175deg, #100a05 0%, #2A1E14 55%, #1a0f08 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Overlay dal basso */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent"
        aria-hidden="true"
      />

      {/* Contenuto */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 lg:pb-24">
        <div className={cn('max-w-2xl', isCenter && 'mx-auto text-center')}>
          <ScrollReveal>
            <p
              className={cn(
                'font-sans text-[0.75rem] font-semibold tracking-[.18em] uppercase text-terra-light mb-4',
                isCenter
                  ? 'flex justify-center items-center gap-2'
                  : 'flex items-center gap-2 before:content-[\'\'] before:inline-block before:w-7 before:h-px before:bg-terra-light',
              )}
            >
              {eyebrow}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-cream leading-[1.08] mb-0">{title}</h1>
          </ScrollReveal>

          {subtitle && (
            <ScrollReveal delay={0.2}>
              <p className="mt-5 font-lora text-cream/70 text-lg leading-relaxed">
                {subtitle}
              </p>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/30 animate-bounce z-10">
        <ChevronDown className="h-5 w-5" />
      </div>
    </section>
  )
}
