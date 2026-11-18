#!/usr/bin/env node
/**
 * Per-repository activity audit (issues/PRs counts, human vs bot) → docs/audit/repo-activity-runs/<id>/
 * Uses window_months and bots.deny_pr_authors from the same rules YAML as audit-rule-engine.mjs.
 * deny_reviewers does not affect these counts (no review metrics in v1).
 *
 * Usage: GITHUB_TOKEN=... node scripts/audit-repo-activity.mjs [--raw path] [--rules path] [--max-repos N]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import yaml from 'js-yaml';
import { Octokit } from '@octokit/rest';
import { searchCountOr422 } from './lib/audit-search-pace.mjs';

const REPO_ACTIVITY_VERSION = '1.0.0';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const AUDIT = path.join(ROOT, 'docs', 'audit');
const RUNS_ROOT = path.join(AUDIT, 'repo-activity-runs');

function parseArgs(argv) {
  const o = {
    rules: path.join(AUDIT, 'rules', 'default.yaml'),
    raw: path.join(AUDIT, 'raw-data.json'),
    maxRepos: Infinity,
  };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--rules' && argv[i + 1]) o.rules = path.resolve(argv[++i]);
    else if (argv[i] === '--raw' && argv[i + 1]) o.raw = path.resolve(argv[++i]);
    else if (argv[i] === '--max-repos' && argv[i + 1]) o.maxRepos = parseInt(argv[++i], 10) || 1;
  }
  return o;
}

function makeRunId() {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function sinceIso(months) {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString().split('T')[0];
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function gitShaShort() {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

/** Space-separated -author:login for Search (exclude bot PR/issue authors). */
function authorNegations(logins) {
  const list = Array.isArray(logins) ? logins : [];
  return list.map((l) => `-author:${l}`).join(' ');
}

async function metricCount(octokit, q) {
  const { total_count, search_error } = await searchCountOr422(octokit, q);
  return { count: search_error ? null : total_count, search_error };
}

async function collectRepoMetrics(octokit, fullName, sinceDay, denyPrAuthors) {
  const repoScope = `repo:${fullName}`;
  const neg = authorNegations(denyPrAuthors);
  const m = {};
  const errors = {};

  const add = async (name, q) => {
    const r = await metricCount(octokit, q);
    m[name] = r.count;
    if (r.search_error) errors[name] = r.search_error;
  };

  const qHumanIssues = neg
    ? `${repoScope} type:issue created:>=${sinceDay} ${neg}`
    : `${repoScope} type:issue created:>=${sinceDay}`;
  const qHumanPrsOpen = neg
    ? `${repoScope} type:pr created:>=${sinceDay} ${neg}`
    : `${repoScope} type:pr created:>=${sinceDay}`;
  const qHumanPrsMerged = neg
    ? `${repoScope} type:pr is:merged merged:>=${sinceDay} ${neg}`
    : `${repoScope} type:pr is:merged merged:>=${sinceDay}`;

  await add('issues_opened_total', `${repoScope} type:issue created:>=${sinceDay}`);
  await add('issues_opened_human', qHumanIssues);

  await add('prs_opened_total', `${repoScope} type:pr created:>=${sinceDay}`);
  await add('prs_opened_human', qHumanPrsOpen);

  await add('prs_merged_total', `${repoScope} type:pr is:merged merged:>=${sinceDay}`);
  await add('prs_merged_human', qHumanPrsMerged);

  m.prs_merged_by_bot_author = {};
  const botAuthorErrors = {};
  for (const bot of denyPrAuthors) {
    const r = await metricCount(
      octokit,
      `${repoScope} type:pr is:merged merged:>=${sinceDay} author:${bot}`,
    );
    m.prs_merged_by_bot_author[bot] = r.count;
    if (r.search_error) botAuthorErrors[bot] = r.search_error;
  }
  if (Object.keys(botAuthorErrors).length) errors.prs_merged_by_bot_author = botAuthorErrors;

  await add('issues_closed', `${repoScope} type:issue is:closed closed:>=${sinceDay}`);
  await add(
    'prs_closed_not_merged',
    `${repoScope} type:pr is:closed is:unmerged closed:>=${sinceDay}`,
  );

  if (Object.keys(errors).length) m._errors = errors;
  return m;
}

