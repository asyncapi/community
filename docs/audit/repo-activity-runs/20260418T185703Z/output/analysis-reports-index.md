# Analysis reports index

- Maintainer run: `20260329T084806Z`
- Repo activity run: `20260418T185703Z`
- Generated: 2026-04-19T04:46:09.522Z
- **Activity basis:** Issue/PR opened and merged figures in analysis reports and scoring use human-only counts (deny_pr_authors excluded). Bot-authored activity is not scored.

| File | Purpose |
|------|--------|
| `analysis-reports-index.md` | This list. |
| `at-risk-scorecard.md` | Heuristic ranked risk (human-only traffic; no bot merge scoring). |
| `at-risk-scorecard.json` | Same + human-only activity fields for tooling. |
| `emeritus-candidates-by-repo.md` | One row per repo; all emeritus candidate logins (from emeritus-candidates.md). |
| `emeritus-candidates-by-repo.json` | Grouped emeritus list per repo (if source file was found). |
| `maintainer-tier-roster.md` | Repos 0→N active maintainers; columns: names + inactive maintainers + triagers. |
| `maintainer-tier-roster.json` | Same as roster, machine-readable. |
| `active-maintainer-distribution.md` | How many repos have 0, 1, 2, … active maintainers. |
| `active-maintainer-distribution.json` | Distribution JSON (`tiers`, `by_count`). |
| `critical-repos-analysis.md` | Coverage + human-only issue/PR activity; sort for risk triage. |
| `critical-repos-analysis.json` | Flat rows (human-only traffic fields; full metrics still in merged JSON). |
| `merged-repo-activity-by-maintainer-count.md` | Human-only activity columns + maintainer counts (raw metrics in JSON). |
| `merged-repo-activity-by-maintainer-count.json` | Full merge including raw `metrics` from repo-activity run. |
| `repo-maintenance-load.md` | Human merged PRs per active maintainer. |
| `consolidation-signals.json` | Zero-active maintainer list (bot merge heuristic removed from analysis). |
