# Audit pipeline: how to run it

This guide is for **operators** who need to run the AsyncAPI org maintainer-activity audit from the terminal. You do not need to know how the scripts are implemented.

**Repository root:** run all commands from the repo root (`community/`), after `npm install`.

---

## What this tool does

1. **Fetch** lists every non-archived `asyncapi/*` repository and downloads each repo’s `CODEOWNERS` (from common paths). It writes a JSON snapshot: **`docs/audit/raw-data.json`** (unless you override `--out`).
2. **Run** reads that snapshot plus your **rules** and **team mapping**, calls the GitHub API to evaluate **activity rules** per maintainer and triager (per repo), and writes a **new folder** under **`docs/audit/runs/<run-id>/`** with frozen inputs and reports.

There is **no on-disk activity cache**: every `audit:run` recomputes activity from GitHub for the configured time window. If you change rules or `window_months`, run the engine again.

---

## Prerequisites

| Requirement | Notes |
|-------------|--------|
| **Node.js** | Use a version compatible with the project (see CI or `package.json`). |
| **Dependencies** | `npm install` once at repo root. |
| **`GITHUB_TOKEN`** | Required for both steps. Export in the shell: `export GITHUB_TOKEN=ghp_...` |
| **Token scopes** | At minimum **`public_repo`** so the API can read public org repos and use search. Add **`read:org`** if you later extend workflows to sync org team membership via API. |

Never commit the token.

---

## Pipeline overview

```mermaid
flowchart LR
  fetch["npm run audit:fetch"]
  raw["raw-data.json"]
  teams["teams-mapping.yaml"]
  rules["rules YAML"]
  run["npm run audit:run"]
  out["runs/run-id/input and output"]
  fetch --> raw
  raw --> run
  teams --> run
  rules --> run
  run --> out
```

---

## End-to-end steps (default path)

1. **Set the token**

   ```bash
   export GITHUB_TOKEN=ghp_...
   ```

2. **Fetch raw data** (repo list + parsed CODEOWNERS)

   ```bash
   npm run audit:fetch
   ```

   Writes **`docs/audit/raw-data.json`**.

3. **Edit** `docs/audit/teams-mapping.yaml` so `@asyncapi/...` teams referenced in CODEOWNERS map to **human** GitHub usernames (required wherever CODEOWNERS names a team instead of individuals).

4. **Run the rule engine**

   ```bash
   npm run audit:run
   ```

   Creates **`docs/audit/runs/<run-id>/`** with `input/` and `output/`.

---

## npm scripts

| Script | Command |
|--------|---------|
| `npm run audit:fetch` | `node scripts/audit-fetch-raw.mjs` |
| `npm run audit:run` | `node scripts/audit-rule-engine.mjs` |

Pass engine or fetch arguments **after** `--` so npm forwards them:

```bash
npm run audit:run -- --max-repos 5 --rules docs/audit/rules/my-experiment.yaml
```

---

## Step 1: Fetch raw data (`audit-fetch-raw.mjs`)

### Environment

| Variable | Required | Purpose |
|----------|----------|---------|
| `GITHUB_TOKEN` | **Yes** | Authenticates Octokit for org repo listing and file contents. |

### Flags

| Flag | Argument | Default | Meaning |
|------|----------|---------|---------|
| `--out` | file path | `docs/audit/raw-data.json` | Where to write the JSON snapshot. |

### Example

```bash
export GITHUB_TOKEN=ghp_...
npm run audit:fetch
```

Custom output path:

```bash
node scripts/audit-fetch-raw.mjs --out /tmp/my-raw-data.json
```

Repositories in the output are **sorted by repo name**. The rule engine processes repos in the **same order** stored in `raw-data.json`.

---

## Step 2: Run the rule engine (`audit-rule-engine.mjs`)

### Environment

| Variable | Required | Purpose |
|----------|----------|---------|
| `GITHUB_TOKEN` | **Yes** | Search API, commits API, and other endpoints used to evaluate rules. |

