#!/usr/bin/env node
/**
 * Maintainer activity rule engine → docs/audit/runs/<id>/{input,output}
 * Usage:
 *   GITHUB_TOKEN=... node scripts/audit-rule-engine.mjs [--rules path] [--raw path] [--teams path]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import yaml from 'js-yaml';
import { Octokit } from '@octokit/rest';

const ENGINE_VERSION = '1.0.1';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const AUDIT = path.join(ROOT, 'docs', 'audit');

function parseArgs(argv) {
  const o = {
    rules: path.join(AUDIT, 'rules', 'default.yaml'),
    raw: path.join(AUDIT, 'raw-data.json'),
    teams: path.join(AUDIT, 'teams-mapping.yaml'),
    maxRepos: Infinity,
  };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--rules' && argv[i + 1]) o.rules = path.resolve(argv[++i]);
    else if (argv[i] === '--raw' && argv[i + 1]) o.raw = path.resolve(argv[++i]);
    else if (argv[i] === '--teams' && argv[i + 1]) o.teams = path.resolve(argv[++i]);
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** GitHub Search API: 30 req/min for authenticated users — pace + retry on 403. */
let lastSearchRequestAt = 0;
const SEARCH_MIN_INTERVAL_MS = 2200;

async function paceSearchApi() {
  const now = Date.now();
  const wait = Math.max(0, SEARCH_MIN_INTERVAL_MS - (now - lastSearchRequestAt));
  if (wait > 0) await sleep(wait);
  lastSearchRequestAt = Date.now();
}

function loadTeamsMapping(filePath) {
  if (!fs.existsSync(filePath)) return { teams: {} };
  const raw = fs.readFileSync(filePath, 'utf8');
  const doc = yaml.load(raw);
  return doc && typeof doc === 'object' ? doc : { teams: {} };
}

function membersForTeam(teamSlug, mapping) {
  const t = mapping.teams || {};
  const entry = t[teamSlug];
  if (entry && Array.isArray(entry.members)) return entry.members;
  return [];
}

function expandSubjects(repo, mapping, denyBots) {
  const deny = new Set(denyBots || []);
  const maintainers = new Set();
  for (const u of repo.maintainers_individuals || []) {
    if (!deny.has(u)) maintainers.add(u);
  }
  for (const team of repo.teams || []) {
    for (const m of membersForTeam(team, mapping)) {
      if (!deny.has(m)) maintainers.add(m);
    }
  }
  const triagers = new Set();
  for (const u of repo.triagers || []) {
    if (!deny.has(u)) triagers.add(u);
  }
  return {
    maintainers: [...maintainers].sort(),
    triagers: [...triagers].sort(),
  };
}

