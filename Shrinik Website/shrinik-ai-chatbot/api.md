# Shrinik Chatbot — Backend API Reference

Base URL (local): `http://localhost:3000`
Base URL (deployed): `https://your-backend-host.com` *(deploy this repo anywhere that runs Node — Render, Railway, Fly.io, a college VPS)*

Your existing website only needs to call **one endpoint**. No API key or auth headers required from the frontend — protection is handled by rate limiting + CORS.

---

## 1. POST `/api/chat`

Sends a user question, returns the AI answer grounded in Shrinik Club data.

### Request

| Header | Value |
|---|---|
| `Content-Type` | `application/json` |

**Body**

| Field | Type | Required | Rules |
|---|---|---|---|
| `message` | string | yes | 1–500 characters |
| `history` | array | no | Last few turns for follow-up questions. Max last 6 used. Each item: `{ "role": "user" \| "model", "text": "..." }` |

### Demo request

```json
{
  "message": "who are the tech members of shrinik club?",
  "history": [
    { "role": "user", "text": "hi, what is shrinik?" },
    { "role": "model", "text": "Shrinik is the official CSE technical club of G.L. Bajaj, established in 2021..." }
  ]
}
```

Minimal request (first message):

```json
{
  "message": "how can i join shrinik?"
}
```

### Success response — `200 OK`

```json
{
  "reply": "The Tech Team of Shrinik Club is led by Palak Chadha with Altamish as Co-Lead and Aashish Pandey as Web Master. Its main members are Anurag Singh, Aabgeen, Ashwani, Manjot Kaur, Damini, Ayush Bhatnagar, and Tushar Sharma."
}
```

> `reply` is always plain text (no markdown symbols). Render it as text, not HTML.

### Error responses

**`400 Bad Request`** — empty or too-long message

```json
{
  "error": "Message too long. Please keep it under 500 characters."
}
```

**`429 Too Many Requests`** — more than 10 messages/min from same IP

```json
{
  "error": "Too many messages. Please wait a minute before trying again."
}
```

**`500 Internal Server Error`** — server misconfigured (e.g., missing GEMINI_API_KEY)

```json
{
  "error": "I'm having trouble answering right now. Please try again later or reach us at shrinikclub@gmail.com."
}
```

**`502 Bad Gateway`** — Featherless AI API failed/timed out

```json
{
  "error": "I'm having trouble answering right now. Please try again later or reach us at shrinikclub@gmail.com."
}
```

> Always show `data.error` to the user when status is not 200.

---

## 2. GET `/health`

Simple uptime check (for monitoring/uptime pings).

**Response — `200 OK`**

```json
{ "ok": true }
```

---

## 3. Frontend Integration (fetch)

```js
async function askShrinik(message, history = []) {
  const res = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data.reply;
}

// usage in your chat UI handler:
const reply = await askShrinik(userInput, conversationHistory);
```

**Keeping follow-up context:** after each successful exchange push both turns into an array you keep client-side, send only the last ~6 items:

```js
conversationHistory.push(
  { role: 'user', text: userInput },
  { role: 'model', text: reply }
);
if (conversationHistory.length > 6) conversationHistory = conversationHistory.slice(-6);
```

---

## 4. CORS — allow your website's origin

By default all origins are allowed (easy for development). For production, set your website URL(s) in the backend `.env`:

```
ALLOWED_ORIGIN=https://yourclubwebsite.com,https://www.yourclubwebsite.com
```

Requests from any other origin will then be blocked by browsers.

## 5. Rate Limits & Limits Summary

| Limit | Value |
|---|---|
| Messages per IP | 10 / minute |
| Max message length | 500 chars |
| History sent per request | last 6 turns |
| Response timeout risk | LLM latency (~1–5s typical) |

## 6. Deploy Checklist

- [ ] Push repo (`.env` excluded via `.gitignore`)
- [ ] On host: set env vars `FEATHERLESS_API_KEY`, `ALLOWED_ORIGIN`, (`PORT` auto-set by most hosts), optional `FEATHERLESS_BASE_URL` / `FEATHERLESS_MODEL`
- [ ] Start command: `npm start`
- [ ] Update your site's fetch URL from `http://localhost:3000` to deployed base URL
- [ ] Test: `curl -X POST https://your-backend-host.com/api/chat -H "Content-Type: application/json" -d "{\"message\":\"who is HOD of shrinik\"}"`
