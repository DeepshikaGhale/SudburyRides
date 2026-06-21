import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Melissa R.',
    area: 'New Sudbury',
    rating: 5,
    text: 'Booked a 4 a.m. airport ride and the driver was early, friendly and helped with my bags. The car was spotless. Easily the most reliable ride service in Sudbury.',
  },
  {
    name: 'James T.',
    area: 'Downtown Sudbury',
    rating: 5,
    text: 'I use Sudbury Rides every week to get to appointments. Always on time, always fair prices, and the drivers actually know the city. Couldn’t ask for better.',
  },
  {
    name: 'Priya & Dev',
    area: 'Hanmer',
    rating: 5,
    text: 'Needed an accessible vehicle for my father and the team made it stress-free. Kind, patient and professional from start to finish. Highly recommend.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-gray-50 py-20">
      <div className="container-px">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Riders Say</h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
              ))}
            </div>
            <span className="text-sm font-semibold">4.9 average from 1,200+ rides</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="relative flex flex-col rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-brand-yellow/20" fill="currentColor" />
              <div className="flex">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-black font-display text-sm font-bold text-brand-yellow">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-brand-black">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.area}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
