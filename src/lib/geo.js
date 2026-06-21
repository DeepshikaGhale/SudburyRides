// Lightweight, key-free geocoding + routing helpers.
//   - Autocomplete: Photon (https://photon.komoot.io) — OpenStreetMap-based, no API key.
//   - Routing/distance: OSRM public demo server — no API key.
// Both are biased toward Greater Sudbury, Ontario.

export const SUDBURY = { lat: 46.49, lon: -80.99 }

function featureToPlace(f) {
  const coords = f.geometry && f.geometry.coordinates
  if (!coords) return null
  const [lon, lat] = coords
  if (lat == null || lon == null) return null

  const p = f.properties || {}
  const primary =
    [p.housenumber, p.street].filter(Boolean).join(' ') ||
    p.name ||
    p.street ||
    'Unnamed location'
  const secondary = [p.city || p.town || p.village || p.district, p.state, p.country]
    .filter(Boolean)
    .join(', ')

  return {
    lat,
    lon,
    primary,
    secondary,
    label: [primary, secondary].filter(Boolean).join(', '),
  }
}

// Returns up to ~6 place suggestions for a typed query.
export async function searchPlaces(query, signal) {
  const url =
    'https://photon.komoot.io/api/?' +
    `q=${encodeURIComponent(query)}&lat=${SUDBURY.lat}&lon=${SUDBURY.lon}&limit=6&lang=en`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error('Place search failed')
  const data = await res.json()
  return (data.features || []).map(featureToPlace).filter(Boolean)
}

// Driving route between two {lat, lon} points.
// Returns { distanceKm, durationMin, coords: [[lat, lon], ...] } or null.
export async function getRoute(a, b, signal) {
  const url =
    'https://router.project-osrm.org/route/v1/driving/' +
    `${a.lon},${a.lat};${b.lon},${b.lat}?overview=full&geometries=geojson`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error('Routing failed')
  const data = await res.json()
  const route = data.routes && data.routes[0]
  if (!route) return null
  const coords = ((route.geometry && route.geometry.coordinates) || []).map(([lon, lat]) => [
    lat,
    lon,
  ])
  return {
    distanceKm: route.distance / 1000,
    durationMin: route.duration / 60,
    coords,
  }
}
