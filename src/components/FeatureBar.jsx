import { Clock, Zap, UserCheck, CreditCard, ShieldCheck } from 'lucide-react'

const FEATURES = [
  { icon: Clock, label: '24/7 Service' },
  { icon: Zap, label: 'Fast Dispatch' },
  { icon: UserCheck, label: 'Professional Drivers' },
  { icon: CreditCard, label: 'Multiple Payment Options' },
  { icon: ShieldCheck, label: 'Safe & Reliable' },
]

export default function FeatureBar() {
  return (
    <section className="relative z-10 bg-brand-yellow">
      <div className="container-px grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-2">
        {FEATURES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-3 rounded-xl px-3 py-3 text-center transition-colors hover:bg-black/5"
          >
            <Icon className="h-6 w-6 shrink-0 text-brand-black" strokeWidth={2.2} />
            <span className="text-sm font-bold text-brand-black sm:text-[15px]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
