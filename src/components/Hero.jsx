import { Phone, ArrowRight, Star, ShieldCheck, Clock } from 'lucide-react'

// Taxi hero image (in /public).
const HERO_IMAGE = '/taxi.jpg'

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-brand-black">
      {/* Background image + overlays */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          alt="A taxi on a city street"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/85 to-brand-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/30" />
        {/* Yellow accent glow */}
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-brand-yellow/20 blur-3xl" />
      </div>

      <div className="container-px flex min-h-[92vh] items-center pb-16 pt-32">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-yellow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-yellow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-yellow" />
            </span>
            Available 24/7 in Greater Sudbury
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Your Trusted Ride Service in{' '}
            <span className="text-brand-yellow">Greater Sudbury</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-gray-300">
            Fast. Safe. Reliable. Available 24/7. Proudly serving our community.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#book" className="btn-primary text-base">
              Book a Ride
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="tel:7051234567" className="btn-outline text-base">
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
              <span>
                <strong className="text-white">4.9/5</strong> rider rating
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-yellow" />
              <span>Licensed &amp; insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-yellow" />
              <span>Avg. pickup under 10 min</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
