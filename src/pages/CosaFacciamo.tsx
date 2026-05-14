import { Helmet } from 'react-helmet-async'
import { PageHero } from '@/components/PageHero'

export default function CosaFacciamo() {
  return (
    <>
      <Helmet>
        <title>Cosa facciamo — Progetto Briciola Onlus</title>
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

      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-ink-light/50 font-lora">
          [Contenuto pagina Cosa Facciamo — da sviluppare]
        </div>
      </section>
    </>
  )
}
