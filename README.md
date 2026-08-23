<p align="center">
  <img src="shrinik-frontend/public/assets/shrinik-logo.png" alt="Shrinik Club Logo" width="180" />
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

This is the **Shrinik Club monorepo** containing the website frontend, AI chatbot backend, and content assets.

```
Shrinik-Club/
├── shrinik-frontend/        # Next.js website (React 19 + Tailwind CSS 4)
│   ├── app/                 # Next.js App Router pages & layouts
│   ├── components/          # Reusable UI components
│   │   ├── chatbot/         # AI chatbot widget integration
│   │   ├── effects/         # Scroll, parallax & animation effects
│   │   ├── footer/          # Footer component
│   │   ├── intro/           # Intro/splash screen
│   │   ├── navbar/          # Navigation bar
│   │   ├── sections/        # Page sections (About, Events, Gallery, Contact)
│   │   └── team/            # Team cards & carousel
│   ├── animations/          # GSAP & scroll animation utilities
│   ├── Crousel/             # Carousel configuration
│   ├── data/                # Static data (team members, etc.)
│   ├── lib/                 # Shared constants & utilities
│   └── public/              # Static assets (images, videos, SVGs)
│
├── shrinik-ai-chatbot/      # AI chatbot backend (Express.js)
│   ├── server.js            # Express API server (POST /api/chat)
│   ├── lib/
│   │   ├── ai.js            # Featherless AI (GLM model) integration
│   │   ├── knowledge.js     # RAG-style knowledge retrieval
│   │   └── rateLimit.js     # Per-IP rate limiting
│   ├── knowledge/           # Club knowledge base (about, teams, events, FAQ)
│   └── public/              # Demo page & embeddable widget
│
├── content/                 # Reference documents & brand assets
│   ├── Shrinik_Premium_Polished_Website_Content.docx
│   ├── Shrinik_Website_Content.docx
│   └── shrinik.pdf
│
├── .gitignore               # Root-level git ignore rules
└── README.md                # ← You are here
```

---

## Tech Stack

### Frontend — `shrinik-frontend/`

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.3.1 | React framework with App Router |
| [React](https://react.dev) | 19.2.8 | UI library |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first CSS framework |
| [GSAP](https://gsap.com) | 3.15.0 | Professional-grade animations |
| [Lenis](https://lenis.darkroom.engineering) | 1.3.26 | Smooth scroll engine |
| [Lucide React](https://lucide.dev) | 1.31.0 | Icon library |
| [React Icons](https://react-icons.github.io/react-icons) | 5.7.0 | Extended icon set |
| TypeScript | 5.x | Type safety |

### AI Chatbot — `shrinik-ai-chatbot/`

| Technology | Purpose |
|---|---|
| [Express.js](https://expressjs.com) | HTTP API server |
| [Featherless AI](https://featherless.ai) (GLM-5.2) | LLM inference (OpenAI-compatible) |
| RAG Knowledge Base | Grounded responses from club documents |
| Rate Limiting | 10 requests/min per IP |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A [Featherless AI](https://featherless.ai) API key (for the chatbot)

---

### 1. Clone the Repository

```bash
git clone https://github.com/MohdAltamish/Shrinik-Club.git
cd Shrinik-Club
```

### 2. Frontend Setup

```bash
cd shrinik-frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

#### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint checks |

### 3. AI Chatbot Setup

```bash
cd shrinik-ai-chatbot
npm install
cp .env.example .env
```

Edit `.env` and add your Featherless API key:

```env
FEATHERLESS_API_KEY=your_actual_key_here
FEATHERLESS_BASE_URL=https://api.featherless.ai/v1
FEATHERLESS_MODEL=zai-org/GLM-5.2
PORT=3000
ALLOWED_ORIGIN=
```

Then start the server:

```bash
npm start
# or with file-watching for development:
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click the chat button to test.

> **Note:** The frontend and chatbot both default to port 3000. Run the chatbot on a different port (e.g. `PORT=3001`) when developing both simultaneously.

---

## Embedding the Chatbot

Host the chatbot server anywhere (Render, Railway, Vercel, etc.), then add one script tag to any page:

```html
<script
  src="https://your-server.com/widget.js"
  data-endpoint="https://your-server.com/api/chat"
></script>
```

Optional attributes: `data-title`, `data-subtitle`.

Lock down CORS by setting `ALLOWED_ORIGIN` in `.env`:

```env
ALLOWED_ORIGIN=https://shrinik-frontend.vercel.app
```

---

## Updating Club Knowledge

The chatbot answers strictly from the files in `shrinik-ai-chatbot/knowledge/`. Each `## Heading` becomes a retrieval chunk.

| File | Content |
|---|---|
| `about.md` | Club overview, vision, pillars, ecosystem |
| `teams.md` | Team structure and member roles |
| `events.md` | Past and upcoming events |
| `contact.md` | Contact details, HOD info, collaboration |
| `faq.md` | Frequently asked questions |

To update: edit any file → restart the chatbot server. Unknown queries are redirected to **shrinikclub@gmail.com**.

---

## Deployment

### Frontend (Vercel)

The Next.js frontend is deployed on **Vercel**:

1. Import the repository on [vercel.com](https://vercel.com)
2. Set the **Root Directory** to `shrinik-frontend`
3. Vercel auto-detects Next.js and deploys

### Chatbot (Any Node.js host)

Deploy `shrinik-ai-chatbot/` to any Node.js host (Render, Railway, etc.):

1. Set the root/start command to `node server.js`
2. Configure environment variables from `.env.example`
3. Set `ALLOWED_ORIGIN` to your frontend URL

---

## Ecosystem Areas

The club operates across eight verticals:

| Area | Description |
|---|---|
| 💻 Tech | Web Dev, AI/ML, CP, emerging tech |
| 🎨 Design | Visual identity, UI/UX, graphics |
| ✍️ Editorial | Content writing, documentation |
| 📢 PR | Public relations, outreach |
| 📱 Social Media | Digital presence, campaigns |
| 🎪 Events | Workshops, hackathons, flagship events |
| 💃 Dance | Cultural performances |
| 🎵 Music | Musical performances |

---

## Contributing

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a **Pull Request**

### Guidelines

- Follow the existing code style and project structure
- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
- Never commit API keys, `.env` files, or `node_modules/`
- Keep large media files (videos > 10 MB) out of the repository

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

---

<p align="center">
  Built with ❤️ by the <strong>Shrinik Tech Team</strong>
</p>
