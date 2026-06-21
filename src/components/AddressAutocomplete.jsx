import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { searchPlaces } from '../lib/geo'

// Controlled text input with a place-suggestions dropdown.
//   value / onChange  -> the raw text in the box
//   onSelect(place|null) -> fires with a {lat, lon, label} place on pick, or null when
//                           the user edits the text (so a stale selection is cleared)
export default function AddressAutocomplete({
  icon: Icon,
  name,
  placeholder,
  value,
  onChange,
  onSelect,
  fieldClass,
}) {
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [highlight, setHighlight] = useState(-1)

  const boxRef = useRef(null)
  const abortRef = useRef(null)
  const skipNextSearch = useRef(false) // don't re-search right after a pick

  // Debounced search as the user types.
  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false
      return
    }
    const q = value.trim()
    if (q.length < 3) {
      setResults([])
      setOpen(false)
      return
    }

    const timer = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort()
      const ctrl = new AbortController()
      abortRef.current = ctrl
      try {
        setLoading(true)
        const places = await searchPlaces(q, ctrl.signal)
        setResults(places)
        setOpen(places.length > 0)
        setHighlight(-1)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setResults([])
          setOpen(false)
        }
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [value])

  // Close the dropdown on an outside click.
  useEffect(() => {
    function onDocMouseDown(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [])

  function choose(place) {
    skipNextSearch.current = true
    onChange(place.label)
    onSelect(place)
    setResults([])
    setOpen(false)
    setHighlight(-1)
  }

  function onKeyDown(e) {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      if (highlight >= 0 && results[highlight]) {
        e.preventDefault()
        choose(results[highlight])
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="relative" ref={boxRef}>
      <Icon className="pointer-events-none absolute left-3.5 top-[1.4rem] h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        name={name}
        autoComplete="off"
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          onSelect(null)
        }}
        onFocus={() => {
          if (results.length > 0) setOpen(true)
        }}
        onKeyDown={onKeyDown}
        className={fieldClass}
      />

      {loading && (
        <span className="absolute right-3.5 top-[1.4rem] h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-gray-300 border-t-brand-yellow-dark" />
      )}

      {open && results.length > 0 && (
        <ul className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {results.map((r, i) => (
            <li key={`${r.lat},${r.lon},${i}`}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(r)}
                className={`flex w-full items-start gap-2.5 px-3 py-2 text-left ${
                  i === highlight ? 'bg-brand-yellow/15' : 'hover:bg-gray-50'
                }`}
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow-dark" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-brand-black">
                    {r.primary}
                  </span>
                  {r.secondary && (
                    <span className="block truncate text-xs text-gray-500">{r.secondary}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
