import { Helmet } from 'react-helmet-async'
import { PageHero } from '@/components/PageHero'

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

      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-ink-light/50 font-lora">
          [Contenuto pagina Etiopia — da sviluppare]
        </div>
      </section>
    </>
  )
}
