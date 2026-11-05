# GitHub vs LFX “Insights”: what data exists and how to use it in the audit

This document lists **concrete data types** from **GitHub’s APIs** (the same family as the **Insights** tab) and from **LFX Insights** (Linux Foundation dashboard for the AsyncAPI project). It includes **real response shapes** sampled from AsyncAPI repos (Feb 2026) and a **channelization plan**: which signals support which S1 decisions.

---

## Part A — GitHub (repository statistics and related APIs)

The **repository Insights** UI in GitHub is largely backed by the **[Repository statistics](https://docs.github.com/en/rest/metrics/statistics)** REST API. These endpoints are **not** the same as Search or `listCommits`, but they align with **Contributors** / activity views.

### A.1 Endpoints (per repository)

| Endpoint | Returns | Typical use |
|----------|---------|-------------|
| `GET /repos/{owner}/{repo}/stats/contributors` | Array of contributors with **weekly** commit counts `c`, add/delete `a`/`d`, Unix week start `w`, lifetime `total`, and **`author`** (user object) | Per-person **commit volume** over time (Insights-style) |
| `GET /repos/{owner}/{repo}/stats/commit_activity` | Array of weeks: `total` commits, `week`, `days[7]` (Sun–Sat) | **Repo-level** commit cadence by week |
| `GET /repos/{owner}/{repo}/stats/code_frequency` | Array `[week_ts, additions, deletions]` | **Churn** by week (adds/dels) |
| `GET /repos/{owner}/{repo}/stats/participation` | `{ all: [52 ints], owner: [52 ints] }` | **Fork vs upstream** weekly commit counts (52 weeks) |

**Important:**

- Responses may be **`202 Accepted`** with an empty body while GitHub **computes** statistics. **Retry with backoff** until **`200`**.
- Contributor stats **exclude merge commits** (per GitHub docs).
- Very large histories may hit documented limits (e.g. some stats only for repos under **10k commits**).

### A.2 Example: `stats/participation` (HTTP 200 immediately)

**Request:** `GET https://api.github.com/repos/asyncapi/website/stats/participation`

**Response shape** (truncated — 52 integers per array):

```json
{
  "all": [19, 10, 7, 14, 9, 13, 8, 13, 12, 9, 9, 9, 8, 10, 15, 6, 14, 9, 15, 8, 12, 8, 13, 8, 4, 8, 9, 7, 12, 8, 3, 10, 19, 8, 8, 13, 4, 12, 9, 14, 9, 4, 9, 20, 10, 12, 14, 12, 11, 5, 34, 13],
  "owner": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
```

- **`all`:** total commits per week (all contributors) for the last **52 weeks**.
- **`owner`:** commits from the **repo owner** (here `asyncapi` org — often zeros for org-owned repos).

**Use in auditing:** repo-level **pulse** (is this repo dead?), not per-maintainer CODEOWNERS mapping.

### A.3 Example: `stats/commit_activity` (after retries; HTTP 200)

**Request:** `GET https://api.github.com/repos/asyncapi/website/stats/commit_activity`

**Response shape** (one element per week; sample weeks):

```json
[
  {
    "days": [3, 3, 4, 2, 0, 0, 0],
    "total": 12,
    "week": 1743897600
  },
  {
    "days": [1, 3, 1, 1, 0, 1, 2],
    "total": 9,
    "week": 1744502400
  }
]
```

- **`week`:** Unix timestamp for the start of the week.
- **`days`:** 7 integers — commits per **Sunday … Saturday**.
- **`total`:** commits that week.

**Use in auditing:** align **weekly** cadence with **LFX “active days”** narrative; optional **automation** for “repo has had commits in last N weeks.”

### A.4 Example: `stats/code_frequency` (after retries; HTTP 200)

**Request:** `GET https://api.github.com/repos/asyncapi/website/stats/code_frequency`

**Response shape** (array of `[week, additions, deletions]`):

```json
[
  [1550361600, 35349, -389],
  [1550966400, 211, -25],
  [1551571200, 0, 0]
]
```

**Use in auditing:** **large refactors** vs quiet periods; **consolidation** risk (spikes might mean migration work).

### A.5 Example: `stats/contributors` (after retries; HTTP 200)

**Request:** `GET https://api.github.com/repos/asyncapi/parser-js/stats/contributors`

**Response shape** (one object per contributor; **many weeks** per entry — full payload can be large):

```json
[
  {
    "total": 1,
    "weeks": [
      {
        "w": 1772928000,
        "a": 0,
        "d": 0,
        "c": 0
      }
    ],
    "author": {
      "login": "Souvikns",
      "id": 41781438,
      "node_id": "MDQ6VXNlcjQxNzgxNDM4",
      "avatar_url": "https://avatars.githubusercontent.com/u/41781438?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Souvikns",
      "html_url": "https://github.com/Souvikns",
      "type": "User",
      "site_admin": false
    }
  }
]
```

- **`author.login`:** join key to **CODEOWNERS** and **audit `full-report.json`**.
- **`weeks[].c` / `a` / `d`:** commits, additions, deletions for that week.
- **`total`:** lifetime total commits attributed to this author in this repo’s stats (GitHub’s aggregation).

**Use in auditing:** strongest **programmatic** match to **Insights → Contributors**; **sum weeks in your audit window** to compare with **policy rules** (`commit_activity` uses `listCommits`, which can differ slightly).

### A.6 Other GitHub APIs (not “Statistics” but used by the audit engine today)

| Mechanism | Data | Role in |
|-----------|------|--------|
| `repos.listCommits` with `author` + `since` | Commit list | Rule kind `commit_activity` |
| Search `issues` | PR/issue counts | `merged_pr_author`, `pr_review`, `issue_interaction`, `org_wide_activity` |

These are **already** in [`scripts/audit-rule-engine.mjs`](../../scripts/audit-rule-engine.mjs); see [`RULE_TYPES.md`](rules/RULE_TYPES.md).

---

## Part B — LFX Insights (project: AsyncAPI)

**URL:** [https://insights.linuxfoundation.org/project/asyncapi](https://insights.linuxfoundation.org/project/asyncapi)

LFX is a **web dashboard** (filters: e.g. **Past 365 days**, **All repositories**, **Include archived**). It does **not** expose the same **per-repo public REST JSON** as GitHub Statistics to arbitrary automation without **LF platform access** or **export**. Treat it as **portfolio + narrative** data.

### B.1 What the UI exposes (categories)

| Section | Widgets / metrics (names as shown in LFX) | Type of signal |
|---------|-------------------------------------------|----------------|
| **Overview** | Health score (composite); contributors / popularity / development / security summary tiles | **Single project** health narrative |
| **Contributors** | Contributors leaderboard; Organizations leaderboard; Active contributors; Active organizations; Contributor dependency; Organization dependency; Quarterly contributor retention; Geographical distribution | **Ecosystem** concentration, retention, geography |
| **Popularity** | GitHub stars, forks, search queries | **Adoption / visibility** |
| **Development** | Issues resolution; Commit activities; Pull requests; Active days; Contributions outside work hours; Merge lead time; Review time by PR size; Code review engagement; Median time to close / median time to review; Review efficiency | **Velocity + review culture** |
| **Security & Best Practices** | Controls assessment (build/release, access control, quality, legal, governance) | **Maturity / risk** |

**Note:** LFX docs describe metrics in detail: [LFX Insights documentation](https://insights.linuxfoundation.org/docs/).

### B.2 What you can “fetch” in practice

| Method | What you get |
|--------|----------------|
| **Browser** | Live charts and numbers; **export** where the product offers CSV/table (varies by widget; **LFX Data Copilot** may help per LF docs). |
| **Programmatic** | **No** standard public API documented here for all tiles; **not** interchangeable with `GITHUB_TOKEN` in this repo’s scripts. |

**Use in auditing:** **TSC slides**, **quarterly health**, **portfolio prioritization** — not **per-repo maintainer pass/fail** unless you **manually** join numbers to a repo list.

---

## Part C — Channelization: how to use each parameter in the auditing system

### C.1 Layering (recommended)

| Layer | Source | Decisions it supports |
|-------|--------|------------------------|
| **1 — Policy** | [`audit-rule-engine`](../../scripts/audit-rule-engine.mjs) + `rules/default.yaml` | **Emeritus candidates** per CODEOWNERS; **pass/fail** per person per repo |
| **2 — GitHub Statistics** | `stats/contributors`, `commit_activity`, `participation`, `code_frequency` | **Triangulate** policy vs **commit-volume**; **sustained weeks**; **repo pulse**; **churn** |
| **3 — LFX** | Dashboard + exports | **Org-wide** health, **retention**, **dependency**, **merge/issue times**; **consolidation / criticality** story |

### C.2 Parameter → use (quick reference)

| Data | Where | How to use in S1 |
|------|------|-------------------|
| `stats/contributors[].author.login` + `weeks[].c` | GitHub REST | Per-login **commit sum in window**; rank vs other contributors; **mismatch** with policy if policy fails but stats high |
| `stats/commit_activity[].total` | GitHub REST | **Repo** activity trend; **zero-week** streaks |
| `stats/participation.all` | GitHub REST | **52-week** pulse; **compare** repos for consolidation |
| `stats/code_frequency` | GitHub REST | **Large refactors**; quiet periods |
| **Search / listCommits** (existing engine) | Same token | **Merged PR**, **review**, **involves** — **policy** |
| **LFX Health score / Development** | LFX UI | **TSC** reporting; **prioritize** repos for deeper audit |
| **LFX Contributor dependency / retention** | LFX UI | **Bus factor** risk; **onboarding** arguments |
| **LFX Merge lead time / issue resolution** | LFX UI | **Process health**; not per-maintainer |

### C.3 Draft integration plan (with our pipeline)

1. **Keep** current **`audit:run`** as the **only automated policy gate** for `emeritus-candidates.md` unless TSC adopts new **rule kinds**.
2. **Add** (optional) **`audit-fetch-stats.mjs`**: for each repo in `raw-data.json`, call **Statistics** endpoints with **202 retry**, write **`docs/audit/stats-snapshot.json`** (or per-run under `runs/<id>/input/`).
3. **Add** (optional) **`audit-enrich-report.mjs`**: join `full-report.json` + `stats-snapshot.json` on `(repo, login)` → **`enriched-report.md`** (columns: policy pass, commits in window from stats, notes).
4. **LFX:** each **quarterly** audit cycle, attach **link + date range + screenshot or CSV** from LFX to `docs/audit/` or meeting notes — **manual** until LF provides an approved export path.
5. **Governance:** **Emeritus** decisions cite **Layer 1** + at least one **Layer 2 or 3** artifact (see [`data-driven_audit_alignment`](../../.cursor/plans/data-driven_audit_alignment_ee38fa72.plan.md) plan).

---

## Part D — Per-repo “real” health and excluding bot PRs / bot noise

LFX and **raw** GitHub **Statistics** endpoints are **org- or repo-wide** and typically **include** automation (bots, apps) unless the product explicitly filters them. For **S1** you often need **per-repo** answers like: “How many **human**-authored merged PRs last month?” — not “50 bot PRs + 0 humans.”

### D.1 Why default stats mislead

| Source | Issue |
|--------|--------|
| `stats/participation` / `stats/commit_activity` | **All** commits in the repo week — **includes** bot users and automated merges if they create commits. |
| `stats/contributors` | One row per **login**; includes **bots** (`author.type === "Bot"` or known bot logins). |
| LFX “PR” / “commit” tiles | Often **aggregate** across repos and may **include** bot activity — check LF docs; do not assume human-only. |

So **do not** use a single raw number as “human health” without filtering.

### D.2 Align with your existing bot policy

The rule engine already encodes bots in [`rules/default.yaml`](rules/default.yaml):

- **`bots.deny_pr_authors`** — e.g. `asyncapi-bot` (PRs **from** this user do not count as human maintenance for merged-PR rules).
- **`bots.deny_reviewers`** — e.g. `asyncapi-bot-eve` (no **review credit** for that login).

For **repo-level aggregates**, treat the **same logins** (plus any other known apps) as **excluded from human metrics**:

- **PRs:** Count only where **PR author** is not a bot and not in `deny_pr_authors`.
- **Reviews:** If you measure review volume, exclude `deny_reviewers` (eve does not inflate **authored** PR count; she affects **review** stats if you add review metrics later).

Example: “Last month 50 merged PRs **authored by `asyncapi-bot`**” ⇒ **0 human-authored merged PRs** in that month for that repo — your **human PR count** should reflect that.

### D.3 Practical ways to compute per-repo, human-centric metrics

**1) Human merged PRs in a window (recommended for “PR health”)**

Use **Search API** (same as the engine) with **author exclusions** where supported, e.g. conceptually:

- `repo:asyncapi/<repo> is:pr is:merged merged:>=DATE`  
  then **filter results** client-side to drop PRs whose **`user.login`** (author) is in `deny_pr_authors` or is a **GitHub App** bot.

Or run **one search per repo** and use **`author:login`** only for humans you care about — for a **total human count**, use **`listPullRequests`** with `state: closed` and filter merged + author not in denylist (pagination heavy but precise).

**2) Human commit volume (alternative to raw `stats/contributors`)**

- **Filter** `stats/contributors`: keep only entries where `author.type !== "Bot"` and `author.login` not in your denylist; **re-sum** `weeks[].c` inside your audit window.  
- **Caveat:** If a bot’s commits appear under a **human-looking** account, add that login to the denylist.

**3) Stricter: `repos.listCommits`**

