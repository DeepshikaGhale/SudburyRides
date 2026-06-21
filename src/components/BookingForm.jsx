import { useState } from 'react'
import {
  User,
  Phone,
  MapPin,
  Navigation,
  Users,
  MessageSquare,
  CheckCircle2,
  Route,
  Timer,
} from 'lucide-react'
import AddressAutocomplete from './AddressAutocomplete'
import RouteMap from './RouteMap'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import SelectMenu from './SelectMenu'

const PASSENGER_OPTIONS = [1, 2, 3, 4, 5, 6, '7+'].map((n) => ({
  value: n,
  label: `${n} ${n === 1 ? 'passenger' : 'passengers'}`,
}))

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

  // Address text + the resolved {lat, lon, label} place for each end of the trip.
  const [pickupText, setPickupText] = useState('')
  const [dropoffText, setDropoffText] = useState('')
  const [pickup, setPickup] = useState(null)
  const [dropoff, setDropoff] = useState(null)
  const [route, setRoute] = useState(null) // { distanceKm, durationMin }

  // Custom-control values (hidden inputs aren't natively validated, so guard manually).
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [passengers, setPassengers] = useState('')
  const [tried, setTried] = useState(false)

  // Static / front-end only — no backend. Just show a confirmation state.
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!date || !time || !passengers) {
      setTried(true)
      return
    }
    setSubmitted(true)
    e.target.reset()
    setPickupText('')
    setDropoffText('')
    setPickup(null)
    setDropoff(null)
    setRoute(null)
    setDate('')
    setTime('')
    setPassengers('')
    setTried(false)
    setTimeout(() => setSubmitted(false), 6000)
  }

  return (
    <section id="book" className="relative bg-brand-black py-20">
      {/* decorative top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-yellow" />

      <div className="container-px">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-label text-brand-yellow">Book Online</span>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Reserve Your Ride in Seconds
          </h2>
          <p className="mt-4 text-gray-300">
            Start typing your pick-up and drop-off — pick from the suggestions and we&apos;ll
            map your route and distance instantly. Any time, day or night, anywhere in Greater
            Sudbury.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          {/* Form card */}
          <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
            {submitted ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
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

                <AddressAutocomplete
                  icon={MapPin}
                  name="pickup"
                  placeholder="Pick-up Location"
                  value={pickupText}
                  onChange={setPickupText}
                  onSelect={setPickup}
                  fieldClass={FIELD_BASE}
                />

                <AddressAutocomplete
                  icon={Navigation}
                  name="dropoff"
                  placeholder="Drop-off Location"
                  value={dropoffText}
                  onChange={setDropoffText}
                  onSelect={setDropoff}
                  fieldClass={FIELD_BASE}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <DatePicker
                    name="date"
                    value={date}
                    onChange={(v) => {
                      setDate(v)
                      setTried(false)
                    }}
                    error={tried && !date}
                  />
                  <TimePicker
                    name="time"
                    value={time}
                    onChange={(v) => {
                      setTime(v)
                      setTried(false)
                    }}
                    error={tried && !time}
                  />
                </div>

                <SelectMenu
                  icon={Users}
                  name="passengers"
                  placeholder="Number of Passengers"
                  options={PASSENGER_OPTIONS}
                  value={passengers}
                  onChange={(v) => {
                    setPassengers(v)
                    setTried(false)
                  }}
                  error={tried && !passengers}
                />

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

          {/* Live route map + trip summary */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-card">
              <div className="h-[360px] w-full sm:h-[440px]">
                <RouteMap pickup={pickup} dropoff={dropoff} onRoute={setRoute} />
              </div>
            </div>

            {/* Trip summary panel */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              {route ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-yellow/15 text-brand-yellow">
                      <Route className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">Distance</p>
                      <p className="font-display text-xl font-extrabold text-white">
                        {route.distanceKm.toFixed(1)} km
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-yellow/15 text-brand-yellow">
                      <Timer className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">Est. time</p>
                      <p className="font-display text-xl font-extrabold text-white">
                        {Math.max(1, Math.round(route.durationMin))} min
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">Select a pick-up and drop-off</span>{' '}
                  from the suggestions to see your route, distance and estimated drive time here.
                </p>
              )}
            </div>

            {/* Phone CTA */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
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
        </div>
      </div>
    </section>
  )
}
