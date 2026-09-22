# Rule kinds (`kind` field)

Each rule in `rules/default.yaml` references a `kind`. Implementations live in `scripts/audit-rule-engine.mjs`.

| Kind | Description |
|------|-------------|
| `commit_activity` | At least one commit authored by the subject on the repo default history since `window_months` (GitHub `repos.listCommits`). |
| `merged_pr_author` | At least one **merged** PR authored by the subject (`search`: `type:pr is:merged author:LOGIN merged:>DATE`). |
| `pr_review` | At least one merged PR with a review by the subject (`reviewed-by:LOGIN`). Bot PR authors are still searchable; refine in a future version. |
| `issue_interaction` | Issues/PR threads involving the subject (`involves:LOGIN`). |
| `org_wide_activity` | Any org thread involving the subject (`org:asyncapi involves:LOGIN`). |
| `last_interaction_any` | Pass if **any** of: commit, merged PR, PR review, issue interaction passes (OR). |

## Bots

- `bots.deny_pr_authors`: excluded from `merged_pr_author` subject list; PRs **from** these users do not count as human maintenance elsewhere.
- `bots.deny_reviewers`: excluded from review credit; typically `asyncapi-bot-eve`.

## Aggregation

See `rules/default.yaml`: `aggregation.mode` is `profile` | `k_of_n` | `none`.

- **profile `strict`:** all enabled rules must pass.
- **profile `balanced`:** at least one enabled rule passes.
- **k_of_n:** at least `k` rules pass (set `aggregation.k_of_n.enabled: true` and `aggregation.mode: k_of_n`).

