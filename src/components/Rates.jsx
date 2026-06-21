import { Check, Phone } from 'lucide-react'

const PLANS = [
  {
    name: 'Standard Local',
    price: '$3.75',
    unit: 'base + $1.95/km',
    features: ['Up to 4 passengers', 'Cash, debit & credit', '24/7 availability', 'Door-to-door service'],
    highlight: false,
  },
  {
    name: 'Airport Flat Rate',
    price: '$49',
    unit: 'flat, one way',
    features: ['To/from YSB Airport', 'Flight tracking', 'Meet & greet', 'Luggage assistance'],
    highlight: true,
  },
  {
    name: 'Hourly / As-Directed',
    price: '$55',
    unit: 'per hour',
    features: ['Multiple stops', 'Wait time included', 'Errands & appointments', 'Perfect for events'],
    highlight: false,
  },
]

export default function Rates() {
  return (
    <section id="rates" className="bg-white py-20">
      <div className="container-px">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="section-label">Transparent Pricing</span>
          <h2 className="section-title">Simple, Honest Rates</h2>
          <p className="mt-4 text-gray-500">
            No surge pricing, no surprises. Sample rates below — call dispatch for an exact
            quote on your trip.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                plan.highlight
                  ? 'border-brand-yellow bg-brand-black text-white shadow-card'
                  : 'border-gray-100 bg-white text-brand-black shadow-sm hover:shadow-card'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-yellow px-4 py-1 text-xs font-bold uppercase tracking-wide text-brand-black">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-lg font-extrabold">{plan.name}</h3>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-display text-4xl font-extrabold text-brand-yellow-dark">
                  {plan.price}
                </span>
                <span
                  className={`pb-1 text-sm ${plan.highlight ? 'text-gray-300' : 'text-gray-500'}`}
                >
                  {plan.unit}
                </span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-brand-yellow-dark" strokeWidth={3} />
                    <span className={plan.highlight ? 'text-gray-200' : 'text-gray-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={plan.highlight ? 'btn-primary mt-7' : 'btn-dark mt-7'}
              >
                Book This Ride
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Phone className="h-4 w-4 text-brand-yellow-dark" />
          Rates are estimates and may vary. Call{' '}
          <a href="tel:7051234567" className="font-semibold text-brand-black hover:text-brand-yellow-dark">
            (705) 123-4567
          </a>{' '}
          for an exact quote.
        </p>
      </div>
    </section>
  )
}
