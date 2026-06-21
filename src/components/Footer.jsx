import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react'
import Logo from './Logo.jsx'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Rates', href: '#rates' },
  { label: 'Corporate', href: '#corporate' },
  { label: 'Drive With Us', href: '#drive' },
]

const SOCIALS = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'X (Twitter)', href: '#' },
]

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
              href="tel:7051234567"
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
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-gray-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-yellow hover:text-brand-black"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
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
              <a href="tel:7051234567" className="flex items-center gap-3 hover:text-brand-yellow">
                <Phone className="h-5 w-5 shrink-0 text-brand-yellow" />
                (705) 123-4567
              </a>
            </li>
            <li>
              <a
                href="mailto:info@sudburyrides.ca"
                className="flex items-center gap-3 hover:text-brand-yellow"
              >
                <Mail className="h-5 w-5 shrink-0 text-brand-yellow" />
                info@sudburyrides.ca
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
