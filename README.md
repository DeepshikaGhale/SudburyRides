# Sudbury Rides 🚕

A modern, responsive single-page React website for **Sudbury Rides** — a local ride/taxi
company serving **Greater Sudbury, Ontario** only.

Built with **React 18 + Vite + Tailwind CSS** and **Lucide React** icons. A small
**Express + Nodemailer** backend emails booking submissions to dispatch over SMTP.

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
npm run dev      # start the Vite dev server only (http://localhost:5173)
npm run server   # start the SMTP backend only (http://localhost:3001)
npm run dev:all  # run BOTH (frontend + backend) together
npm run build    # production build → dist/
npm run preview  # preview the production build
```

### Booking email (SMTP) setup

The booking form POSTs to `/api/book`, which the Express server (`server/index.js`)
turns into an email to your dispatch inbox via SMTP.

1. Copy the env template and fill in your SMTP credentials:

   ```bash
   cp .env.example .env
   ```

   | Var | What it is |
   | --- | --- |
   | `SMTP_HOST` / `SMTP_PORT` | Your mail provider's SMTP server (e.g. `587`) |
   | `SMTP_SECURE` | `true` only for port `465`; `587` uses STARTTLS |
   | `SMTP_USER` / `SMTP_PASS` | SMTP login (often an app password) |
   | `MAIL_FROM` | From address shown to dispatch |
   | `MAIL_TO` | Dispatch inbox that receives bookings |

2. Run `npm run dev:all`. In dev, Vite proxies `/api` → `http://localhost:3001`
   (see `vite.config.js`), so the form and backend talk to each other automatically.

> `.env` is gitignored — never commit real credentials. For production, run
> `npm run server` (or deploy it behind your host) and serve `dist/` from the same
> origin, or point the proxy/reverse-proxy `/api` at the backend.

## Project structure

```
.
├── index.html
├── package.json
├── vite.config.js          # includes the dev /api → backend proxy
├── tailwind.config.js
├── postcss.config.js
├── .env.example            # SMTP config template (copy to .env)
├── server/
│   └── index.js            # Express + Nodemailer: POST /api/book → email
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

- The booking form POSTs to the **Express SMTP backend** (`server/index.js`), which
  emails the booking to `MAIL_TO`. On success the form shows a confirmation state; on
  failure it shows an inline error and the call-dispatch fallback. Configure SMTP via
  `.env` (see *Booking email (SMTP) setup* above).
- The brand logo (`logo-light.png` / `logo-dark.png`) and `favicon.png` were derived
  from the supplied artwork — trimmed of transparent padding so they sit tightly in the
  navbar and footer. The `Logo` component picks the right variant via its `dark` prop.
- Hero / interior images are hot-linked from Unsplash for demo purposes. Swap the URLs
  (or drop files into `public/`) before going live.
- Phone `(705) 123-4567` and email `info@sudburyrides.ca` are placeholders.
