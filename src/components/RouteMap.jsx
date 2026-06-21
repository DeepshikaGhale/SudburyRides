import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getRoute, SUDBURY } from '../lib/geo'

const CENTER = [SUDBURY.lat, SUDBURY.lon]

// Custom teardrop pin (avoids Leaflet's bundler-broken default marker images).
function pin(color, letter) {
  return L.divIcon({
    className: '',
    html:
      `<div style="position:relative;width:30px;height:42px;">` +
      `<svg width="30" height="42" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">` +
      `<path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}"/>` +
      `<circle cx="12" cy="12" r="6.2" fill="#ffffff"/></svg>` +
      `<span style="position:absolute;top:4px;left:0;width:24px;text-align:center;` +
      `font:700 11px system-ui,sans-serif;color:${color}">${letter}</span></div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -38],
  })
}

const PICKUP_ICON = pin('#16a34a', 'P')
const DROPOFF_ICON = pin('#111111', 'D')

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
    const map = L.map(elRef.current, { scrollWheelZoom: false }).setView(CENTER, 11)
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
      L.marker([pickup.lat, pickup.lon], { icon: PICKUP_ICON }).addTo(layer).bindPopup('Pick-up')
      pts.push([pickup.lat, pickup.lon])
    }
    if (dropoff) {
      L.marker([dropoff.lat, dropoff.lon], { icon: DROPOFF_ICON })
        .addTo(layer)
        .bindPopup('Drop-off')
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

  return <div ref={elRef} className="h-full w-full" />
}
