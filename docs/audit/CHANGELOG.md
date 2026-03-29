# Audit pipeline changelog

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
