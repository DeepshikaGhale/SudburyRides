import { useEffect, useState } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const PHONE = '(705) 989-8808'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-black/95 shadow-lg backdrop-blur'
          : 'bg-brand-black/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container-px flex h-[72px] items-center justify-between">
        <Logo dark />

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-gray-200 transition-colors hover:text-brand-yellow after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-brand-yellow after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${PHONE.replace(/[^\d]/g, '')}`}
            className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand-yellow"
          >
            <Phone className="h-4 w-4 text-brand-yellow" />
            {PHONE}
          </a>
          <a href="#book" className="btn-primary">
            Book a Ride
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-brand-black/98 backdrop-blur transition-[max-height] duration-300 ease-in-out lg:hidden ${
          open ? 'max-h-[480px]' : 'max-h-0'
        }`}
      >
        <ul className="container-px flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-gray-200 transition-colors hover:bg-white/5 hover:text-brand-yellow"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 flex flex-col gap-3 px-1">
            <a
              href={`tel:${PHONE.replace(/[^\d]/g, '')}`}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4 text-brand-yellow" />
              {PHONE}
            </a>
            <a href="#book" onClick={() => setOpen(false)} className="btn-primary w-full">
              Book a Ride
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