### Flags (complete list)

| Flag | Argument | Default | Meaning |
|------|----------|---------|---------|
| `--rules` | file path | `docs/audit/rules/default.yaml` | Rules: `window_months`, `rules[]` (kinds, enabled), `bots`, `aggregation`. |
| `--raw` | file path | `docs/audit/raw-data.json` | Input snapshot from the fetch step (or your own copy). |
| `--teams` | file path | `docs/audit/teams-mapping.yaml` | Maps `@asyncapi/...` team slugs to member logins. |
| `--max-repos` | integer | no limit | Process only the **first N** repositories in `raw-data.json` order (use for quick tests). |

### Examples

**Defaults (full org, default rules):**

```bash
export GITHUB_TOKEN=ghp_...
npm run audit:run
```

**Limit repos (smoke test):**

```bash
npm run audit:run -- --max-repos 3
```

**Custom rules file** (e.g. different `window_months` or enabled rule kinds):

```bash
cp docs/audit/rules/default.yaml docs/audit/rules/my-audit.yaml
# edit my-audit.yaml (e.g. window_months: 6)
npm run audit:run -- --rules docs/audit/rules/my-audit.yaml
```

**Custom paths for inputs:**

```bash
npm run audit:run -- --raw /path/to/raw-data.json --teams /path/to/teams-mapping.yaml
```

---

## When to use what

| Goal | What to do |
|------|------------|
| **Full org audit** | `audit:fetch` then `audit:run` with **no** `--max-repos`. |
| **Quick local test** | `npm run audit:run -- --max-repos 3` (or another small N). |
| **Different time window or rules** | Copy/edit a YAML file under `docs/audit/rules/`, pass `--rules`. |
| **Latest CODEOWNERS** | Run `npm run audit:fetch` again before `audit:run` (the engine reads whatever file `--raw` points to at run time). |
| **Rule or aggregation change** | Edit the rules YAML and run `audit:run` again. No cache to clear—each run is a full API evaluation for that window. |

---

## Outputs per run

After `npm run audit:run`, a new directory appears:

**`docs/audit/runs/<run-id>/`**

| Path | Purpose |
|------|--------|
| `input/raw-data.json` | Copy of the raw snapshot used. |
| `input/teams-mapping.yaml` | Copy of teams used. |
| `input/rules.yaml` | Copy of the rules file used. |
| `input/manifest.json` | Metadata: `run_id`, `engine_version`, `started_at`, paths, `argv`, `git_sha`, `max_repos` (if any). |
| `output/full-report.json` | Machine-readable: per repo, per person, per rule, pass/fail, evidence. |
| `output/full-report.md` | Human-readable long report. |
| `output/summary.md` / `summary.json` | Short active vs inactive lists per repo. |
| `output/emeritus-candidates.md` | Table of inactive **maintainers** (review candidates). |

Global **`docs/audit/emeritus-log.md`** is for human/TSC notes after review; the engine does not overwrite it.

---

## Operational expectations

- **Search API:** Authenticated users get about **30 search requests per minute**. The engine **paces** search calls (~2.2s apart) and **retries** after `403` when GitHub reports a secondary rate limit.
- **Duration:** Full-org runs can take **on the order of 15–45+ minutes** depending on maintainer count and network. Use `--max-repos` for faster iteration.
- **422 on search:** Some handles in CODEOWNERS are not searchable (placeholders, invalid `author:` users). Those rules **fail** with an explanatory reason; the run continues.
- **Rule kinds:** See [`rules/RULE_TYPES.md`](rules/RULE_TYPES.md) for what each `kind` string means.

---

## Further reading

- **[README.md](README.md)** — Overview and global files table.
- **[rules/RULE_TYPES.md](rules/RULE_TYPES.md)** — Rule `kind` reference.
- **[CHANGELOG.md](CHANGELOG.md)** — Engine and documentation changes.
