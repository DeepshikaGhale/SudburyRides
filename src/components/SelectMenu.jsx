import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

// Brand-styled replacement for a native <select>. Stores the chosen option's value.
//   options: [{ value, label }]
export default function SelectMenu({ icon: Icon, name, placeholder, options, value, onChange, error }) {
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    function onDown(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const current = options.find((o) => String(o.value) === String(value))

  return (
    <div className="relative" ref={boxRef}>
      <input type="hidden" name={name} value={value || ''} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center rounded-lg border bg-gray-50 py-3 pl-11 pr-10 text-left text-sm outline-none transition-all ${
          error
            ? 'border-red-400 ring-2 ring-red-200'
            : open
              ? 'border-brand-yellow bg-white ring-2 ring-brand-yellow/30'
              : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <span className={current ? 'text-brand-black' : 'text-gray-400'}>
          {current ? current.label : placeholder}
        </span>
        <ChevronDown
          className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul className="absolute z-40 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-gray-100 bg-white p-1.5 shadow-card">
          {options.map((o) => {
            const active = String(o.value) === String(value)
            return (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(String(o.value))
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    active ? 'bg-brand-yellow/15 font-semibold text-brand-black' : 'text-brand-black hover:bg-gray-50'
                  }`}
                >
                  {o.label}
                  {active && <Check className="h-4 w-4 text-brand-yellow-dark" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
