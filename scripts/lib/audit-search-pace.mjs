/**
 * Shared GitHub Search API pacing and total_count helpers for audit scripts.
 */

/** GitHub Search API: ~30 req/min for authenticated users — pace + retry on 403. */
let lastSearchRequestAt = 0;
const SEARCH_MIN_INTERVAL_MS = 2200;

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function paceSearchApi() {
  const now = Date.now();
  const wait = Math.max(0, SEARCH_MIN_INTERVAL_MS - (now - lastSearchRequestAt));
  if (wait > 0) await sleep(wait);
  lastSearchRequestAt = Date.now();
}

export async function searchCount(octokit, q) {
  const maxAttempts = 10;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await paceSearchApi();
    try {
      const { data } = await octokit.rest.search.issuesAndPullRequests({ q, per_page: 1 });
      return data.total_count;
    } catch (e) {
      if (e.status === 403 && e.response?.headers) {
        const reset = parseInt(String(e.response.headers['x-ratelimit-reset'] || ''), 10);
        if (!Number.isNaN(reset)) {
          const waitMs = Math.max(0, reset * 1000 - Date.now()) + 3000;
          console.warn(
            `GitHub search rate limit; sleeping ${Math.ceil(waitMs / 1000)}s (retry ${attempt + 1}/${maxAttempts})...`,
          );
          await sleep(waitMs);
          lastSearchRequestAt = 0;
          continue;
        }
      }
      throw e;
    }
  }
  throw new Error('searchCount: rate limit retries exhausted');
}

export async function searchCountOr422(octokit, q) {
  try {
    const n = await searchCount(octokit, q);
    return { total_count: n, search_error: null };
  } catch (e) {
    if (e.status === 422) {
      return {
        total_count: 0,
        search_error:
          'GitHub search rejected this query (invalid username, ghost user, or not searchable).',
      };
    }
    throw e;
  }
}
