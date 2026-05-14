import { Helmet } from 'react-helmet-async'
import { PageHero } from '@/components/PageHero'

export default function CosaPuoiFareTu() {
  return (
    <>
      <Helmet>
        <title>Come puoi aiutare — Progetto Briciola Onlus</title>
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

      <section className="bg-sand py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-ink-light/50 font-lora">
          [Contenuto pagina Come Aiutare — da sviluppare]
        </div>
      </section>
    </>
  )
}
