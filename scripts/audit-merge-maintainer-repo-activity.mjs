#!/usr/bin/env node
/**
 * Merge maintainer audit summary with repo-activity summary — analysis reports for consolidation.
 *
 * Usage:
 *   node scripts/audit-merge-maintainer-repo-activity.mjs \
 *     --maintainer-summary docs/audit/runs/RUN/output/summary.json \
 *     --repo-activity-summary docs/audit/repo-activity-runs/RUN/output/repo-activity-summary.json \
 *     [--out-dir <dir>]
 *     [--emeritus-candidates path/to/emeritus-candidates.md]  (default: output/emeritus-candidates.md next to summary.json)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');

function parseArgs(argv) {
  const o = { maintainerSummary: null, repoActivitySummary: null, outDir: null, emeritusCandidates: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--maintainer-summary' && argv[i + 1]) o.maintainerSummary = path.resolve(argv[++i]);
    else if (argv[i] === '--repo-activity-summary' && argv[i + 1]) o.repoActivitySummary = path.resolve(argv[++i]);
    else if (argv[i] === '--out-dir' && argv[i + 1]) o.outDir = path.resolve(argv[++i]);
    else if (argv[i] === '--emeritus-candidates' && argv[i + 1]) o.emeritusCandidates = path.resolve(argv[++i]);
  }
  return o;
}

/**
 * Parse maintainer-audit emeritus-candidates.md (pipe table: Repository | Username).
 * @returns {Map<string, string[]>} repo -> unique sorted logins, or null if file missing
 */
function parseEmeritusCandidatesMd(mdPath) {
  if (!fs.existsSync(mdPath)) return null;
  const text = fs.readFileSync(mdPath, 'utf8');
  const map = new Map();
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|') || /^\|\s*[-:]/.test(trimmed)) continue;
    const cells = trimmed
      .split('|')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    if (cells.length < 2) continue;
    const [repo, user] = cells;
    if (repo === 'Repository' || user === 'Username') continue;
    if (!map.has(repo)) map.set(repo, []);
    map.get(repo).push(user);
  }
  for (const [k, arr] of map.entries()) {
    map.set(k, [...new Set(arr)].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })));
  }
  return map;
}

/** Analysis treats deny-listed bot PR/issue authors as non-signal (automation / version bumps). */
const ANALYSIS_ACTIVITY_NOTE =
  'Issue/PR opened and merged figures in analysis reports and scoring use human-only counts (deny_pr_authors excluded). Bot-authored activity is not scored.';

/**
 * Heuristic at-risk score (higher = triage first). See at-risk-scorecard.md header.
 */
function computeAtRiskScore(r, emeritusCount) {
  const x = r.metrics || {};
  const am = r.active_maintainer_count;
  const parts = {};
  let score = 0;

  if (am === 0) {
    parts.no_active_maintainers = 55;
    score += 55;
  } else if (am === 1) {
    parts.single_active_maintainer = 30;
    score += 30;
  } else if (am === 2) {
    parts.two_active_maintainers = 12;
    score += 12;
  }

  const inc = r.inactive_maintainer_count || 0;
  const incPts = Math.min(16, inc * 2);
  if (incPts > 0) {
    parts.inactive_maintainer_bench = incPts;
    score += incPts;
  }

  if (r.active_triager_count === 0 && am <= 1) {
    parts.no_triagers_thin_maintainers = 8;
    score += 8;
  }

  const poh = x.prs_opened_human;
  if (typeof poh === 'number' && poh >= 40 && am <= 1) {
    parts.high_human_pr_open_volume_thin_coverage = 10;
    score += 10;
  }

  const ioh = x.issues_opened_human;
  if (typeof ioh === 'number' && ioh >= 25 && am === 0) {
    parts.issue_volume_no_active_maintainers = 10;
    score += 10;
  }

  if (emeritusCount > 0) {
    const epts = Math.min(12, emeritusCount * 2);
    parts.emeritus_candidates_named = epts;
    score += epts;
  }

  return { score, parts };
}

