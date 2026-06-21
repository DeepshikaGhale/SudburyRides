import { Car, Plane, CalendarClock, ArrowRight, Phone } from 'lucide-react'

const SERVICES = [
  {
    icon: Car,
    title: 'Local Rides',
    desc: 'Quick, comfortable trips anywhere within Greater Sudbury — to work, appointments, shopping or a night out.',
  },
  {
    icon: Plane,
    title: 'Airport Transportation',
    desc: 'Reliable, on-time rides to and from Greater Sudbury Airport. We track your flight so we are there when you land.',
  },
  {
    icon: CalendarClock,
    title: 'Scheduled Pickups',
    desc: 'Book ahead for recurring trips or important commitments. Set it once and count on us every time.',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="container-px">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Ride Services Built Around You</h2>
          <p className="mt-4 text-gray-500">
            Whatever the trip, Sudbury Rides has a service to match — all delivered with
            the same local, professional care.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, desc, href }) => (
            <article
              key={title}
              className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-yellow hover:shadow-card"
            >
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-brand-yellow/15 text-brand-yellow-dark transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-brand-black">
                <Icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold text-brand-black">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{desc}</p>
              <a
                href={href || '#book'}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-black transition-colors group-hover:text-brand-yellow-dark"
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </article>
          ))}

          {/* CTA card to fill the 6th grid cell on large screens */}
          <article className="flex flex-col justify-center rounded-2xl bg-brand-black p-7 text-white shadow-card lg:col-span-1">
            <h3 className="font-display text-xl font-extrabold">Got something else in mind?</h3>
            <p className="mt-2 text-sm text-gray-300">
              Just give us a shout — our local team will sort out the perfect ride, however
              you need to roll.
            </p>
            <a href="tel:7059898808" className="btn-primary mt-5 self-start">
              <Phone className="h-4 w-4" />
              Call Us
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
