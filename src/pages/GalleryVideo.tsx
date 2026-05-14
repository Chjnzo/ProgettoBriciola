import { Helmet } from 'react-helmet-async'
import { PageHero } from '@/components/PageHero'

export default function GalleryVideo() {
  return (
    <>
      <Helmet>
        <title>Gallery e Video — Progetto Briciola Onlus</title>
        <meta
          name="description"
          content="Foto e video delle missioni di Progetto Briciola a Hured, Etiopia. 5 video YouTube e gallerie fotografiche per anno."
        />
      </Helmet>

      <PageHero
        eyebrow="La nostra storia in immagini"
        title="Gallery e Video"
        subtitle="Trent'anni di missioni documentati. Cinque video e le fotografie delle missioni dal 2013 al 2016."
        bg="bg-sand"
        align="left"
      />

      <section className="bg-sand py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-ink-light/50 font-lora">
          [Contenuto pagina Gallery Video — da sviluppare]
        </div>
      </section>
    </>
  )
}