function sortTierRoster(a, b) {
  if (a.active_maintainer_count !== b.active_maintainer_count) {
    return a.active_maintainer_count - b.active_maintainer_count;
  }
  return a.full_name.localeCompare(b.full_name);
}

function sortCritical(a, b) {
  const ac = a.active_maintainer_count;
  const bc = b.active_maintainer_count;
  if (ac !== bc) return ac - bc;
  const am = a.metrics?.prs_merged_human ?? 999999;
  const bm = b.metrics?.prs_merged_human ?? 999999;
  if (am !== bm) return am - bm;
  return a.full_name.localeCompare(b.full_name);
}

function activeMaintainerDistribution(rows) {
  const counts = new Map();
  for (const r of rows) {
    const k = r.active_maintainer_count;
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  const tiers = [...counts.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([active_maintainer_count, repo_count]) => ({ active_maintainer_count, repo_count }));
  return {
    total_repos: rows.length,
    tiers,
    by_count: Object.fromEntries(tiers.map((t) => [String(t.active_maintainer_count), t.repo_count])),
  };
}

function joinList(arr) {
  if (!arr || !arr.length) return '—';
  return arr.join(', ');
}

function writeMaintainerTierRosterMd(rows, meta) {
  let md = `# Maintainer tier roster (by active maintainer count)\n\n`;
  md += `- Maintainer run: \`${meta.maintainer_run_id}\`\n`;
  md += `- Generated: ${meta.generated_at}\n`;
  md += `- Order: **0** active maintainers first, then **1**, **2**, … (name within tier).\n`;
  md += `- **Inactive maintainers** = flagged inactive by the maintainer audit (emeritus / coverage risk), not necessarily TSC emeritus.\n\n`;

  md +=
    '| Repository | Active maintainers | Inactive maintainers | Active triagers | Inactive triagers |\n';
  md += '|------------|-------------------|----------------------|-----------------|-------------------|\n';

  const sorted = [...rows].sort(sortTierRoster);
  for (const r of sorted) {
    md += `| ${r.full_name} | ${joinList(r.active_maintainers)} | ${joinList(r.inactive_maintainers)} | ${joinList(r.active_triagers)} | ${joinList(r.inactive_triagers)} |\n`;
  }
  return md;
}

function writeDistributionMd(dist, meta) {
  let md = `# Repo count by number of active maintainers\n\n`;
  md += `- Maintainer run: \`${meta.maintainer_run_id}\`\n`;
  md += `- Total repositories: **${dist.total_repos}**\n\n`;
  md += '| Active maintainer count | Number of repos |\n';
  md += '|------------------------|-----------------|\n';
  for (const t of dist.tiers) {
    md += `| ${t.active_maintainer_count} | ${t.repo_count} |\n`;
  }
  return md;
}

function writeCriticalReposMd(rows, meta) {
  let md = `# Critical repos — maintainer coverage + activity (12m window)\n\n`;
  md += `- Maintainer run: \`${meta.maintainer_run_id}\`\n`;
  md += `- Repo activity run: \`${meta.repo_activity_run_id}\`\n`;
  md += `- Window: since **${meta.since_day}** (${meta.window_months} months)\n`;
  md += `- Sort: **active maintainer count ↑**, then **human merged PRs ↑** (stressed / under-covered repos rise to the top).\n`;
  md += `- **Human-only traffic:** issues/PRs opened and PRs merged exclude \`deny_pr_authors\` bots (automation treated as non-signal here). Raw totals remain in \`repo-activity-*.json\` from \`audit:repo-activity\`.\n\n`;

  md +=
    '| Repository | Act M | Inact M | Act T | Inact T | Issues opened (human) | PRs opened (human) | PRs merged (human) | Issues closed | PRs closed unmerged |\n';
  md +=
    '|------------|-------|---------|-------|---------|------------------------|-------------------|-------------------|---------------|---------------------|\n';

  const sorted = [...rows].sort(sortCritical);
  for (const r of sorted) {
    const x = r.metrics || {};
    md += `| ${r.full_name} | ${r.active_maintainer_count} | ${r.inactive_maintainer_count} | ${r.active_triager_count} | ${r.inactive_triager_count} | ${x.issues_opened_human ?? '—'} | ${x.prs_opened_human ?? '—'} | ${x.prs_merged_human ?? '—'} | ${x.issues_closed ?? '—'} | ${x.prs_closed_not_merged ?? '—'} |\n`;
  }
  return md;
}

function writeMergedMd(rows, meta) {
  let md = `# Repository activity by maintainer headcount — merged report\n\n`;
  md += `- Maintainer run: \`${meta.maintainer_run_id}\`\n`;
  md += `- Repo activity run: \`${meta.repo_activity_run_id}\`\n`;
  md += `- Generated: ${meta.generated_at}\n`;
  md += `- Repo activity window: since **${meta.since_day}** (${meta.window_months} months)\n`;
  md += `- Sorted by **active maintainer count** (ascending), then **human merged PRs** (ascending).\n`;
  md += `- **Human-only** issue/PR opened and PR merged counts (bots excluded). See \`repo-activity-raw.json\` for totals including bots.\n\n`;

  md +=
    '| Repository | Active M | Inactive M | Issues opened (human) | PRs opened (human) | PRs merged (human) | Issues closed | PRs closed unmerged |\n';
  md +=
    '|------------|----------|------------|----------------------|-------------------|-------------------|---------------|---------------------|\n';

  for (const r of rows) {
    const x = r.metrics || {};
    const ic = x.issues_closed ?? '—';
    const pc = x.prs_closed_not_merged ?? '—';
    md += `| ${r.full_name} | ${r.active_maintainer_count} | ${r.inactive_maintainer_count} | ${x.issues_opened_human ?? '—'} | ${x.prs_opened_human ?? '—'} | ${x.prs_merged_human ?? '—'} | ${ic} | ${pc} |\n`;
  }

  md += '\n## Active maintainers (login list)\n\n';
  for (const r of rows) {
    const names = (r.active_maintainers || []).join(', ') || '—';
    md += `- **${r.full_name}** (${r.active_maintainer_count}): ${names}\n`;
  }

  return md;
}

function writeLoadMd(rows, meta) {
  let md = `# Human merged PRs per active maintainer (rough load)\n\n`;
  md += `- Same source runs as merged report (${meta.maintainer_run_id} + ${meta.repo_activity_run_id})\n`;
  md += `- **Load** = \`prs_merged_human / active_maintainer_count\` (only when count ≥ 1). Repos with **0** active maintainers are listed with load **—**.\n`;
  md += `- Sorted by load **descending** (higher = more human merges per named maintainer), then by repo name.\n\n`;

  const withLoad = rows
    .map((r) => {
      const n = r.active_maintainer_count;
      const pmh = r.metrics?.prs_merged_human;
      const load = n >= 1 && typeof pmh === 'number' ? pmh / n : null;
      return { ...r, _load: load };
    })
    .sort((a, b) => {
      if (a._load == null && b._load == null) return a.full_name.localeCompare(b.full_name);
      if (a._load == null) return 1;
      if (b._load == null) return -1;
      if (b._load !== a._load) return b._load - a._load;
      return a.full_name.localeCompare(b.full_name);
    });

  md += '| Repository | Active M | prs_merged_human | Load (÷ active M) |\n';
  md += '|------------|----------|------------------|---------------------|\n';
  for (const r of withLoad) {
    const loadStr = r._load == null ? '—' : r._load.toFixed(2);
    md += `| ${r.full_name} | ${r.active_maintainer_count} | ${r.metrics?.prs_merged_human ?? '—'} | ${loadStr} |\n`;
  }
  return md;
}

function writeAnalysisIndex(paths, meta) {
  let md = `# Analysis reports index\n\n`;
  md += `- Maintainer run: \`${meta.maintainer_run_id}\`\n`;
  md += `- Repo activity run: \`${meta.repo_activity_run_id}\`\n`;
  md += `- Generated: ${meta.generated_at}\n`;
  md += `- **Activity basis:** ${ANALYSIS_ACTIVITY_NOTE}\n\n`;
  md += '| File | Purpose |\n';
  md += '|------|--------|\n';
  for (const { file, purpose } of paths) {
    md += `| \`${file}\` | ${purpose} |\n`;
  }
  return md;
}

function writeEmeritusByRepoMd(map, meta, sourcePath) {
  const sourceRel = path.relative(REPO_ROOT, sourcePath) || sourcePath;
  let md = `# Emeritus candidates by repository (one row per repo)\n\n`;
  md += `- Source: \`${sourceRel}\`\n`;
  md += `- Maintainer run: \`${meta.maintainer_run_id}\`\n`;
  md += `- Generated: ${meta.generated_at}\n`;
  md += `- Second column lists all **emeritus candidates** for that repo (unique logins, sorted).\n\n`;
  md += '| Repository | Emeritus candidates |\n';
  md += '|------------|---------------------|\n';
  const repos = [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [repo, names] of repos) {
    md += `| ${repo} | ${names.join(', ')} |\n`;
  }
  return md;
}

function writeAtRiskScorecardMd(rows, meta, emeritusUsed) {
  let md = `# At-risk repository scorecard (heuristic)\n\n`;
  md += `- Maintainer run: \`${meta.maintainer_run_id}\`\n`;
  md += `- Repo activity run: \`${meta.repo_activity_run_id}\`\n`;
  md += `- Window: since **${meta.since_day}** (${meta.window_months} months)\n`;
  md += `- **Higher score → triage first.** This is a weighted signal blend, not a formal status.\n\n`;
  md += `## How the score is built\n\n`;
  md += `| Factor | Points |\n`;
  md += `|--------|--------|\n`;
  md += `| No active maintainers | +55 |\n`;
  md += `| Exactly one active maintainer | +30 |\n`;
  md += `| Exactly two active maintainers | +12 |\n`;
  md += `| Inactive maintainer count | +2 each, max +16 |\n`;
  md += `| No active triagers and ≤1 active maintainer | +8 |\n`;
  md += `| ≥40 **human** PRs opened and ≤1 active maintainer | +10 |\n`;
  md += `| ≥25 **human** issues opened and 0 active maintainers | +10 |\n`;
  if (emeritusUsed) {
    md += `| Each emeritus candidate row in \`emeritus-candidates.md\` | +2, max +12 |\n`;
  }
  md += `\n*(Bot-authored PRs/issues are excluded from traffic signals and do not add points.)*\n\n`;

  md +=
    '| Rank | Score | Repository | Act M | PRs merged (human) | Emeritus # | Contributors to score |\n';
  md +=
    '|-----:|------:|------------|------:|---------------------:|-----------:|----------------------|\n';

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const x = r.metrics || {};
    const factors = Object.entries(r.at_risk_parts || {})
      .map(([k, v]) => `${k} +${v}`)
      .join(', ');
    md += `| ${i + 1} | ${r.at_risk_score} | ${r.full_name} | ${r.active_maintainer_count} | ${x.prs_merged_human ?? '—'} | ${r.emeritus_candidate_count} | ${factors || '—'} |\n`;
  }
  return md;
}