Walk commits since `since`, drop commits where `author.login` (or committer) is denied or `Bot`. Good for **truth**; heavier on rate limits for busy repos.

### D.4 What to put in an “enriched” repo health row (idea)

For each `asyncapi/<repo>`:

| Field | Meaning |
|-------|--------|
| `human_merged_prs_in_window` | Count of merged PRs with **human** author (per denylist) |
| `bot_merged_prs_in_window` | Count of merged PRs authored by **deny_pr_authors** (e.g. asyncapi-bot) — **transparency** |
| `human_commits_in_window` | Sum of weekly `c` from **filtered** `stats/contributors` rows |
| `policy_pass_rate` | From existing `full-report` summary (maintainers passing) |

That gives **per-repo** “real” activity **and** shows when automation dominates.

### D.5 LFX / org dashboards

Use LFX for **trends and narrative**; for **repo-level human-only** numbers, **prefer** a **script** in this repo that reads the same **`bots`** block as **`rules/default.yaml`** so **policy and stats stay aligned**. If LFX later adds “exclude bot/app” filters, **reconcile** against your script before trusting one number.

---

## References

- GitHub REST: [Statistics](https://docs.github.com/en/rest/metrics/statistics)
- LFX AsyncAPI project: [insights.linuxfoundation.org/project/asyncapi](https://insights.linuxfoundation.org/project/asyncapi)
- LFX metrics docs: [insights.linuxfoundation.org/docs](https://insights.linuxfoundation.org/docs/)
- Local rule kinds: [`RULE_TYPES.md`](RULE_TYPES.md)
