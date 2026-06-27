import { sendBooking } from '../server/mailer.js'

// Vercel serverless function: POST /api/book
// Env vars (SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO, …) are set in
// the Vercel project dashboard, not from a .env file.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Vercel parses JSON bodies automatically; guard for the string case too.
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body
    const result = await sendBooking(body)
    res.status(200).json(result)
  } catch (err) {
    if (err.status !== 400) {
      console.error('[booking] failed:', err.cause?.message || err.message)
    }
    // TEMP DEBUG: expose the underlying SMTP error to diagnose the live 502.
    res
      .status(err.status || 500)
      .json({ error: err.message, detail: err.cause?.message })
  }
}