function writeSummaryMd(report) {
  const rows = [...report.repos].sort((a, b) => {
    const ah = a.metrics.prs_merged_human ?? 999999;
    const bh = b.metrics.prs_merged_human ?? 999999;
    if (ah !== bh) return ah - bh;
    return a.full_name.localeCompare(b.full_name);
  });

  let md = `# Repository activity summary — ${report.run_id}\n\n`;
  md += `- Generated: ${report.generated_at}\n`;
  md += `- Window: ${report.window_months} months (since **${report.window.since_day}**)\n`;
  md += `- Human = excludes authors: ${report.bots.deny_pr_authors.join(', ') || '(none)'}\n`;
  md += `- \`deny_reviewers\` is **not** applied to these counts.\n\n`;

  md += '| Repository | Issues O (total/human) | PRs O (t/h) | PRs merged (t/h) | Issues closed | PRs closed unmerged |\n';
  md += '|------------|------------------------|-------------|------------------|---------------|---------------------|\n';

  for (const r of rows) {
    const x = r.metrics;
    const iot = x.issues_opened_total ?? '—';
    const ioh = x.issues_opened_human ?? '—';
    const pot = x.prs_opened_total ?? '—';
    const poh = x.prs_opened_human ?? '—';
    const pmt = x.prs_merged_total ?? '—';
    const pmh = x.prs_merged_human ?? '—';
    const ic = x.issues_closed ?? '—';
    const pc = x.prs_closed_not_merged ?? '—';
    md += `| ${r.full_name} | ${iot} / ${ioh} | ${pot} / ${poh} | ${pmt} / ${pmh} | ${ic} | ${pc} |\n`;
  }

  md += '\n## Bot-authored merged PRs (per deny_pr_authors)\n\n';
  for (const r of rows) {
    const bots = r.metrics.prs_merged_by_bot_author;
    if (!bots || !Object.keys(bots).length) continue;
    const parts = Object.entries(bots)
      .map(([k, v]) => `${k}: ${v ?? '—'}`)
      .join(', ');
    md += `- **${r.full_name}:** ${parts}\n`;
  }

  return md;
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('Missing GITHUB_TOKEN');
    process.exit(1);
  }

  const opts = parseArgs(process.argv);
  const rawData = JSON.parse(fs.readFileSync(opts.raw, 'utf8'));
  const reposList = (rawData.repos || []).slice(0, opts.maxRepos);
  const rulesDoc = yaml.load(fs.readFileSync(opts.rules, 'utf8'));

  const windowMonths = rulesDoc.window_months ?? 12;
  const sinceDay = sinceIso(windowMonths);
  const bots = rulesDoc.bots || {};
  const denyPrAuthors = bots.deny_pr_authors || ['asyncapi-bot'];
  const denyReviewers = bots.deny_reviewers || ['asyncapi-bot-eve'];

  const octokit = new Octokit({ auth: token });
  const runId = makeRunId();
  const runDir = path.join(RUNS_ROOT, runId);
  const inputDir = path.join(runDir, 'input');
  const outputDir = path.join(runDir, 'output');
  fs.mkdirSync(inputDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  copyFile(opts.raw, path.join(inputDir, 'raw-data.json'));
  copyFile(opts.rules, path.join(inputDir, 'rules.yaml'));

  const generatedAt = new Date().toISOString();
  const manifest = {
    audit_kind: 'repo_activity',
    repo_activity_version: REPO_ACTIVITY_VERSION,
    run_id: runId,
    started_at: generatedAt,
    rules_path: opts.rules,
    raw_path: opts.raw,
    argv: process.argv.slice(2),
    git_sha: gitShaShort(),
    max_repos: opts.maxRepos === Infinity ? null : opts.maxRepos,
    window_months: windowMonths,
    since_day: sinceDay,
    bots: {
      deny_pr_authors: denyPrAuthors,
      deny_reviewers: denyReviewers,
      note: 'deny_reviewers does not affect repo-activity v1 counts',
    },
  };
  fs.writeFileSync(path.join(inputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  const report = {
    repo_activity_version: REPO_ACTIVITY_VERSION,
    run_id: runId,
    generated_at: generatedAt,
    window_months: windowMonths,
    window: {
      since_day: sinceDay,
      until: generatedAt,
    },
    bots: {
      deny_pr_authors: denyPrAuthors,
      deny_reviewers: denyReviewers,
    },
    repos: [],
  };

  for (const repo of reposList) {
    const metrics = await collectRepoMetrics(octokit, repo.full_name, sinceDay, denyPrAuthors);
    report.repos.push({
      full_name: repo.full_name,
      html_url: repo.html_url,
      default_branch: repo.default_branch,
      pushed_at: repo.pushed_at,
      metrics,
    });
    console.log(`OK ${repo.full_name}`);
  }

  const rawOut = path.join(outputDir, 'repo-activity-raw.json');
  fs.writeFileSync(rawOut, JSON.stringify(report, null, 2));

  const summaryPayload = {
    run_id: runId,
    generated_at: generatedAt,
    since_day: sinceDay,
    window_months: windowMonths,
    repos: report.repos.map((r) => ({
      full_name: r.full_name,
      metrics: r.metrics,
    })),
  };
  fs.writeFileSync(path.join(outputDir, 'repo-activity-summary.json'), JSON.stringify(summaryPayload, null, 2));
  fs.writeFileSync(path.join(outputDir, 'repo-activity-summary.md'), writeSummaryMd(report));

  console.log(`Repo activity run complete: ${runDir}`);
  console.log(`  output: ${outputDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
