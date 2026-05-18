import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Heart, Lock } from 'lucide-react'
import { orgInfo } from '@/data/content'

const footerLinks = [
  {
    heading: 'Associazione',
    links: [
      { to: '/chi-siamo',     label: 'Chi siamo' },
      { to: '/cosa-facciamo', label: 'Cosa facciamo' },
      { to: '/etiopia',       label: "L'Etiopia" },
    ],
  },
  {
    heading: 'Come aiutare',
    links: [
      { to: '/cosa-puoi-fare-tu', label: 'Adozione a distanza' },
      { to: '/cosa-puoi-fare-tu', label: 'Donazioni' },
      { to: '/cosa-puoi-fare-tu', label: '5×1000' },
    ],
  },
  {
    heading: 'Esplora',
    links: [
      { to: '/gallery-video', label: 'Gallery & Video' },
      { to: '/contatti',      label: 'Contatti' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-ink text-cream/80" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-serif font-bold text-xl text-cream hover:opacity-80 transition-opacity">
              Progetto Briciola
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream/70 max-w-xs">
              Onlus bergamasca nata nel 1992. Sosteniamo il villaggio di Hured in Etiopia attraverso
              adozioni a distanza, missioni annuali e infrastrutture.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-4">
              <a
                href={orgInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Progetto Briciola su Facebook"
                className="text-cream/60 hover:text-cream transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={orgInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Progetto Briciola su Instagram"
                className="text-cream/60 hover:text-cream transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={orgInfo.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Progetto Briciola su YouTube"
                className="text-cream/60 hover:text-cream transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>


          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3 className="font-sans text-[.75rem] font-semibold tracking-[.12em] uppercase text-cream/50 mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-cream/70 hover:text-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-cream/40">
          <div className="space-y-1">
            <p>{orgInfo.name} — C.F. {orgInfo.codiceFiscale}</p>
            <p>{orgInfo.address}</p>
            <p>Tel. {orgInfo.phone} ({orgInfo.phoneLabel})</p>
          </div>
          <div className="flex items-center gap-4 self-end">
            <p className="flex items-center gap-1.5">
              Fatto con <Heart className="h-3 w-3 text-terra fill-terra" /> per Hured
            </p>
            <Link
              to="/admin/login"
              aria-label="Area amministratori"
              className="text-cream/20 hover:text-cream/50 transition-colors duration-300"
              tabIndex={-1}
            >
              <Lock className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
