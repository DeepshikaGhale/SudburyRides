import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { sendBooking } from './mailer.js'

const { PORT = 3001 } = process.env

const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_TO'].filter(
  (k) => !process.env[k],
)
if (missing.length) {
  console.warn(
    `[booking] Missing SMTP env vars: ${missing.join(', ')}. ` +
      `Copy .env.example to .env and fill these in.`,
  )
}

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/book', async (req, res) => {
  try {
    const result = await sendBooking(req.body)
    res.json(result)
  } catch (err) {
    if (err.status !== 400) console.error('[booking] failed:', err.cause?.message || err.message)
    res.status(err.status || 500).json({ error: err.message })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(Number(PORT), () => {
  console.log(`[booking] SMTP server listening on http://localhost:${PORT}`)
})
