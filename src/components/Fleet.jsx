const FLEET = [
  { src: '/fleet-1.jpg', alt: 'Sudbury Rides branded van, front view' },
  { src: '/fleet-3.jpg', alt: 'Sudbury Rides branded van parked at a plaza' },
  { src: '/fleet-2.jpg', alt: 'Sudbury Rides branded van, rear with contact details' },
]

export default function Fleet() {
  return (
    <section id="fleet" className="bg-white py-20">
      <div className="container-px">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="section-label">Our Fleet</span>
          <h2 className="section-title">Meet the Sudbury Rides Fleet</h2>
          <p className="mt-4 text-gray-500">
            Clean, well-maintained and clearly marked — look for our vehicles across Greater
            Sudbury. Comfortable rides you can spot and trust.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FLEET.map((img) => (
            <div
              key={img.src}
              className="group overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
