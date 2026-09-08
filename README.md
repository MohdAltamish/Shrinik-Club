<p align="center">
  <img src="Shrinik%20Website/shrinik-frontend/public/assets/shrinik-logo.png" alt="Shrinik Club Logo" width="180" />
</p>

<h1 align="center">Shrinik Club</h1>

<p align="center">
  <strong>Where Ideas Become Innovation · Where Technology Meets Culture</strong>
</p>

<p align="center">
  <a href="https://shrinik-club.vercel.app">Live Website</a> ·
  <a href="mailto:shrinikclub@gmail.com">Contact</a> ·
  <a href="https://www.instagram.com/shrinik_glbajaj">Instagram</a>
</p>

---

## About

**Shrinik** is the official Computer Science & Engineering technical club of **G.L. Bajaj Institute of Technology and Management**, Greater Noida, established in 2021. It is a student-driven community where **technology, creativity and culture** come together — a space where students don't just participate, they create.

### The Three Pillars

| Pillar | Focus |
|---|---|
| 🔧 **Technology** | Explore, experiment and build solutions that turn ideas into working experiences |
| 🎨 **Creativity** | Give ideas an identity through design, media, editorial work and campaigns |
| 🎭 **Culture** | Bring people together through music, dance, events and shared experiences |

### The Shrinik Way

```
LEARN → CREATE → COLLABORATE → EXPERIENCE → IMPACT
```

- **Learn** — Weekly sessions, workshops and hands-on experiences across Web Dev, AI/ML, Competitive Programming and emerging technologies.
- **Build** — Hackathons, coding challenges and real-world projects.
- **Connect** — Grow with peers, seniors and industry professionals.

---

## Repository Structure

This is the **Shrinik Club monorepo** containing the website frontend, AI chatbot backend, content assets, and Discord automation tools.

```
Shrinik-Club/
├── Shrinik Website/
│   ├── shrinik-frontend/        # Next.js website (React 19 + Tailwind CSS 4)
│   │   ├── app/                 # Next.js App Router pages & layouts
│   │   ├── components/          # Reusable UI components
│   │   │   ├── chatbot/         # AI chatbot widget integration
│   │   │   ├── effects/         # Scroll, parallax & animation effects
│   │   │   ├── footer/          # Footer component
│   │   │   ├── intro/           # Intro splash screen
│   │   │   ├── navbar/          # Interactive navigation bar
│   │   │   ├── sections/        # Page sections (About, Events, Gallery, Contact)
│   │   │   └── team/            # Team cards & carousel showcase
│   │   ├── animations/          # GSAP & scroll animation utilities
│   │   ├── Crousel/             # Depth carousel effects
│   │   ├── data/                # Static data (team members, events, etc.)
│   │   ├── lib/                 # Shared constants & feature flags (SHOW_GALLERY)
│   │   └── public/              # Static assets (images, WebP portraits, SVGs)
│   │
│   └── shrinik-ai-chatbot/      # AI chatbot backend (Express.js)
│       ├── server.js            # Express API server (POST /api/chat)
│       ├── lib/                 # AI client (GLM), knowledge retrieval & rate limiting
│       ├── knowledge/           # Club knowledge base (about, teams, events, FAQ)
│       └── public/              # Demo page & embeddable widget
│
├── Shrinik - content/           # Club reference documents, branding logos & media
├── Shrinik Discord/             # Discord CRM automations & setup documentation
├── .gitignore                   # Root-level git ignore rules
└── README.md                    # Monorepo documentation
```

---

## Tech Stack

