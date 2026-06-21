import { useState } from 'react'
import {
  User,
  Phone,
  MapPin,
  Navigation,
  Calendar,
  Clock,
  Users,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react'

const FIELD_BASE =
  'w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-brand-black outline-none transition-all placeholder:text-gray-400 focus:border-brand-yellow focus:bg-white focus:ring-2 focus:ring-brand-yellow/30'

function Field({ icon: Icon, children }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      {children}
    </div>
  )
}

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false)

  // Static / front-end only — no backend. Just show a confirmation state.
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    e.target.reset()
    setTimeout(() => setSubmitted(false), 6000)
  }

  return (
    <section id="book" className="relative bg-brand-black py-20">
      {/* decorative top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-yellow" />

      <div className="container-px grid items-center gap-12 lg:grid-cols-2">
        {/* Left copy */}
        <div>
          <span className="section-label text-brand-yellow">Book Online</span>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Reserve Your Ride in Seconds
          </h2>
          <p className="mt-4 max-w-md text-gray-300">
            Tell us where you&apos;re headed and when. Our dispatch team will confirm
            your pickup right away — any time, day or night, anywhere in Greater Sudbury.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              'No app required — book online or by phone',
              'Upfront, transparent pricing',
              'Friendly, professional local drivers',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-200">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-yellow" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-300">Prefer to call? We&apos;re standing by.</p>
            <a
              href="tel:7051234567"
              className="mt-1 flex items-center gap-2 font-display text-2xl font-extrabold text-brand-yellow"
            >
              <Phone className="h-6 w-6" />
              (705) 123-4567
            </a>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          {submitted ? (
            <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-yellow/20">
                <CheckCircle2 className="h-9 w-9 text-brand-yellow-dark" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold text-brand-black">
                Booking Received!
              </h3>
              <p className="mt-2 max-w-xs text-gray-500">
                Thanks for choosing Sudbury Rides. Our dispatch team will call you
                shortly to confirm your pickup.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display text-xl font-extrabold text-brand-black">
                Booking Details
              </h3>

              <Field icon={User}>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Full Name"
                  className={FIELD_BASE}
                />
              </Field>

              <Field icon={Phone}>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number"
                  className={FIELD_BASE}
                />
              </Field>

              <Field icon={MapPin}>
                <input
                  type="text"
                  name="pickup"
                  required
                  placeholder="Pick-up Location"
                  className={FIELD_BASE}
                />
              </Field>

              <Field icon={Navigation}>
                <input
                  type="text"
                  name="dropoff"
                  required
                  placeholder="Drop-off Location"
                  className={FIELD_BASE}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field icon={Calendar}>
                  <input
                    type="date"
                    name="date"
                    required
                    className={FIELD_BASE}
                    aria-label="Pick-up date"
                  />
                </Field>
                <Field icon={Clock}>
                  <input
                    type="time"
                    name="time"
                    required
                    className={FIELD_BASE}
                    aria-label="Pick-up time"
                  />
                </Field>
              </div>

              <Field icon={Users}>
                <select name="passengers" required className={`${FIELD_BASE} appearance-none`} defaultValue="">
                  <option value="" disabled>
                    Number of Passengers
                  </option>
                  {[1, 2, 3, 4, 5, 6, '7+'].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'passenger' : 'passengers'}
                    </option>
                  ))}
                </select>
              </Field>

              <Field icon={MessageSquare}>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Additional Notes (optional)"
                  className={`${FIELD_BASE} resize-none pt-3`}
                />
              </Field>

              <button type="submit" className="btn-primary w-full text-base">
                Book Now
              </button>
              <p className="text-center text-xs text-gray-400">
                By booking you agree to be contacted about your ride.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
