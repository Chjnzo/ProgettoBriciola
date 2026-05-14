import { Helmet } from 'react-helmet-async'
import { PageHero } from '@/components/PageHero'
import { orgInfo } from '@/data/content'

export default function Contatti() {
  return (
    <>
      <Helmet>
        <title>Contatti — Progetto Briciola Onlus</title>
        <meta
          name="description"
          content="Contatta Progetto Briciola Onlus. Via F. Corridoni 61, Bergamo. Tel. +39 339 3849741."
        />
      </Helmet>

      <PageHero
        eyebrow="Siamo qui"
        title="Contatti"
        subtitle={`${orgInfo.address} — Tel. ${orgInfo.phone}`}
        bg="bg-cream"
        align="left"
      />

      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-ink-light/50 font-lora">
          [Contenuto pagina Contatti — da sviluppare]
        </div>
      </section>
    </>
  )
}
