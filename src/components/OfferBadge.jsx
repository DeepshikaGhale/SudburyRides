import { BadgePercent } from 'lucide-react'

// Promo coupon shown in the hero. Rendered twice by Hero.jsx — floating beside
// the headline on xl screens, stacked in the content flow below that — so
// positioning/rotation is passed in via `className`.
export default function OfferBadge({ className = '' }) {
  return (
    <div
      className={`relative w-full max-w-[19rem] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-yellow via-brand-yellow to-brand-yellow-dark px-6 py-6 text-brand-black shadow-glow ring-1 ring-black/10 ${className}`}
    >
      {/* Oversized watermark + dashed coupon rule, both purely decorative */}
      <BadgePercent
        aria-hidden="true"
        className="pointer-events-none absolute -right-5 -top-5 h-28 w-28 text-brand-black/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2.5 rounded-xl border-2 border-dashed border-brand-black/25"
      />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-yellow">
          <BadgePercent className="h-3.5 w-3.5" />
          Senior Discount
        </span>

        <p className="mt-4 flex items-baseline gap-2 font-display font-extrabold leading-none">
          <span className="text-6xl tracking-tight">10%</span>
          <span className="text-2xl uppercase tracking-[0.2em]">Off</span>
        </p>

        <p className="mt-3 font-display text-sm font-bold uppercase leading-snug tracking-[0.12em]">
          For Our Senior Citizens
        </p>

        <div className="my-4 border-t-2 border-dashed border-brand-black/25" />

        <p className="text-xs font-medium leading-relaxed text-brand-black/75">
          Every ride, any time — just mention it when you book or call dispatch.
        </p>
      </div>
    </div>
  )
}
