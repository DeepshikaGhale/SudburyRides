import { useEffect, useRef } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

// How long each review sits on screen before the carousel advances itself.
const AUTOSCROLL_MS = 4500

// Real Google reviews for Sudbury Rides Inc. Names and wording are exactly as
// the riders left them — edit with care. Keep `date` absolute so it doesn't
// silently go stale the way "1 month ago" would.
const REVIEWS = [
  {
    name: 'Nishidh Barot',
    date: 'July 2026',
    rating: 5,
    text: 'I had an amazing experience using this taxi rides and their response were very quick. Also their services were top notch. And I visited Sudbury for the first and had delightful experience and they made my travel much convenient thank you for your ride hope to see again',
  },
  {
    name: 'heena khan',
    date: 'July 2026',
    rating: 5,
    text: 'Excellent service! The driver was very professional, friendly, and punctual. The vehicle was clean and comfortable, and the ride felt safe from start to finish. They knew the best route and made the trip smooth and stress-free. I highly recommend this driver to anyone in Sudbury looking for reliable transportation. Thank you for the great experience!',
  },
  {
    name: 'Francine Fortier',
    date: 'July 2026',
    rating: 5,
    text: 'Very professional service , friendly, pleasant. Very good customer service He went out of his way to help me When i go back to sudbury he will be the one I will contact. I recommend him has number taxi driver in sudbury for transportation. Very clean vehicle and dressed professionally and good prices. Thank you so much for the excellent service. KUNAL SUDBURY RIDES TAXI',
  },
  {
    name: 'sukhmeet munder',
    date: 'July 2026',
    rating: 5,
    text: 'Outstanding customer service. Reliable, punctual, and professional. The driver was polite and knowledgeable about the area, making the journey efficient and stress-free. A dependable taxi service that I would gladly use again',
  },
  {
    name: 'Michael Gortat',
    date: 'July 2026',
    rating: 5,
    text: 'I am thankful for this service. They were willing to go and provide the help where other services weren’t willing. They did a 15 or 16 hour trip. Thank you. Safe ride, great service.',
  },
  {
    name: 'Prabhjot Kaur',
    date: 'July 2026',
    rating: 5,
    text: 'Thankyou for your smooth service. I had a very comfortable ride. Arrived on time. He was very helpful.',
  },
  {
    name: 'Zack Ross',
    date: 'July 2026',
    rating: 5,
    text: 'I had a flight cancellation in Sudbury and had to make it to Toronto to make my connection in a relatively short amount of time, and it was in the middle of a thunderstorm. Ali was there at the airport doing a drop off and said he could do…',
  },
  {
    name: 'Gloria Paratico',
    date: 'June 2026',
    rating: 5,
    text: 'We were stuck in Sudbury due to a cancelled flight with a 2 year old. The owner agreed to drive us all the way to Sault Ste. Marie on a Sunday with no prior notice. He was extremely polite and helpful. I definitely recommend this taxi service!!!',
  },
]

const ARROW_BTN =
  'grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-brand-black shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-yellow hover:bg-brand-yellow'

export default function Testimonials() {
  const scroller = useRef(null)
  const paused = useRef(false)

  // Scroll offset at which each card would sit flush against the left edge.
  const cardOffsets = (el) => {
    const left = el.getBoundingClientRect().left
    return Array.from(el.querySelectorAll('figure')).map(
      (card) => card.getBoundingClientRect().left - left + el.scrollLeft,
    )
  }

  // Advance one card, wrapping around at either end. Targets an absolute
  // offset rather than scrollBy() — a relative smooth scroll gets cancelled by
  // scroll snapping and springs back to where it started.
  const step = (direction) => {
    const el = scroller.current
    if (!el) return
    const offsets = cardOffsets(el)
    if (!offsets.length) return

    const max = el.scrollWidth - el.clientWidth
    const current = el.scrollLeft
    let next

    if (direction > 0) {
      next = current >= max - 8 ? offsets[0] : offsets.find((o) => o > current + 8)
      if (next === undefined) next = offsets[0]
    } else {
      next = current <= 8 ? max : [...offsets].reverse().find((o) => o < current - 8)
      if (next === undefined) next = max
    }

    el.scrollTo({ left: next, behavior: 'smooth' })
  }

  // Auto-advance, but never fight the user: hovering, focusing or touching the
  // strip pauses it, and it stays off entirely for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (!paused.current && !document.hidden) step(1)
    }, AUTOSCROLL_MS)
    return () => clearInterval(id)
  }, [])

  const pause = () => {
    paused.current = true
  }
  const resume = () => {
    paused.current = false
  }

  return (
    <section id="testimonials" className="bg-gray-50 py-20">
      <div className="container-px">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What Our Riders Say</h2>
            <div className="mt-4 flex items-center gap-2 text-gray-500">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <span className="text-sm font-semibold">
                5.0 average across our Google reviews
              </span>
            </div>
          </div>

          <div className="hidden shrink-0 gap-3 md:flex">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous reviews"
              className={ARROW_BTN}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next reviews"
              className={ARROW_BTN}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          tabIndex={0}
          role="group"
          aria-label="Rider reviews, scroll horizontally for more"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocusCapture={pause}
          onBlurCapture={resume}
          onTouchStart={pause}
          className="no-scrollbar -mx-5 flex snap-x snap-proximity gap-6 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8"
        >
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="relative flex w-[19rem] shrink-0 snap-start flex-col rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card sm:w-[22rem]"
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
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-black font-display text-sm font-bold text-brand-yellow">
                  {r.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-brand-black">{r.name}</p>
                  <p className="text-xs text-gray-400">Google review · {r.date}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
