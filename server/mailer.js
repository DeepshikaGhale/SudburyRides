import nodemailer from 'nodemailer'

// Shared booking-email logic used by both the local Express server
// (server/index.js) and the Vercel serverless function (api/book.js).

// Escape user-supplied text before dropping it into the HTML email body.
const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

export function buildEmail(b) {
  const rows = [
    ['Name', b.fullName],
    ['Phone', b.phone],
    ['Pick-up', b.pickup],
    ['Drop-off', b.dropoff],
    ['Date', b.date],
    ['Time', b.time],
    ['Passengers', b.passengers],
    ['Approx', b.estimate],
    ['Notes', b.notes],
  ].filter(([, v]) => v)

  const text = ['New ride booking — Sudbury Rides', '']
    .concat(rows.map(([k, v]) => `${k}: ${v}`))
    .join('\n')

  const html = `
    <div style="font-family:system-ui,Arial,sans-serif;max-width:560px">
      <h2 style="margin:0 0 4px">New ride booking</h2>
      <p style="margin:0 0 16px;color:#666">Sudbury Rides</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;white-space:nowrap;vertical-align:top">${esc(
              k,
            )}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600">${esc(
              v,
            )}</td>
          </tr>`,
          )
          .join('')}
      </table>
    </div>`

  return { text, html }
}

// Build a transporter from the current environment. Created per-call so it
// picks up env vars in serverless cold starts.
function createTransport() {
  const { SMTP_HOST, SMTP_PORT = 587, SMTP_SECURE, SMTP_USER, SMTP_PASS } =
    process.env
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  })
}

// Validate + send a booking email. Returns { ok } or throws.
// `status` on a thrown error lets the caller pick the HTTP code.
export async function sendBooking(b = {}) {
  if (!b.fullName || !b.phone || !b.pickup || !b.dropoff) {
    const err = new Error('Missing required booking fields.')
    err.status = 400
    throw err
  }

  const { text, html } = buildEmail(b)
  const transporter = createTransport()

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      subject: `New ride booking — ${b.fullName}`,
      text,
      html,
    })
  } catch (err) {
    const wrapped = new Error('Could not send the booking email.')
    wrapped.status = 502
    wrapped.cause = err
    throw wrapped
  }

  return { ok: true }
}
