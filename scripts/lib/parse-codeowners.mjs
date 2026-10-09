/**
 * Parse CODEOWNERS text into individuals, teams, triagers.
 * Excludes asyncapi-bot-eve from maintainer-style lists (bot reviewer).
 */
const BOT_MAINTAINER_EXCLUDE = new Set(['asyncapi-bot-eve']);

function normalizeHandle(token) {
  const t = token.replace(/^@/, '').trim();
  return t || null;
}

function isTeamHandle(handle) {
  return handle.includes('/') && !handle.startsWith('/');
}

export function parseCodeowners(raw) {
  const maintainersIndividuals = new Set();
  const teams = new Set();
  const triagers = new Set();

  const lines = (raw || '').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      extractTriagerHints(trimmed).forEach((t) => triagers.add(t));
      continue;
    }

    const matches = trimmed.matchAll(/@([^\s@]+)/g);
    for (const m of matches) {
      const h = normalizeHandle(m[1]);
      if (!h || BOT_MAINTAINER_EXCLUDE.has(h)) continue;
      if (isTeamHandle(h)) teams.add(h);
      else maintainersIndividuals.add(h);
    }
  }

  return {
    maintainers_individuals: [...maintainersIndividuals].sort(),
    teams: [...teams].sort(),
    triagers: [...triagers].sort(),
    codeowners_raw: raw || '',
  };
}

function extractTriagerHints(commentLine) {
  const out = new Set();
  const withoutHash = commentLine.replace(/^\s*#\s*/, '').trim();
  if (!withoutHash) return out;

  const colon = withoutHash.match(/triag(?:er|ers)?\s*:\s*(.+)$/i);
  if (colon) {
    colon[1].split(/[\s,]+/).forEach((t) => {
      const u = t.replace(/^@/, '').replace(/[^\w-]/g, '');
      if (u && !BOT_MAINTAINER_EXCLUDE.has(u)) out.add(u);
    });
  }

  for (const m of withoutHash.matchAll(/@([\w-]+)(\/([\w-]+))?/g)) {
    if (m[2]) continue;
    const u = m[1];
    if (u === 'asyncapi') continue;
    if (!BOT_MAINTAINER_EXCLUDE.has(u)) out.add(u);
  }

  return [...out];
}
