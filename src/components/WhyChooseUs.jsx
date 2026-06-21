import { Clock, Home, Award, Sparkles, BadgeDollarSign } from 'lucide-react'

const REASONS = [
  {
    icon: Clock,
    title: 'Available 24/7',
    desc: 'Day or night, weekday or holiday — we answer the call whenever you need a ride.',
  },
  {
    icon: Home,
    title: 'Local & Reliable',
    desc: 'A Sudbury company serving Sudbury people. We know the roads, the shortcuts and the community.',
  },
  {
    icon: Award,
    title: 'Experienced Drivers',
    desc: 'Vetted, licensed and professional drivers who put your safety and comfort first.',
  },
  {
    icon: Sparkles,
    title: 'Clean & Comfortable Vehicles',
    desc: 'Well-maintained, sanitized vehicles for a smooth, pleasant ride every time.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Affordable Rates',
    desc: 'Fair, transparent pricing with no surprise surcharges. Great value, every trip.',
  },
]

const IMAGE = '/sr-taxi.webp'

export default function WhyChooseUs() {
  return (
    <section id="about" className="bg-gray-50 py-20">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2">
        {/* Photo */}
        <div className="relative order-last lg:order-first">
          <div className="absolute -bottom-5 -left-5 hidden h-28 w-28 rounded-full bg-brand-yellow/30 blur-2xl sm:block" />
          <div className="absolute -right-4 -top-4 hidden h-20 w-20 rounded-2xl border-2 border-brand-yellow/50 sm:block" />
          <div className="relative overflow-hidden rounded-3xl shadow-card">
            <img
              src={IMAGE}
              alt="A branded Sudbury Rides vehicle on a Greater Sudbury street"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Reasons */}
        <div>
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">The Ride Sudbury Trusts</h2>
          <p className="mt-4 text-gray-500">
            We&apos;re more than a taxi — we&apos;re your neighbours, committed to getting
            you where you need to go safely and on time.
          </p>

          <ul className="mt-8 space-y-5">
            {REASONS.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-brand-yellow-dark shadow-sm">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-black">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
