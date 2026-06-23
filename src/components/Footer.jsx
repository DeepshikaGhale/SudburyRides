import { Phone, Mail, MapPin, Clock, Instagram, ArrowRight } from 'lucide-react'
import Logo from './Logo.jsx'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
]

const SOCIALS = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/sudbury_rides_inc' },
]

const GOOGLE_URL =
  'https://www.google.com/search?kgmid=%2Fg%2F11zbj9vqqv&hl=en-CA&q=Sudbury%20rides%20inc&shem=epsdc%2Cltac%2Crimspwouohc&shndl=30&source=sh%2Fx%2Floc%2Fosrp%2Fm5%2F1&kgs=2b0c9272a66fee5d'

// Google's multi-color "G" mark (lucide has no brand logo for it).
function GoogleIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-black text-gray-300">
      {/* CTA banner */}
      <div className="container-px">
        <div className="-mb-px flex flex-col items-center justify-between gap-6 rounded-3xl bg-brand-yellow px-8 py-10 text-center shadow-glow sm:flex-row sm:text-left lg:px-12">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-brand-black sm:text-3xl">
              Ready to ride? We&apos;re available 24/7.
            </h2>
            <p className="mt-1 text-brand-black/80">
              Book online in seconds or call our friendly dispatch team any time.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a href="#book" className="btn-dark">
              Book a Ride
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:7059898808"
              className="btn inline-flex border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-px grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm text-gray-400">
            Your trusted local ride service, proudly serving every community across
            Greater Sudbury, Ontario — fast, safe and reliable, 24/7.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-gray-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-yellow hover:text-brand-black"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <GoogleIcon className="h-5 w-5" />
            Find us on Google
          </a>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-brand-yellow"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li>
              <a href="tel:7059898808" className="flex items-center gap-3 hover:text-brand-yellow">
                <Phone className="h-5 w-5 shrink-0 text-brand-yellow" />
                (705) 989-8808
              </a>
            </li>
            <li>
              <a
                href="mailto:ridessudbury@gmail.com"
                className="flex items-center gap-3 hover:text-brand-yellow"
              >
                <Mail className="h-5 w-5 shrink-0 text-brand-yellow" />
                ridessudbury@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-brand-yellow" />
              Sudbury, Ontario
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Hours
          </h3>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <Clock className="h-8 w-8 shrink-0 text-brand-yellow" />
            <div>
              <p className="font-display text-lg font-extrabold text-white">24 / 7 Service</p>
              <p className="text-sm text-gray-400">Open every day, all year round</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Sudbury Rides. All rights reserved.</p>
          <p>Serving Greater Sudbury, Ontario only. Licensed &amp; insured.</p>
        </div>
      </div>
    </footer>
  )
}
