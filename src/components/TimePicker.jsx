import { useEffect, useRef, useState } from 'react'
import { Clock } from 'lucide-react'

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1) // 1..12
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5) // 0,5,...,55
const PERIODS = ['AM', 'PM']
const pad = (n) => String(n).padStart(2, '0')

// Parse a 24h "HH:MM" string into { hour12, minute, period }.
function parse(value) {
  if (!value) return null
  const [h, m] = value.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return null
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return { hour12, minute: m, period }
}

// Combine pieces back into a 24h "HH:MM" string.
function toValue(hour12, minute, period) {
  let h = hour12 % 12
  if (period === 'PM') h += 12
  return `${pad(h)}:${pad(minute)}`
}

// Brand-styled time picker (hour / minute / AM-PM columns). Stores 24h "HH:MM".
export default function TimePicker({ value, onChange, name = 'time', placeholder = 'Pick-up Time', error }) {
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)

  const parsed = parse(value)
  const hour12 = parsed ? parsed.hour12 : null
  const minute = parsed ? parsed.minute : null
  const period = parsed ? parsed.period : null

  useEffect(() => {
    function onDown(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  function update(part, val) {
    const h = part === 'hour' ? val : hour12 || 12
    const m = part === 'minute' ? val : minute == null ? 0 : minute
    const p = part === 'period' ? val : period || 'AM'
    onChange(toValue(h, m, p))
  }

  const label = parsed ? `${hour12}:${pad(minute)} ${period}` : placeholder

  const colBtn = (active) =>
    `w-full rounded-lg px-2 py-2 text-center text-sm transition-colors ${
      active
        ? 'bg-brand-yellow font-extrabold text-brand-black shadow-sm'
        : 'text-brand-black hover:bg-brand-yellow/15'
    }`

  return (
    <div className="relative" ref={boxRef}>
      <input type="hidden" name={name} value={value || ''} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center rounded-lg border bg-gray-50 py-3 pl-11 pr-4 text-left text-sm outline-none transition-all ${
          error
            ? 'border-red-400 ring-2 ring-red-200'
            : open
              ? 'border-brand-yellow bg-white ring-2 ring-brand-yellow/30'
              : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <span className={parsed ? 'text-brand-black' : 'text-gray-400'}>{label}</span>
      </button>

      {open && (
        <div className="absolute z-40 mt-2 w-[16rem] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-gray-100 bg-white p-3 shadow-card">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="mb-1 text-center text-[11px] font-bold uppercase tracking-wide text-gray-400">Hr</p>
              <div className="max-h-44 space-y-1 overflow-auto pr-1">
                {HOURS.map((h) => (
                  <button key={h} type="button" onClick={() => update('hour', h)} className={colBtn(h === hour12)}>
                    {h}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 text-center text-[11px] font-bold uppercase tracking-wide text-gray-400">Min</p>
              <div className="max-h-44 space-y-1 overflow-auto pr-1">
                {MINUTES.map((m) => (
                  <button key={m} type="button" onClick={() => update('minute', m)} className={colBtn(m === minute)}>
                    {pad(m)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 text-center text-[11px] font-bold uppercase tracking-wide text-gray-400">&nbsp;</p>
              <div className="space-y-1">
                {PERIODS.map((p) => (
                  <button key={p} type="button" onClick={() => update('period', p)} className={colBtn(p === period)}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
