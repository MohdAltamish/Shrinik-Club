# Shrinik AI Chatbot

AI assistant for the Shrinik Club website (CSE Technical Club, G.L. Bajaj) powered by the Featherless AI API (GLM model), grounded strictly in the club's own information (RAG-style retrieval from `knowledge/` files, built from the official club PDFs).

## Project Structure

```
rag-system/
├── server.js            Express backend with POST /api/chat
├── lib/
│   ├── knowledge.js     Loads knowledge/ files + keyword retrieval
│   ├── ai.js            Featherless AI (OpenAI-compatible) call wrapper + system prompt
│   └── rateLimit.js     Per-IP rate limiting
├── knowledge/           Club info (about, teams, events, contact, faq)
├── public/
│   ├── index.html       Demo page
│   └── widget.js        Embeddable chat widget
├── .env.example         Environment variables template
└── plan.md              Build plan
```

## Setup

1. **Install dependencies**

   ```
   npm install
   ```

2. **Add your Featherless API key**

   Get a key at https://featherless.ai

   ```
   copy .env.example .env
   ```

   Then edit `.env` and paste your key into `FEATHERLESS_API_KEY`.

3. **Run the server**

   ```
   npm start
   ```

4. **Try it** — open http://localhost:3000 and click the chat button.

## Embedding on the Real Website

Host this server anywhere (Render, Railway, Vercel functions, a college server), then add one script tag to the club website:

```html
<script src="https://your-server.com/widget.js" data-endpoint="https://your-server.com/api/chat"></script>
```

Optional attributes: `data-title`, `data-subtitle`.

Set `ALLOWED_ORIGIN` in `.env` to your website's URL(s), comma separated, to lock down CORS:

```
ALLOWED_ORIGIN=https://shrinik-frontend.vercel.app
```

## Updating Club Info

Edit any file in `knowledge/` and restart the server. Each `## Heading` becomes a retrieval chunk — add new events/teams there so the bot stays accurate. The bot only answers from these files; anything unknown gets redirected to shrinikclub@gmail.com.

## Notes

- Model defaults to `zai-org/GLM-5.2` via Featherless. Change via `FEATHERLESS_MODEL` (any model on your Featherless plan).
- Rate limited to 10 messages/min/IP.
- Never put the API key in frontend code — it lives only in `.env` on the server.
