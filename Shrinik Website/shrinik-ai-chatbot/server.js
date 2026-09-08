require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { getAnswer } = require('./lib/ai');
const { retrieve } = require('./lib/knowledge');
const { rateLimiter } = require('./lib/rateLimit');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN
      ? process.env.ALLOWED_ORIGIN.split(',').map((o) => o.trim())
      : true
  })
);

if (!process.env.FEATHERLESS_API_KEY || process.env.FEATHERLESS_API_KEY.includes('your_')) {
  console.warn('[WARN] FEATHERLESS_API_KEY is missing. Copy .env.example to .env and add your key.');
}

app.post('/api/chat', rateLimiter({ windowMs: 60000, max: 10 }), async (req, res) => {
  const message =
    typeof req.body.message === 'string' ? req.body.message.trim() : '';
  const history = Array.isArray(req.body.history) ? req.body.history.slice(-6) : [];

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  if (message.length > 500) {
    return res.status(400).json({ error: 'Message too long. Please keep it under 500 characters.' });
  }

  try {
    const context = retrieve(message);
    const reply = await getAnswer(message, history, context);
    res.json({ reply });
  } catch (err) {
    console.error('[chat error]', err.message);
    const missingKey = err.message.includes('FEATHERLESS_API_KEY');
    res.status(missingKey ? 500 : 502).json({
      error:
        "I'm having trouble answering right now. Please try again later or reach us at shrinikclub@gmail.com."
    });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Shrinik AI assistant running at http://localhost:${PORT}`);
});
