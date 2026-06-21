import { DollarSign, CalendarClock, MapPinned, ArrowRight, Check } from 'lucide-react'

const BENEFITS = [
  { icon: DollarSign, text: 'Competitive earnings & weekly pay' },
  { icon: CalendarClock, text: 'Flexible hours — drive when it suits you' },
  { icon: MapPinned, text: 'Stay local, working only in Greater Sudbury' },
]

const REQUIREMENTS = [
  'Valid Ontario driver’s license (G class)',
  'Clean driving record & background check',
  'Reliable, well-maintained vehicle (or use ours)',
  '21+ years of age with 3+ years driving experience',
]

const IMAGE =
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'

export default function DriveWithUs() {
  return (
    <section id="drive" className="bg-white py-20">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="section-label">Careers</span>
          <h2 className="section-title">Drive With Us</h2>
          <p className="mt-4 text-gray-500">
            Join a local team that values its drivers. Earn on your schedule, serve your
            own community, and be part of the ride Sudbury trusts.
          </p>

          <div className="mt-8 space-y-4">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-yellow/15 text-brand-yellow-dark">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <span className="font-medium text-brand-black">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h3 className="font-display text-base font-bold text-brand-black">
              What you&apos;ll need
            </h3>
            <ul className="mt-3 space-y-2">
              {REQUIREMENTS.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow-dark" strokeWidth={3} />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <a href="#contact" className="btn-dark mt-8">
            Apply to Drive
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative order-first lg:order-last">
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img
              src={IMAGE}
              alt="Professional driver behind the wheel ready for the next ride"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -left-2 -top-5 rounded-2xl bg-brand-black px-6 py-4 shadow-lg sm:left-6">
            <p className="font-display text-2xl font-extrabold text-brand-yellow">Now Hiring</p>
            <p className="text-sm text-gray-300">across Greater Sudbury</p>
          </div>
        </div>
      </div>
    </section>
  )
}