### Frontend — `shrinik-frontend/`

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.3.1 | React framework with App Router & Turbopack |
| [React](https://react.dev) | 19.2.8 | UI library |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first styling engine |
| [GSAP](https://gsap.com) | 3.15.0 | High-performance interactive animations |
| [Lenis](https://lenis.darkroom.engineering) | 1.3.26 | Smooth scrolling experience |
| [Lucide React](https://lucide.dev) | 1.31.0 | Modern UI icon library |
| [React Icons](https://react-icons.github.io/react-icons) | 5.7.0 | Social & brand icon set |
| TypeScript | 5.x | End-to-end type safety |

### AI Chatbot — `shrinik-ai-chatbot/`

| Technology | Purpose |
|---|---|
| [Express.js](https://expressjs.com) | HTTP API server |
| [Featherless AI / Gemini](https://featherless.ai) | LLM inference for club Q&A |
| RAG Knowledge Base | Grounded responses from club documentation |
| Rate Limiting | 10 requests/min per IP |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A [Featherless AI](https://featherless.ai) or Gemini API key (for local chatbot development)

---

### 1. Clone the Repository

```bash
git clone https://github.com/MohdAltamish/Shrinik-Club.git
cd Shrinik-Club
```

### 2. Frontend Setup

```bash
cd "Shrinik Website/shrinik-frontend"
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied) to view the website.

#### Available Frontend Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint validation |

> **Feature Flag Note (Gallery Section):**
> The Gallery section is safely archived by default. To re-enable it when gallery photos are ready, set `SHOW_GALLERY = true` in `shrinik-frontend/lib/constants.tsx`.

### 3. AI Chatbot Setup

```bash
cd "../shrinik-ai-chatbot"
npm install
cp .env.example .env
```

Configure `.env`:

```env
FEATHERLESS_API_KEY=your_actual_key_here
FEATHERLESS_BASE_URL=https://api.featherless.ai/v1
FEATHERLESS_MODEL=zai-org/GLM-5.2
PORT=3000
ALLOWED_ORIGIN=
```

Start the chatbot server:

```bash
npm start
# or development with auto-reload:
npm run dev
```

---

## Embedding the Chatbot

Host the chatbot server on any cloud platform (Railway, Render, etc.), then embed it using:

```html
<script
  src="https://your-server.com/widget.js"
  data-endpoint="https://your-server.com/api/chat"
></script>
```

---

## Updating Club Knowledge

The chatbot answers strictly from markdown files in `shrinik-ai-chatbot/knowledge/`:

| File | Content |
|---|---|
| `about.md` | Club overview, vision, pillars, ecosystem |
| `teams.md` | Team structure and member roles |
| `events.md` | Past and upcoming events (e.g. GLB Talks, orientations) |
| `contact.md` | Contact details, faculty coordinator info |
| `faq.md` | Frequently asked questions |

---

## Deployment

### Frontend (Vercel)

The Next.js frontend is configured for deployment on **Vercel**:

1. Import the repository on [vercel.com](https://vercel.com)
2. Set the **Root Directory** to `Shrinik Website/shrinik-frontend`
3. Vercel auto-detects Next.js and builds automatically

### Chatbot (Railway / Node.js Host)

1. Deploy `Shrinik Website/shrinik-ai-chatbot/`
2. Set build/start command to `node server.js`
3. Configure environment variables (`FEATHERLESS_API_KEY`, `ALLOWED_ORIGIN`)

---

## Contributing

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a **Pull Request**

---

## Contact

| Channel | Link |
|---|---|
| 📧 Email | [shrinikclub@gmail.com](mailto:shrinikclub@gmail.com) |
| 📞 Phone | +91 97601 66210 |
| 📸 Instagram | [@shrinik_glbajaj](https://www.instagram.com/shrinik_glbajaj) |
| 💼 LinkedIn | [Shrinik Club](https://www.linkedin.com/company/shrinik-club) |
| 📍 Location | G.L. Bajaj Institute of Technology and Management, Greater Noida |

---

## License

This project is proprietary to **Shrinik Club, G.L. Bajaj Institute of Technology and Management**. All rights reserved.

<p align="center">
  Built with ❤️ by the <strong>Shrinik Tech Team</strong>
</p>
