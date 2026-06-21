import { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getRoute, SUDBURY } from '../lib/geo'

const CENTER = [SUDBURY.lat, SUDBURY.lon]

const PICKUP_COLOR = '#FFC107' // brand yellow
const DROPOFF_COLOR = '#ef4444' // red

// Custom teardrop pin (avoids Leaflet's bundler-broken default marker images).
// The letter sits on the white circle, so keep it dark for contrast.
function pin(color, letter) {
  return L.divIcon({
    className: '',
    html:
      `<div style="position:relative;width:30px;height:42px;">` +
      `<svg width="30" height="42" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">` +
      `<path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}"/>` +
      `<circle cx="12" cy="12" r="6.2" fill="#ffffff"/></svg>` +
      `<span style="position:absolute;top:4px;left:0;width:24px;text-align:center;` +
      `font:800 11px system-ui,sans-serif;color:#111111">${letter}</span></div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -38],
  })
}

const PICKUP_ICON = pin(PICKUP_COLOR, 'P')
const DROPOFF_ICON = pin(DROPOFF_COLOR, 'D')

// Draws pickup/dropoff pins and the driving route between them.
// Calls onRoute({ distanceKm, durationMin }) when a route is found, or onRoute(null).
export default function RouteMap({ pickup, dropoff, onRoute }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)
  const layerRef = useRef(null)
  const onRouteRef = useRef(onRoute)
  onRouteRef.current = onRoute

  // Create the map once.
  useEffect(() => {
    const map = L.map(elRef.current, {
      scrollWheelZoom: true,
      zoomControl: true,
    }).setView(CENTER, 11)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)
    layerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map
    // Container may have been sized after mount; recalc tiles.
    setTimeout(() => map.invalidateSize(), 0)
    return () => {
      map.remove()
      mapRef.current = null
      layerRef.current = null
    }
  }, [])

  // Redraw whenever pickup or dropoff changes.
  useEffect(() => {
    const map = mapRef.current
    const layer = layerRef.current
    if (!map || !layer) return

    layer.clearLayers()
    const pts = []
    if (pickup) {
      L.marker([pickup.lat, pickup.lon], { icon: PICKUP_ICON })
        .addTo(layer)
        .bindTooltip('Pick-up', {
          permanent: true,
          direction: 'top',
          offset: [0, -40],
          className: 'sr-tip sr-tip-pickup',
        })
      pts.push([pickup.lat, pickup.lon])
    }
    if (dropoff) {
      L.marker([dropoff.lat, dropoff.lon], { icon: DROPOFF_ICON })
        .addTo(layer)
        .bindTooltip('Drop-off', {
          permanent: true,
          direction: 'top',
          offset: [0, -40],
          className: 'sr-tip sr-tip-dropoff',
        })
      pts.push([dropoff.lat, dropoff.lon])
    }

    let cancelled = false
    const ctrl = new AbortController()

    async function draw() {
      if (pickup && dropoff) {
        try {
          const r = await getRoute(pickup, dropoff, ctrl.signal)
          if (cancelled) return
          if (r && r.coords.length) {
            // Dark casing underneath for contrast, bold yellow line on top.
            L.polyline(r.coords, {
              color: '#111111',
              weight: 9,
              opacity: 0.55,
              lineJoin: 'round',
              lineCap: 'round',
            }).addTo(layer)
            const line = L.polyline(r.coords, {
              color: '#FFC107',
              weight: 6,
              opacity: 1,
              lineJoin: 'round',
              lineCap: 'round',
            }).addTo(layer)
            map.fitBounds(line.getBounds().pad(0.18))
            if (onRouteRef.current) onRouteRef.current({ distanceKm: r.distanceKm, durationMin: r.durationMin })
          } else {
            map.fitBounds(L.latLngBounds(pts).pad(0.3))
            if (onRouteRef.current) onRouteRef.current(null)
          }
        } catch (err) {
          if (!cancelled && err.name !== 'AbortError') {
            map.fitBounds(L.latLngBounds(pts).pad(0.3))
            if (onRouteRef.current) onRouteRef.current(null)
          }
        }
      } else {
        if (onRouteRef.current) onRouteRef.current(null)
        if (pts.length === 1) map.setView(pts[0], 13)
        else map.setView(CENTER, 11)
      }
    }

    draw()
    return () => {
      cancelled = true
      ctrl.abort()
    }
  }, [pickup, dropoff])

  return (
    <div className="relative h-full w-full">
      <div ref={elRef} className="h-full w-full" />

      {/* Legend so it's clear which pin is which */}
      <div className="pointer-events-none absolute left-3 top-3 z-[1000] rounded-lg bg-white/95 px-3 py-2 shadow-md ring-1 ring-black/5">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-black">
          <MapPin className="h-4 w-4" fill={PICKUP_COLOR} color="#111111" strokeWidth={2} />
          Pick-up
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-brand-black">
          <MapPin className="h-4 w-4" fill={DROPOFF_COLOR} color="#111111" strokeWidth={2} />
          Drop-off
        </div>
      </div>
    </div>
  )
}
