#!/usr/bin/env node
/**
 * Fetch non-archived asyncapi repos and CODEOWNERS → docs/audit/raw-data.json
 * Usage: GITHUB_TOKEN=ghp_... node scripts/audit-fetch-raw.mjs [--out path]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Octokit } from '@octokit/rest';
import { parseCodeowners } from './lib/parse-codeowners.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DEFAULT_OUT = path.join(ROOT, 'docs', 'audit', 'raw-data.json');

const CODEOWNERS_PATHS = ['CODEOWNERS', '.github/CODEOWNERS', 'docs/CODEOWNERS'];

function parseArgs() {
  const args = process.argv.slice(2);
  let out = DEFAULT_OUT;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--out' && args[i + 1]) {
      out = path.resolve(args[++i]);
    }
  }
  return { out };
}

async function getCodeownersFile(octokit, owner, repo, defaultBranch) {
  for (const p of CODEOWNERS_PATHS) {
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: p,
        ref: defaultBranch,
      });
      if (data.type === 'file' && data.content) {
        const raw = Buffer.from(data.content, 'base64').toString('utf8');
        return { path: p, raw };
      }
    } catch {
      /* try next */
    }
  }
  return { path: null, raw: '' };
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('Missing GITHUB_TOKEN in environment.');
    process.exit(1);
  }

  const { out } = parseArgs();
  const octokit = new Octokit({ auth: token });

  const org = 'asyncapi';
  const repos = [];

  const iterator = octokit.paginate.iterator(octokit.repos.listForOrg, {
    org,
    type: 'all',
    per_page: 100,
  });

  for await (const response of iterator) {
    for (const r of response.data) {
      if (r.archived) continue;

      const owner = org;
      const repo = r.name;
      const defaultBranch = r.default_branch || 'master';

      const { path: codeownersPath, raw } = await getCodeownersFile(
        octokit,
        owner,
        repo,
        defaultBranch,
      );

      const parsed = parseCodeowners(raw);

      repos.push({
        name: r.name,
        full_name: r.full_name,
        default_branch: defaultBranch,
        html_url: r.html_url,
        pushed_at: r.pushed_at,
        open_issues_count: r.open_issues_count,
        codeowners_path: codeownersPath,
        ...parsed,
      });
    }
  }

  repos.sort((a, b) => a.name.localeCompare(b.name));

  const payload = {
    schema_version: 1,
    fetched_at: new Date().toISOString(),
    org,
    repo_count: repos.length,
    repos,
  };

  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${repos.length} repos to ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
