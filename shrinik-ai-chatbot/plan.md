# Plan: AI Chatbot for College Club Website (Gemini API)

## 1. Goal
Add an AI chatbot to the club website that answers visitor questions about the club — events, teams, joining process, contact info, etc. — accurately, using the club's own content as context (RAG-style), not generic AI answers.

## 2. How It Works (Architecture)

```
User types question
        │
        ▼
┌──────────────────┐      ┌─────────────────────┐
│  Frontend widget │ ───▶ │  Backend API server │
│  (chat UI)       │ ◀─── │  (Node/Express or   │
└──────────────────┘      │   Python/FastAPI)   │
                          └─────────┬───────────┘
                                    │ 1. Retrieve relevant club info
                                    │    (from knowledge base)
                                    │ 2. Build prompt: club context + question
                                    │ 3. Call Gemini API
                                    ▼
                          ┌─────────────────────┐
                          │   Gemini API        │
                          │   (gemini-2.0-flash)│
                          └─────────────────────┘
```

**Why a backend? NEVER call the Gemini API directly from the browser** — your API key would be visible to anyone who opens DevTools. The key lives only on the server.

## 3. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Chat UI | HTML/CSS/JS widget (or React if site uses it) | Embeds into existing site |
| Backend | Node.js + Express (or Python FastAPI) | Simple, fast to build |
| AI | Google Gemini API (`gemini-2.0-flash`) | Free tier is generous enough for a club site |
| Knowledge base | Club info stored as text files / JSON → loaded into prompt | Simplest RAG; upgrade later to vector DB if needed |

## 4. Knowledge Base (what makes answers "proper")

Collect all club content into structured text:
- About the club / mission
- Events (upcoming + past)
- Teams & members
- How to join / membership form link
- FAQ (meeting times, location, socials)
- Contact info

Store each topic in `knowledge/` folder as `.md` or `.json`. At request time, the backend picks relevant chunks (simple keyword match first; embeddings later if needed) and injects them into the prompt.

## 5. Prompt Design (system instruction)

```
You are the official assistant for [Club Name], a student club at [College].
Answer ONLY using the provided club information below.
If the answer is not in the context, say you don't know and
point them to [contact email / Instagram].
Keep answers short, friendly, and helpful.
Never invent events, dates, or names.

CLUB INFORMATION:
{retrieved_context}
```

This grounding is what stops hallucinated answers.

## 6. Build Phases

### Phase 1 — Setup (Day 1)
- [ ] Get Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
- [ ] Put key in `.env` file → `GEMINI_API_KEY=...` (add `.env` to `.gitignore`)
- [ ] Init backend project, install `@google/generative-ai` (Node) or `google-generativeai` (Python)

### Phase 2 — Basic chat endpoint (Day 1–2)
- [ ] Create `POST /api/chat` route: receives `{ message }`, calls Gemini with system prompt, returns reply
- [ ] Test with curl / Postman

### Phase 3 — Ground it with club data (Day 2–3)
- [ ] Write club info into `knowledge/` files
- [ ] Load + retrieve relevant chunks per question (keyword search first)
- [ ] Inject retrieved context into prompt; verify answers stay accurate

### Phase 4 — Chat UI (Day 3–4)
- [ ] Floating chat button bottom-right of website
- [ ] Slide-up chat panel: message bubbles, typing indicator, input box
- [ ] Fetch from `/api/chat`, render reply

### Phase 5 — Hardening (Day 5+)
- [ ] Rate limiting (e.g., 10 msgs/min/IP) to protect free quota
- [ ] Cap input length (~500 chars) and output tokens
- [ ] Conversation memory: send last ~5 messages for follow-up questions
- [ ] Error handling: friendly fallback message if API fails
- [ ] Log questions (helps find gaps in club info)

### Optional upgrades (later)
- Vector search (embeddings + cosine similarity) instead of keyword matching
- Admin panel to edit club info without redeploying
- Streaming responses (typewriter effect)

## 7. Security Checklist
- [x] API key only in backend `.env`
- [ ] `.env` in `.gitignore` before first commit
- [ ] Validate/sanitize user input
- [ ] Rate limit public endpoint
- [ ] CORS restricted to your website domain

## 8. Free Tier Notes
Gemini free tier (~15 requests/min, 1500/day for flash models) is plenty for a club site initially. If exceeded, upgrade to paid tier or cache frequent Q&A pairs.

## 9. Deliverables
1. `server/` — Express/FastAPI app with `/api/chat`
2. `knowledge/` — club info files
3. `widget/` — embeddable chat UI snippet
4. `.env.example` — documents required env vars (no real keys)
