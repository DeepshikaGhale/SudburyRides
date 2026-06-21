import { MapPin } from 'lucide-react'

const AREAS = [
  'Downtown Sudbury',
  'New Sudbury',
  'South End',
  'Minnow Lake',
  'Val Caron',
  'Hanmer',
  'Chelmsford',
  'Lively',
  'Coniston',
  'Capreol',
  'Garson',
  'Falconbridge',
  'Azilda',
]

export default function AreasServed() {
  return (
    <section id="areas" className="relative overflow-hidden bg-brand-black py-20">
      {/* accent glows */}
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-yellow/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-yellow/10 blur-3xl" />

      <div className="container-px relative">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="section-label text-brand-yellow">Coverage</span>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            Areas We Serve
          </h2>
          <p className="mt-4 text-gray-300">
            Proudly serving every community across Greater Sudbury — and only Greater
            Sudbury. Local roads, local drivers.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {AREAS.map((area) => (
            <div
              key={area}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4 transition-all duration-200 hover:border-brand-yellow hover:bg-brand-yellow/10"
            >
              <MapPin
                className="h-5 w-5 shrink-0 text-brand-yellow transition-transform duration-200 group-hover:-translate-y-0.5"
                fill="currentColor"
                strokeWidth={1.5}
              />
              <span className="text-sm font-semibold text-gray-100">{area}</span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          Don&apos;t see your neighbourhood? If it&apos;s in Greater Sudbury, we&apos;ll get
          you there.{' '}
          <a href="#book" className="font-semibold text-brand-yellow hover:underline">
            Book a ride →
          </a>
        </p>
      </div>
    </section>
  )
}
