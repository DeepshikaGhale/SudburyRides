# Sudbury Rides 🚕

A modern, responsive single-page React website for **Sudbury Rides** — a local ride/taxi
company serving **Greater Sudbury, Ontario** only.

Built with **React 18 + Vite + Tailwind CSS** and **Lucide React** icons. Fully
front-end — the booking form is static (no backend).

## Tech stack

- ⚛️ React 18 (functional components + hooks)
- ⚡ Vite 5 (dev server + build)
- 🎨 Tailwind CSS 3 (custom brand theme)
- 🔣 lucide-react (icons)
- 🔤 Montserrat / Poppins (Google Fonts)

## Brand

| Token | Value |
| --- | --- |
| Yellow / Gold | `#FFC107` |
| Black | `#111111` |
| Dark gray | `#1c1c1c` |
| White | `#ffffff` |

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── favicon.png         # pin mark cropped from the brand logo
│   ├── logo-light.png      # logo with black wordmark (for light bg)
│   └── logo-dark.png       # logo with white wordmark (for dark bg — navbar/footer)
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Logo.jsx
        ├── Navbar.jsx          # sticky nav, mobile menu, phone + Book a Ride
        ├── Hero.jsx            # headline, CTAs, dark overlay + yellow accents
        ├── FeatureBar.jsx      # 24/7, Fast Dispatch, Drivers, Payments, Safe
        ├── BookingForm.jsx     # static booking form (#book)
        ├── MapSection.jsx      # stylized Greater Sudbury map + 13 markers
        ├── Services.jsx        # Local, Airport, Scheduled, Corporate, Accessible
        ├── WhyChooseUs.jsx     # 5 reasons (#about)
        ├── Rates.jsx           # sample pricing (#rates)
        ├── AreasServed.jsx     # 13 Greater Sudbury communities
        ├── Corporate.jsx       # corporate accounts (#corporate)
        ├── DriveWithUs.jsx     # driver recruitment (#drive)
        ├── Testimonials.jsx    # sample reviews
        └── Footer.jsx          # contact, socials, hours (#contact)
```

## Sections / navigation map

| Nav link | Section id |
| --- | --- |
| Home | `#home` |
| About | `#about` |
| Services | `#services` |
| Rates | `#rates` |
| Corporate | `#corporate` |
| Drive With Us | `#drive` |
| Contact | `#contact` |

## Notes

- The booking form is **front-end only** — submitting shows a confirmation state and
  does not send data anywhere. Wire up `handleSubmit` in `BookingForm.jsx` to your
  dispatch/CRM endpoint when ready.
- The brand logo (`logo-light.png` / `logo-dark.png`) and `favicon.png` were derived
  from the supplied artwork — trimmed of transparent padding so they sit tightly in the
  navbar and footer. The `Logo` component picks the right variant via its `dark` prop.
- Hero / interior images are hot-linked from Unsplash for demo purposes. Swap the URLs
  (or drop files into `public/`) before going live.
- Phone `(705) 123-4567` and email `info@sudburyrides.ca` are placeholders.
