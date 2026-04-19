# Audit pipeline changelog

## 1.1.0

- **Repo-level activity audit:** `npm run audit:repo-activity` (`scripts/audit-repo-activity.mjs`). Uses `raw-data.json` and the same `window_months` / `bots.deny_pr_authors` as maintainer rules; outputs under `docs/audit/repo-activity-runs/<run-id>/` (`manifest.audit_kind: repo_activity`, `repo_activity_version: 1.0.0`).
- **Shared Search pacing:** `scripts/lib/audit-search-pace.mjs` (`paceSearchApi`, `searchCount`, `searchCountOr422`); `audit-rule-engine.mjs` imports it (behaviour unchanged).
- **Merge reports:** `npm run audit:merge-maintainer-activity` (`scripts/audit-merge-maintainer-repo-activity.mjs`) joins `runs/.../summary.json` with `repo-activity-runs/.../repo-activity-summary.json`: **at-risk scorecard**, **emeritus-candidates-by-repo** (grouped from `emeritus-candidates.md`), tier roster, active-maintainer distribution, critical-repos analysis, load, consolidation signals, and `analysis-reports-index.md`. Optional `--emeritus-candidates`. Documented in [USAGE.md](USAGE.md).

## 1.0.4

- Documentation: [`INSIGHTS_DATA_REFERENCE.md`](INSIGHTS_DATA_REFERENCE.md) Part D — per-repo human-only health, excluding `asyncapi-bot` / `asyncapi-bot-eve` policy (aligned with `rules/default.yaml`).

## 1.0.3

- Documentation: [`docs/audit/INSIGHTS_DATA_REFERENCE.md`](INSIGHTS_DATA_REFERENCE.md) — GitHub Statistics API vs LFX dashboard, sample response shapes, channelization with the audit pipeline.

## 1.0.2

- Documentation: added [`docs/audit/USAGE.md`](USAGE.md) (operator guide for commands and flags). No engine change.

## 1.0.1

- Search API: pace requests (~2.2s) and retry on `403` rate limit.
- Search API: handle `422` (unsearchable / invalid username) without aborting the run.
- Documented limits and 422 behaviour in `README.md`.

## 1.0.0

- Initial `audit:fetch` and `audit:run` scripts.
- Run layout: `runs/<id>/{input,output}`.
- Rule kinds: `commit_activity`, `merged_pr_author`, `pr_review`, `issue_interaction`, `org_wide_activity`, `last_interaction_any`.