/** Human-only activity for analysis JSON (bot totals omitted). */
function buildCriticalReposJsonRow(r) {
  const x = r.metrics || {};
  return {
    full_name: r.full_name,
    active_maintainer_count: r.active_maintainer_count,
    inactive_maintainer_count: r.inactive_maintainer_count,
    active_triager_count: r.active_triager_count,
    inactive_triager_count: r.inactive_triager_count,
    active_maintainers: r.active_maintainers,
    inactive_maintainers: r.inactive_maintainers,
    active_triagers: r.active_triagers,
    inactive_triagers: r.inactive_triagers,
    issues_opened_human: x.issues_opened_human ?? null,
    prs_opened_human: x.prs_opened_human ?? null,
    prs_merged_human: x.prs_merged_human ?? null,
    issues_closed: x.issues_closed ?? null,
    prs_closed_not_merged: x.prs_closed_not_merged ?? null,
  };
}

function main() {
  const opts = parseArgs(process.argv);
  if (!opts.maintainerSummary || !opts.repoActivitySummary) {
    console.error(
      'Usage: node scripts/audit-merge-maintainer-repo-activity.mjs \\\n' +
        '  --maintainer-summary <summary.json> \\\n' +
        '  --repo-activity-summary <repo-activity-summary.json> \\\n' +
        '  [--out-dir <dir>] \\\n' +
        '  [--emeritus-candidates <emeritus-candidates.md>]',
    );
    process.exit(1);
  }

  const outDir = opts.outDir || path.dirname(opts.repoActivitySummary);
  fs.mkdirSync(outDir, { recursive: true });

  const emeritusPath =
    opts.emeritusCandidates || path.join(path.dirname(opts.maintainerSummary), 'emeritus-candidates.md');
  const emeritusMap = parseEmeritusCandidatesMd(emeritusPath);
  if (!emeritusMap) {
    console.warn(`emeritus-candidates not found: ${emeritusPath} (emeritus-by-repo reports skipped)`);
  }

  const maintainer = JSON.parse(fs.readFileSync(opts.maintainerSummary, 'utf8'));
  const activity = JSON.parse(fs.readFileSync(opts.repoActivitySummary, 'utf8'));

  const activityByName = new Map((activity.repos || []).map((r) => [r.full_name, r.metrics]));

  const generatedAt = new Date().toISOString();
  const mergedRepos = (maintainer.repos || []).map((m) => {
    const metrics = activityByName.get(m.full_name) ?? null;
    const active = m.active_maintainers || [];
    const inactive = m.inactive_maintainers || [];
    return {
      full_name: m.full_name,
      active_maintainers: active,
      inactive_maintainers: inactive,
      active_triagers: m.active_triagers || [],
      inactive_triagers: m.inactive_triagers || [],
      active_maintainer_count: active.length,
      inactive_maintainer_count: inactive.length,
      active_triager_count: (m.active_triagers || []).length,
      inactive_triager_count: (m.inactive_triagers || []).length,
      metrics: metrics || {},
    };
  });

  const atRiskRows = mergedRepos
    .map((r) => {
      const names = emeritusMap?.get(r.full_name);
      const ec = names?.length ?? 0;
      const { score, parts } = computeAtRiskScore(r, ec);
      return {
        ...r,
        emeritus_candidate_count: ec,
        emeritus_candidates: names ?? [],
        at_risk_score: score,
        at_risk_parts: parts,
      };
    })
    .sort((a, b) => {
      if (b.at_risk_score !== a.at_risk_score) return b.at_risk_score - a.at_risk_score;
      return a.full_name.localeCompare(b.full_name);
    });

  const dist = activeMaintainerDistribution(mergedRepos);

  const forMergedSort = [...mergedRepos].sort(sortCritical);
  const tierRosterRows = [...mergedRepos].sort(sortTierRoster);

  const meta = {
    generated_at: generatedAt,
    maintainer_run_id: maintainer.run_id ?? null,
    repo_activity_run_id: activity.run_id ?? null,
    since_day: activity.since_day ?? null,
    window_months: activity.window_months ?? null,
  };

  const payload = {
    ...meta,
    analysis_activity_basis: ANALYSIS_ACTIVITY_NOTE,
    sort: {
      primary: 'active_maintainer_count_asc',
      secondary: 'prs_merged_human_asc',
      tertiary: 'full_name',
    },
    repos: forMergedSort,
  };

  const tierRosterJson = {
    ...meta,
    sort: { primary: 'active_maintainer_count_asc', secondary: 'full_name' },
    repos: tierRosterRows.map((r) => ({
      full_name: r.full_name,
      active_maintainers: r.active_maintainers,
      inactive_maintainers: r.inactive_maintainers,
      active_triagers: r.active_triagers,
      inactive_triagers: r.inactive_triagers,
      active_maintainer_count: r.active_maintainer_count,
      inactive_maintainer_count: r.inactive_maintainer_count,
      active_triager_count: r.active_triager_count,
      inactive_triager_count: r.inactive_triager_count,
    })),
  };

  const distributionJson = { ...meta, ...dist };

  const criticalJson = {
    ...meta,
    analysis_activity_basis: ANALYSIS_ACTIVITY_NOTE,
    sort: payload.sort,
    repos: forMergedSort.map(buildCriticalReposJsonRow),
  };

  const mergedJsonPath = path.join(outDir, 'merged-repo-activity-by-maintainer-count.json');
  const mergedMdPath = path.join(outDir, 'merged-repo-activity-by-maintainer-count.md');
  const loadMdPath = path.join(outDir, 'repo-maintenance-load.md');
  const signalsPath = path.join(outDir, 'consolidation-signals.json');
  const tierRosterMdPath = path.join(outDir, 'maintainer-tier-roster.md');
  const tierRosterJsonPath = path.join(outDir, 'maintainer-tier-roster.json');
  const distributionMdPath = path.join(outDir, 'active-maintainer-distribution.md');
  const distributionJsonPath = path.join(outDir, 'active-maintainer-distribution.json');
  const criticalMdPath = path.join(outDir, 'critical-repos-analysis.md');
  const criticalJsonPath = path.join(outDir, 'critical-repos-analysis.json');
  const indexMdPath = path.join(outDir, 'analysis-reports-index.md');
  const atRiskMdPath = path.join(outDir, 'at-risk-scorecard.md');
  const atRiskJsonPath = path.join(outDir, 'at-risk-scorecard.json');
  const emeritusByRepoMdPath = path.join(outDir, 'emeritus-candidates-by-repo.md');
  const emeritusByRepoJsonPath = path.join(outDir, 'emeritus-candidates-by-repo.json');

  fs.writeFileSync(mergedJsonPath, JSON.stringify(payload, null, 2));
  fs.writeFileSync(mergedMdPath, writeMergedMd(forMergedSort, meta));
  fs.writeFileSync(loadMdPath, writeLoadMd(mergedRepos, meta));
  fs.writeFileSync(tierRosterMdPath, writeMaintainerTierRosterMd(mergedRepos, meta));
  fs.writeFileSync(tierRosterJsonPath, JSON.stringify(tierRosterJson, null, 2));
  fs.writeFileSync(distributionMdPath, writeDistributionMd(dist, meta));
  fs.writeFileSync(distributionJsonPath, JSON.stringify(distributionJson, null, 2));
  fs.writeFileSync(criticalMdPath, writeCriticalReposMd(mergedRepos, meta));
  fs.writeFileSync(criticalJsonPath, JSON.stringify(criticalJson, null, 2));

  fs.writeFileSync(
    atRiskMdPath,
    writeAtRiskScorecardMd(atRiskRows, meta, Boolean(emeritusMap)),
  );
  fs.writeFileSync(
    atRiskJsonPath,
    JSON.stringify(
      {
        ...meta,
        emeritus_candidates_source: emeritusMap ? path.relative(REPO_ROOT, emeritusPath) || emeritusPath : null,
        analysis_activity_basis: ANALYSIS_ACTIVITY_NOTE,
        scoring:
          'Higher at_risk_score suggests earlier human review. See at-risk-scorecard.md for factor weights.',
        repos: atRiskRows.map((r) => ({
          ...buildCriticalReposJsonRow(r),
          at_risk_score: r.at_risk_score,
          at_risk_parts: r.at_risk_parts,
          emeritus_candidate_count: r.emeritus_candidate_count,
          emeritus_candidates: r.emeritus_candidates,
        })),
      },
      null,
      2,
    ),
  );

  if (emeritusMap) {
    const emeritusPayload = {
      ...meta,
      source_file: path.relative(REPO_ROOT, emeritusPath) || emeritusPath,
      repos: [...emeritusMap.entries()]
        .map(([full_name, emeritus_candidates]) => ({
          full_name,
          emeritus_candidates,
          emeritus_candidate_count: emeritus_candidates.length,
        }))
        .sort((a, b) => a.full_name.localeCompare(b.full_name)),
    };
    fs.writeFileSync(emeritusByRepoMdPath, writeEmeritusByRepoMd(emeritusMap, meta, emeritusPath));
    fs.writeFileSync(emeritusByRepoJsonPath, JSON.stringify(emeritusPayload, null, 2));
  }

  const zeroActive = mergedRepos.filter((r) => r.active_maintainer_count === 0).map((r) => r.full_name);

  fs.writeFileSync(
    signalsPath,
    JSON.stringify(
      {
        generated_at: generatedAt,
        description:
          'Heuristic flags: repos with no active maintainers. Bot-authored merges are treated as non-signal in merge analysis; repos_high_bot_merge_share is no longer populated (use raw repo-activity JSON if you need bot totals).',
        repos_zero_active_maintainers: zeroActive,
        repos_high_bot_merge_share: [],
      },
      null,
      2,
    ),
  );

  const indexEntries = [
    { file: 'analysis-reports-index.md', purpose: 'This list.' },
    { file: 'at-risk-scorecard.md', purpose: 'Heuristic ranked risk (human-only traffic; no bot merge scoring).' },
    { file: 'at-risk-scorecard.json', purpose: 'Same + human-only activity fields for tooling.' },
    {
      file: 'emeritus-candidates-by-repo.md',
      purpose: 'One row per repo; all emeritus candidate logins (from emeritus-candidates.md).',
    },
    {
      file: 'emeritus-candidates-by-repo.json',
      purpose: 'Grouped emeritus list per repo (if source file was found).',
    },
    { file: 'maintainer-tier-roster.md', purpose: 'Repos 0→N active maintainers; columns: names + inactive maintainers + triagers.' },
    { file: 'maintainer-tier-roster.json', purpose: 'Same as roster, machine-readable.' },
    { file: 'active-maintainer-distribution.md', purpose: 'How many repos have 0, 1, 2, … active maintainers.' },
    { file: 'active-maintainer-distribution.json', purpose: 'Distribution JSON (`tiers`, `by_count`).' },
    { file: 'critical-repos-analysis.md', purpose: 'Coverage + human-only issue/PR activity; sort for risk triage.' },
    { file: 'critical-repos-analysis.json', purpose: 'Flat rows (human-only traffic fields; full metrics still in merged JSON).' },
    { file: 'merged-repo-activity-by-maintainer-count.md', purpose: 'Human-only activity columns + maintainer counts (raw metrics in JSON).' },
    { file: 'merged-repo-activity-by-maintainer-count.json', purpose: 'Full merge including raw `metrics` from repo-activity run.' },
    { file: 'repo-maintenance-load.md', purpose: 'Human merged PRs per active maintainer.' },
    { file: 'consolidation-signals.json', purpose: 'Zero-active maintainer list (bot merge heuristic removed from analysis).' },
  ];
  fs.writeFileSync(indexMdPath, writeAnalysisIndex(indexEntries, meta));

  const written = [
    indexMdPath,
    atRiskMdPath,
    atRiskJsonPath,
    ...(emeritusMap ? [emeritusByRepoMdPath, emeritusByRepoJsonPath] : []),
    tierRosterMdPath,
    tierRosterJsonPath,
    distributionMdPath,
    distributionJsonPath,
    criticalMdPath,
    criticalJsonPath,
    mergedJsonPath,
    mergedMdPath,
    loadMdPath,
    signalsPath,
  ];
  console.log('Wrote:\n' + written.map((p) => `  ${p}`).join('\n'));
}

main();
