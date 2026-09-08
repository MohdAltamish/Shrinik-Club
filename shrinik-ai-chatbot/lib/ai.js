const BASE_URL = process.env.FEATHERLESS_BASE_URL || 'https://api.featherless.ai/v1';
const MODEL = process.env.FEATHERLESS_MODEL || 'zai-org/GLM-5.2';

const SYSTEM_PROMPT = `You are Shrinik AI, the official assistant for Shrinik Club, the Computer Science & Engineering technical club of G.L. Bajaj Institute of Technology and Management, Greater Noida, established in 2021. Taglines: "Where Ideas Become Innovation." and "Where Technology Meets Culture."

RULES:
- Answer ONLY using the club information provided in the context below.
- When asked about members, teams, HOD or events, always list the actual names and details given in the context.
- If the answer is not in the context, honestly say you don't have that information and point them to email shrinikclub@gmail.com or Instagram @shrinik_glbajaj.
- NEVER invent events, dates, names, phone numbers, links or facts about the club.
- Keep answers short (2-5 sentences), friendly and helpful.
- Use plain text only: no markdown symbols like **, *, #, or bullet dashes.
- You may greet users and briefly describe what you can help with (club info, teams, events, how to join, contact).`;

function getApiKey() {
  const apiKey = process.env.FEATHERLESS_API_KEY;
  if (!apiKey || apiKey.includes('your_')) {
    throw new Error('FEATHERLESS_API_KEY is not set. Add your real key to the .env file.');
  }
  return apiKey;
}

async function getAnswer(message, history = [], context = '') {
  const apiKey = getApiKey();

  const messages = [{ role: 'system', content: SYSTEM_PROMPT }];

  for (const turn of history.slice(-6)) {
    const text = String(turn.text || '').slice(0, 800);
    if (!text) continue;
    messages.push({
      role: turn.role === 'model' ? 'assistant' : 'user',
      content: text
    });
  }

  messages.push({
    role: 'user',
    content: `CLUB INFORMATION:\n"""\n${context}\n"""\n\nQUESTION: ${message}`
  });

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.35,
      max_tokens: 2048
    })
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Featherless API error ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  const reply = ((data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '').trim();

  if (!reply) {
    return "Sorry, I couldn't generate an answer right now. Please try again or contact us at shrinikclub@gmail.com.";
  }
  return reply;
}

module.exports = { getAnswer };