async function searchCount(octokit, q) {
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

async function searchCountOr422(octokit, q) {
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

async function evaluateRule(octokit, kind, ctx) {
  const {
    owner,
    repo,
    fullName,
    login,
    sinceDay,
    denyPrAuthors,
    denyReviewers,
  } = ctx;
  const denyPr = new Set(denyPrAuthors || []);
  const denyRv = new Set(denyReviewers || []);

  if (denyPr.has(login) || denyRv.has(login)) {
    return {
      pass: false,
      reasoning: 'Login is in bot denylist for this subject type.',
      evidence: {},
    };
  }

  switch (kind) {
    case 'commit_activity': {
      await sleep(60);
      const { data } = await octokit.repos.listCommits({
        owner,
        repo,
        author: login,
        since: sinceDay + 'T00:00:00Z',
        per_page: 1,
      });
      const ok = data.length > 0;
      return {
        pass: ok,
        reasoning: ok
          ? `Commit activity on or after ${sinceDay} (latest: ${data[0].commit.author.date}).`
          : `No commits authored by @${login} in ${repo} since ${sinceDay}.`,
        evidence: ok ? { sha: data[0].sha, date: data[0].commit.author.date } : {},
      };
    }
    case 'merged_pr_author': {
      const q = `repo:${fullName} type:pr is:merged author:${login} merged:>${sinceDay}`;
      const { total_count: n, search_error: seMerged } = await searchCountOr422(octokit, q);
      if (seMerged) {
        return {
          pass: false,
          reasoning: `${seMerged} (@${login})`,
          evidence: { search_query: q },
        };
      }
      const ok = n > 0;
      return {
        pass: ok,
        reasoning: ok
          ? `Found ${n} merged PR(s) authored by @${login} after ${sinceDay} (excluding bot policy is author-scoped).`
          : `No merged PRs by @${login} in ${fullName} after ${sinceDay}.`,
        evidence: { search_query: q, total_count: n },
      };
    }
    case 'pr_review': {
      const q = `repo:${fullName} type:pr is:merged reviewed-by:${login} merged:>${sinceDay}`;
      const { total_count: n, search_error: seRev } = await searchCountOr422(octokit, q);
      if (seRev) {
        return {
          pass: false,
          reasoning: `${seRev} (@${login})`,
          evidence: { search_query: q },
        };
      }
      const ok = n > 0;
      return {
        pass: ok,
        reasoning: ok
          ? `Found ${n} merged PR(s) with review by @${login} after ${sinceDay}.`
          : `No merged PR reviews by @${login} in ${fullName} after ${sinceDay}.`,
        evidence: { search_query: q, total_count: n },
      };
    }
    case 'issue_interaction': {
      const q = `repo:${fullName} involves:${login} updated:>${sinceDay}`;
      const { total_count: n, search_error: seIss } = await searchCountOr422(octokit, q);
      if (seIss) {
        return {
          pass: false,
          reasoning: `${seIss} (@${login})`,
          evidence: { search_query: q },
        };
      }
      const ok = n > 0;
      return {
        pass: ok,
        reasoning: ok
          ? `Found ${n} issue/PR thread(s) involving @${login} updated after ${sinceDay}.`
          : `No issues/threads involving @${login} in ${fullName} after ${sinceDay}.`,
        evidence: { search_query: q, total_count: n },
      };
    }
    case 'org_wide_activity': {
      const org = fullName.split('/')[0];
      const q = `org:${org} involves:${login} updated:>${sinceDay}`;
      const { total_count: n, search_error: seOrg } = await searchCountOr422(octokit, q);
      if (seOrg) {
        return {
          pass: false,
          reasoning: `${seOrg} (@${login})`,
          evidence: { search_query: q },
        };
      }
      const ok = n > 0;
      return {
        pass: ok,
        reasoning: ok
          ? `Org-wide: ${n} issue/PR thread(s) involving @${login} updated after ${sinceDay}.`
          : `No org-wide threads involving @${login} after ${sinceDay}.`,
        evidence: { search_query: q, total_count: n },
      };
    }
    case 'last_interaction_any': {
      const kinds = ['commit_activity', 'merged_pr_author', 'pr_review', 'issue_interaction'];
      for (const k of kinds) {
        const r = await evaluateRule(octokit, k, ctx);
        if (r.pass) {
          return {
            pass: true,
            reasoning: `last_interaction_any: satisfied by ${k}` + (r.reasoning ? ` — ${r.reasoning}` : ''),
            evidence: { via: k, evidence: r.evidence },
          };
        }
      }
      return {
        pass: false,
        reasoning: 'last_interaction_any: no commit, merged PR, review, or issue interaction in window.',
        evidence: {},
      };
    }
    default:
      return {
        pass: false,
        reasoning: `Unknown rule kind: ${kind}`,
        evidence: {},
      };
  }
}

function aggregate(ruleResults, cfg) {
  const enabled = ruleResults.filter((r) => r.enabled !== false);
  const passes = enabled.filter((r) => r.pass);
  const mode = cfg.mode || 'profile';
  if (mode === 'none') {
    return { overall_pass: null, detail: 'aggregation disabled' };
  }
  if (mode === 'k_of_n') {
    const kn = cfg.k_of_n || {};
    if (!kn.enabled) return aggregate(ruleResults, { ...cfg, mode: 'profile' });
    const k = kn.k ?? 1;
    const n = kn.n ?? enabled.length;
    const ok = passes.length >= k;
    return {
      overall_pass: ok,
      detail: `k_of_n: ${passes.length}/${n} rules (need ${k})`,
    };
  }
  const profile = cfg.profile || 'balanced';
  if (profile === 'strict') {
    const ok = enabled.length > 0 && passes.length === enabled.length;
    return {
      overall_pass: ok,
      detail: `strict: ${passes.length}/${enabled.length} rules passed`,
    };
  }
  const ok = passes.length > 0;
  return {
    overall_pass: ok,
    detail: `balanced: ${passes.length}/${enabled.length} rules passed`,
  };
}

function writeReportMarkdown(report) {
  let md = `# Audit run ${report.run_id}\n\n`;
  md += `- Generated: ${report.generated_at}\n`;
  md += `- Engine: ${report.engine_version}\n`;
  md += `- Window: ${report.window_months} months (since ${report.since_day})\n\n`;
  for (const rp of report.repos) {
    md += `## ${rp.full_name}\n\n`;
    for (const section of ['maintainers', 'triagers']) {
      md += `### ${section}\n\n`;
      for (const row of rp[section] || []) {
        md += `#### @${row.login}\n`;
        md += `- **Overall:** ${row.overall_pass === null ? 'n/a' : row.overall_pass ? 'PASS' : 'FAIL'} (${row.aggregation_detail})\n`;
        for (const rr of row.rule_results || []) {
          md += `- **${rr.id}** (${rr.kind}): ${rr.pass ? 'PASS' : 'FAIL'} — ${rr.reasoning}\n`;
        }
        md += '\n';
      }
    }
  }
  return md;
}

function writeSummaryMd(report) {
  let md = `# Summary — ${report.run_id}\n\n`;
  for (const rp of report.repos) {
    md += `## ${rp.full_name}\n`;
    const actM = (rp.maintainers || []).filter((r) => r.overall_pass === true).map((r) => r.login);
    const inactM = (rp.maintainers || []).filter((r) => r.overall_pass === false).map((r) => r.login);
    const actT = (rp.triagers || []).filter((r) => r.overall_pass === true).map((r) => r.login);
    const inactT = (rp.triagers || []).filter((r) => r.overall_pass === false).map((r) => r.login);
    md += `- **Active maintainers:** ${actM.length ? actM.map((x) => `@${x}`).join(', ') : '—'}\n`;
    md += `- **Inactive maintainers (Emeritus candidates):** ${inactM.length ? inactM.map((x) => `@${x}`).join(', ') : '—'}\n`;
    md += `- **Active triagers:** ${actT.length ? actT.map((x) => `@${x}`).join(', ') : '—'}\n`;
    md += `- **Inactive triagers:** ${inactT.length ? inactT.map((x) => `@${x}`).join(', ') : '—'}\n\n`;
  }
  return md;
}

function writeEmeritusMd(report) {
  let md = `# Emeritus candidates (inactive designated maintainers)\n\n`;
  md += `Run: \`${report.run_id}\`\n\n`;
  md += '| Repository | Username |\n|------------|----------|\n';
  for (const rp of report.repos) {
    for (const row of rp.maintainers || []) {
      if (row.overall_pass === false) {
        md += `| ${rp.full_name} | ${row.login} |\n`;
      }
    }
  }
  return md;
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
  const teamsMap = loadTeamsMapping(opts.teams);

  const windowMonths = rulesDoc.window_months ?? 12;
  const sinceDay = sinceIso(windowMonths);
  const bots = rulesDoc.bots || {};
  const denyReviewers = bots.deny_reviewers || ['asyncapi-bot-eve'];
  const denyPrAuthors = bots.deny_pr_authors || ['asyncapi-bot'];
  const denySubject = new Set([...denyReviewers, ...denyPrAuthors]);

  const ruleDefs = (rulesDoc.rules || []).filter((r) => r.enabled !== false);
  const aggCfg = rulesDoc.aggregation || { mode: 'profile', profile: 'balanced' };

  const octokit = new Octokit({ auth: token });
  const runId = makeRunId();
  const runDir = path.join(AUDIT, 'runs', runId);
  const inputDir = path.join(runDir, 'input');
  const outputDir = path.join(runDir, 'output');
  fs.mkdirSync(inputDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  copyFile(opts.raw, path.join(inputDir, 'raw-data.json'));
  copyFile(opts.teams, path.join(inputDir, 'teams-mapping.yaml'));
  copyFile(opts.rules, path.join(inputDir, 'rules.yaml'));

  const manifest = {
    run_id: runId,
    engine_version: ENGINE_VERSION,
    started_at: new Date().toISOString(),
    rules_path: opts.rules,
    raw_path: opts.raw,
    teams_path: opts.teams,
    argv: process.argv.slice(2),
    git_sha: gitShaShort(),
    max_repos: opts.maxRepos === Infinity ? null : opts.maxRepos,
  };
  fs.writeFileSync(path.join(inputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  const report = {
    run_id: runId,
    engine_version: ENGINE_VERSION,
    generated_at: new Date().toISOString(),
    window_months: windowMonths,
    since_day: sinceDay,
    aggregation: aggCfg,
    repos: [],
  };

  for (const repo of reposList) {
    const [owner, repoName] = repo.full_name.split('/');
    const expanded = expandSubjects(repo, teamsMap, denySubject);
    const rp = {
      full_name: repo.full_name,
      html_url: repo.html_url,
      default_branch: repo.default_branch,
      pushed_at: repo.pushed_at,
      maintainers: [],
      triagers: [],
    };

    async function runForLogin(login, role) {
      const ctx = {
        owner,
        repo: repoName,
        fullName: repo.full_name,
        login,
        sinceDay,
        denyPrAuthors,
        denyReviewers,
      };
      const rule_results = [];
      for (const def of ruleDefs) {
        const kind = def.kind;
        const res = await evaluateRule(octokit, kind, ctx);
        rule_results.push({
          id: def.id,
          kind,
          enabled: def.enabled !== false,
          pass: res.pass,
          reasoning: res.reasoning,
          evidence: res.evidence,
        });
      }
      const ov = aggregate(rule_results, aggCfg);
      return {
        login,
        role,
        overall_pass: ov.overall_pass,
        aggregation_detail: ov.detail,
        rule_results,
      };
    }

    for (const login of expanded.maintainers) {
      rp.maintainers.push(await runForLogin(login, 'maintainer'));
    }
    for (const login of expanded.triagers) {
      rp.triagers.push(await runForLogin(login, 'triager'));
    }
    report.repos.push(rp);
  }

  fs.writeFileSync(path.join(outputDir, 'full-report.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(outputDir, 'full-report.md'), writeReportMarkdown(report));
  fs.writeFileSync(path.join(outputDir, 'summary.md'), writeSummaryMd(report));
  fs.writeFileSync(path.join(outputDir, 'summary.json'), JSON.stringify({
    run_id: runId,
    repos: report.repos.map((r) => ({
      full_name: r.full_name,
      active_maintainers: r.maintainers.filter((x) => x.overall_pass === true).map((x) => x.login),
      inactive_maintainers: r.maintainers.filter((x) => x.overall_pass === false).map((x) => x.login),
      active_triagers: r.triagers.filter((x) => x.overall_pass === true).map((x) => x.login),
      inactive_triagers: r.triagers.filter((x) => x.overall_pass === false).map((x) => x.login),
    })),
  }, null, 2));
  fs.writeFileSync(path.join(outputDir, 'emeritus-candidates.md'), writeEmeritusMd(report));

  console.log(`Run complete: ${runDir}`);
  console.log(`  output: ${outputDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
