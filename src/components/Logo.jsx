// Logos live in /public and are served from the site root.
// logo-light.png → black "SUDBURY" wordmark (for light backgrounds)
// logo-dark.png  → white "SUDBURY" wordmark (for dark backgrounds)
const LOGO_LIGHT = '/logo-light.png'
const LOGO_DARK = '/logo-dark.png'

/**
 * Sudbury Rides brand logo (map-pin + taxi icon with the "SUDBURY RIDES"
 * wordmark). Uses the official artwork from /public. Pass `dark` when the
 * logo sits on a dark surface (navbar/footer) to get the white wordmark.
 */
export default function Logo({ dark = false, className = '' }) {
  return (
    <a
      href="#home"
      aria-label="Sudbury Rides — home"
      className={`inline-flex items-center transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
    >
      <img
        src={dark ? LOGO_DARK : LOGO_LIGHT}
        alt="Sudbury Rides"
        className="h-10 w-auto sm:h-11"
        loading="eager"
        decoding="async"
      />
    </a>
  )
}
