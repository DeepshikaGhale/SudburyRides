import { MapPin, ExternalLink } from 'lucide-react'

// Approximate relative positions (% of map area) of Greater Sudbury communities.
const MARKERS = [
  { name: 'Capreol', x: 72, y: 12 },
  { name: 'Hanmer', x: 64, y: 26 },
  { name: 'Val Caron', x: 60, y: 36 },
  { name: 'Chelmsford', x: 30, y: 30 },
  { name: 'Azilda', x: 38, y: 41 },
  { name: 'Garson', x: 70, y: 46 },
  { name: 'Falconbridge', x: 82, y: 40 },
  { name: 'New Sudbury', x: 56, y: 54 },
  { name: 'Minnow Lake', x: 60, y: 62 },
  { name: 'Downtown Sudbury', x: 48, y: 63 },
  { name: 'South End', x: 50, y: 74 },
  { name: 'Coniston', x: 76, y: 60 },
  { name: 'Lively', x: 30, y: 72 },
]

export default function MapSection() {
  return (
    <section id="map" className="bg-gray-50 py-20">
      <div className="container-px">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="section-label">Coverage Area</span>
          <h2 className="section-title">We Serve All Areas of Greater Sudbury</h2>
          <p className="mt-4 text-gray-500">
            From Downtown to Capreol, our drivers know every corner of the community.
            Wherever you are in Greater Sudbury, a ride is never far away.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-card">
          {/* Stylized map canvas */}
          <div
            className="relative h-[420px] w-full sm:h-[520px]"
            style={{
              backgroundColor: '#eaf1ea',
              backgroundImage:
                'linear-gradient(rgba(17,17,17,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.05) 1px, transparent 1px), radial-gradient(circle at 50% 60%, rgba(96,165,138,0.25), transparent 60%)',
              backgroundSize: '40px 40px, 40px 40px, 100% 100%',
            }}
          >
            {/* faux water bodies (Lake Ramsey / Nepahwin region) */}
            <div className="absolute left-[44%] top-[68%] h-20 w-28 rounded-[50%] bg-sky-300/50 blur-[1px]" />
            <div className="absolute left-[28%] top-[52%] h-14 w-20 rounded-[50%] bg-sky-300/40 blur-[1px]" />

            {/* faux highways */}
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <path
                d="M 5% 65% Q 40% 55% 95% 45%"
                stroke="#FFC107"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M 50% 5% Q 55% 45% 50% 95%"
                stroke="#ffffff"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>

            {/* Markers */}
            {MARKERS.map((m) => (
              <div
                key={m.name}
                className="group absolute -translate-x-1/2 -translate-y-full"
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
              >
                <div className="relative flex flex-col items-center">
                  {/* pulsing ring */}
                  <span className="absolute bottom-0 h-3 w-3 rounded-full bg-brand-yellow/60 group-hover:animate-pulse-ring" />
                  <MapPin
                    className="relative z-10 h-6 w-6 text-brand-black drop-shadow transition-transform duration-200 group-hover:-translate-y-1 group-hover:text-brand-yellow-dark"
                    fill="#FFC107"
                    strokeWidth={2}
                  />
                  <span className="pointer-events-none absolute -top-7 whitespace-nowrap rounded-md bg-brand-black px-2 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                    {m.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Legend chip */}
            <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-4 py-3 shadow-md backdrop-blur">
              <p className="flex items-center gap-2 text-sm font-bold text-brand-black">
                <MapPin className="h-4 w-4 text-brand-yellow-dark" fill="#FFC107" />
                {MARKERS.length} communities served
              </p>
            </div>
          </div>

          {/* footer bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-6 py-5 sm:flex-row">
            <p className="text-sm text-gray-500">
              Hover a pin to see the community name. Service limited to Greater Sudbury.
            </p>
            <a
              href="https://www.google.com/maps/place/Greater+Sudbury,+ON"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark"
            >
              View Full Map
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
