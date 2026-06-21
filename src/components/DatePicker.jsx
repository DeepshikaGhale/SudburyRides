import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

function toISO(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function parseISO(s) {
  if (!s) return null
  const [y, m, d] = s.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

// Brand-styled date picker. Stores an ISO `YYYY-MM-DD` string; disables past days.
export default function DatePicker({ value, onChange, name = 'date', placeholder = 'Pick-up Date', error }) {
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)

  const selected = parseISO(value)
  const today = startOfDay(new Date())
  const [view, setView] = useState(selected || today) // any day inside the visible month

  // Jump the view to the selected date each time the popup opens.
  useEffect(() => {
    if (open) setView(selected || today)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Close on outside click.
  useEffect(() => {
    function onDown(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const days = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1)
    const gridStart = new Date(first)
    gridStart.setDate(1 - first.getDay()) // back up to the Sunday of the first week
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(gridStart)
      d.setDate(gridStart.getDate() + i)
      return d
    })
  }, [view])

  const shiftMonth = (delta) => setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1))

  function pick(d) {
    if (startOfDay(d) < today) return
    onChange(toISO(d))
    setOpen(false)
  }

  const triggerLabel = selected
    ? selected.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : placeholder

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
        <CalendarIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <span className={selected ? 'text-brand-black' : 'text-gray-400'}>{triggerLabel}</span>
      </button>

      {open && (
        <div className="absolute z-40 mt-2 w-[20rem] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-gray-100 bg-white p-4 shadow-card">
          {/* Month header */}
          <div className="flex items-center justify-between">
            <p className="font-display text-base font-extrabold text-brand-black">
              {MONTHS[view.getMonth()]} {view.getFullYear()}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => shiftMonth(-1)}
                className="grid h-8 w-8 place-items-center rounded-lg text-brand-black transition-colors hover:bg-brand-yellow/20 hover:text-brand-yellow-dark"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => shiftMonth(1)}
                className="grid h-8 w-8 place-items-center rounded-lg text-brand-black transition-colors hover:bg-brand-yellow/20 hover:text-brand-yellow-dark"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Weekday labels */}
          <div className="mt-3 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((w, i) => (
              <div key={i} className="grid h-8 place-items-center text-[11px] font-bold uppercase text-gray-400">
                {w}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
              const inMonth = d.getMonth() === view.getMonth()
              const isPast = startOfDay(d) < today
              const isSelected = sameDay(d, selected)
              const isToday = sameDay(d, today)

              let cls = 'grid h-9 w-9 place-items-center rounded-lg text-sm transition-colors '
              if (isPast) cls += 'cursor-not-allowed text-gray-300'
              else if (isSelected) cls += 'bg-brand-yellow font-extrabold text-brand-black shadow-sm'
              else if (isToday) cls += 'font-bold text-brand-yellow-dark ring-1 ring-brand-yellow hover:bg-brand-yellow/15'
              else if (inMonth) cls += 'text-brand-black hover:bg-brand-yellow/15'
              else cls += 'text-gray-300 hover:bg-gray-100'

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isPast}
                  onClick={() => pick(d)}
                  className={cls}
                >
                  {d.getDate()}
                </button>
              )
            })}
          </div>

          {/* Footer actions */}
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={() => {
                onChange('')
                setOpen(false)
              }}
              className="text-sm font-semibold text-gray-400 transition-colors hover:text-brand-black"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => pick(today)}
              className="text-sm font-semibold text-brand-yellow-dark transition-colors hover:underline"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
