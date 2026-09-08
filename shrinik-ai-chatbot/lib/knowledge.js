const fs = require('fs');
const path = require('path');

const KNOWLEDGE_DIR = path.join(__dirname, '..', 'knowledge');

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am',
  'do', 'does', 'did', 'of', 'in', 'on', 'at', 'to', 'for', 'and', 'or',
  'but', 'not', 'with', 'what', 'who', 'whom', 'whose', 'which', 'when',
  'where', 'why', 'how', 'can', 'could', 'should', 'would', 'will', 'shall',
  'i', 'you', 'we', 'they', 'he', 'she', 'it', 'my', 'our', 'your', 'me',
  'us', 'tell', 'about', 'know', 'want', 'please', 'hi', 'hello', 'hey',
  'give', 'any', 'there', 'this', 'that', 'from', 'by', 'as'
]);

let chunks = [];

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function loadChunks() {
  chunks = [];
  const files = fs.readdirSync(KNOWLEDGE_DIR).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(KNOWLEDGE_DIR, file), 'utf8');
    const sections = raw.split(/^## /m);
    for (const section of sections) {
      const trimmed = section.trim();
      if (!trimmed) continue;
      const lines = trimmed.split('\n');
      const title = lines[0].replace(/^#\s*/, '').trim();
      const body = lines.slice(1).join('\n').trim();
      chunks.push({ title, body: `## ${title}\n${body}`.trim(), file });
    }
  }
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

function buildRegex(token) {
  return new RegExp(`\\b${escapeRe(token)}\\w*`, 'gi');
}

function countMatches(hay, re) {
  return (hay.match(re) || []).length;
}

function rankChunks(tokens) {
  const n = chunks.length;

  const regexes = new Map();
  const dfs = new Map();
  for (const token of tokens) {
    const re = buildRegex(token);
    let df = 0;
    for (const chunk of chunks) {
      if (re.test(chunk.title) || re.test(chunk.body)) df++;
      re.lastIndex = 0;
    }
    regexes.set(token, re);
    dfs.set(token, Math.log(1 + n / Math.max(df, 1)));
  }

  return chunks
    .map((chunk) => {
      const titleLower = chunk.title.toLowerCase();
      const bodyLower = chunk.body.toLowerCase();
      let score = 0;
      for (const [token, re] of regexes) {
        const titleHits = countMatches(titleLower, re);
        const bodyHits = countMatches(bodyLower, re);
        score += (titleHits * 3 + bodyHits) * dfs.get(token);
        re.lastIndex = 0;
      }
      return { chunk, score };
    })
    .sort((a, b) => b.score - a.score);
}

function retrieve(question, budget = 9000) {
  if (chunks.length === 0) loadChunks();

  const tokens = tokenize(question);
  const ranked =
    tokens.length === 0
      ? chunks.map((chunk) => ({ chunk }))
      : rankChunks(tokens);

  let context = '';
  let used = 0;
  for (const { chunk } of ranked) {
    if (used + chunk.body.length > budget) continue;
    context += chunk.body + '\n\n';
    used += chunk.body.length + 2;
  }
  return context.trim();
}

module.exports = { retrieve };
