import { Eyebrow } from '@/components/Eyebrow'
import { ScrollReveal } from '@/components/ScrollReveal'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle?: string
  bg?: string
  align?: 'left' | 'center'
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  bg = 'bg-sand',
  align = 'center',
}: PageHeroProps) {
  const isCenter = align === 'center'

  return (
    <section className={cn('pt-32 pb-20 lg:pt-40 lg:pb-28', bg)}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={cn('max-w-2xl', isCenter && 'mx-auto text-center')}>
          <ScrollReveal>
            <Eyebrow center={isCenter} className="mb-5">
              {eyebrow}
            </Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h1 className="text-ink">{title}</h1>
          </ScrollReveal>
          {subtitle && (
            <ScrollReveal delay={0.16}>
              <p className="mt-5 font-lora text-ink-light text-lg leading-relaxed">
                {subtitle}
              </p>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  )
}
