# AsyncAPI org repository audit (maintainer activity)

This directory holds **global** inputs for the audit pipeline and **per-run** results under `runs/`.

**Full command reference (flags, use cases, outputs):** [USAGE.md](USAGE.md).

## Quick start

1. **Token:** create a GitHub PAT with `public_repo` (and `read:org` if you later sync team members via API).
2. **Fetch raw data** (all non-archived `asyncapi/*` repos + `CODEOWNERS`):

   ```bash
   export GITHUB_TOKEN=ghp_...
   npm run audit:fetch
   ```

   Writes `raw-data.json`.

3. **Edit** `teams-mapping.yaml` so `@asyncapi/...` teams from `raw-data.json` map to member logins (required for team-expanded maintainers).

4. **Run the rule engine:**

   ```bash
   npm run audit:run
   ```

   Optional: `npm run audit:run -- --max-repos 5` to limit repos (faster, for testing).

Outputs go to `docs/audit/runs/<run-id>/`:

- `input/` — **snapshot** of `raw-data.json`, `teams-mapping.yaml`, and the rules file used (reproducible after you edit globals).
- `output/` — `full-report.json`, `full-report.md`, `summary.md`, `summary.json`, `emeritus-candidates.md`.

## Global files

| File | Purpose |
|------|---------|
| `raw-data.json` | Repo list + parsed `CODEOWNERS` (maintainers, teams, triagers). Regenerate with `audit:fetch`. |
| `teams-mapping.yaml` | `teams["asyncapi/slug"].members: []` for humans in org teams. |
| `rules/default.yaml` | Rule kinds, `window_months`, bot deny lists, aggregation (`profile` / `k_of_n` / `none`). |
| `rules/RULE_TYPES.md` | Documentation for each `kind` string. |
| `rules/schema.json` | JSON Schema (informal) for the rules file. |
| `emeritus-log.md` | **Human / TSC** log after reviewing `emeritus-candidates.md` (not overwritten by the engine). |

## Spec Kit

Product specs and tasks for this pipeline live under [`../../spec/audit`](../../spec/audit). Upstream toolkit: [github/spec-kit](https://github.com/github/spec-kit).

## Comparing runs

Diff two folders:

```bash
diff -u docs/audit/runs/RUN_A/output/summary.md docs/audit/runs/RUN_B/output/summary.md
```

## Rate limits and edge cases

- **Search API:** Authenticated users get about **30 search requests per minute**. The engine **paces** search calls (~2.2s apart) and **retries** after `403` when GitHub reports a secondary limit reset.
- **Full-org runs** can take **15–45+ minutes** depending on maintainer count and network. Use `--max-repos` for quick iteration.
- **422 on search:** Some handles in `CODEOWNERS` are not searchable (placeholders like `global-owner1`, renamed users, or usernames GitHub rejects in `author:`). Those rules **fail** with an explanatory reason instead of crashing the run.
- **Hyphenated usernames** (e.g. `devilkiller-ag`) may return 422 from Search in some cases; fix the handle in `CODEOWNERS` or rely on `commit_activity` when search fails.
