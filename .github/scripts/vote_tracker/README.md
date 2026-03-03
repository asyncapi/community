# Vote Tracker

Automatically keeps the TSC voting overview up to date after every vote closes.
Instead of incrementally appending the latest vote, it does a **full refresh** on every run:
it fetches all GitHub issues and PRs labelled `gitvote/closed`, parses each one's "Vote closed"
comment, and rebuilds the tracking table from scratch using only the current TSC members.

Members who are no longer in TSC are automatically excluded from the table.
Members who have not voted within any span of 3 or more calendar months are moved to emeritus automatically. By default (`tracker.js` sets `lastNRounds = 2` and `index.js` calls `findInactiveMembers` without parameters), the check requires at least 2 consecutive missed votes whose close dates are 3 or more calendar months apart.

## How it runs in production

The workflow is defined in [`.github/workflows/vote-tracker.yml`](../../workflows/vote-tracker.yml).

Triggers:
- Automatically when a comment is created by `git-vote[bot]` containing `Vote closed`
- Manually via **Actions → Vote Tracker → Run workflow**

## Maintaining TSC membership dates

Every TSC member in [`MAINTAINERS.yaml`](../../../MAINTAINERS.yaml) (or
[`AMBASSADORS_MEMBERS.yaml`](../../../AMBASSADORS_MEMBERS.yaml) for ambassador-track members)
must have a `tscMemberSince` field set to the ISO date (`YYYY-MM-DD`) when they joined the TSC.

```yaml
isTscMember: true
tscMemberSince: "2025-06-02"
```

Vote rounds that closed before a member's `tscMemberSince` date are shown as
`-` ("Not a member yet") in the voting overview instead of "Not participated". Without this date
the member appears to have missed all pre-membership votes, which is misleading and can also
incorrectly trigger the inactivity check.

## Running the tests

```bash
# from the repository root
npm test
```

## Running locally with a real GitHub token

`run-local.js` lets you do a full end-to-end run against the real GitHub API so you can
verify that the markdown output looks correct before pushing any changes to CI.

```bash
# Install dependencies first (only needed once)
npm install

# Run against asyncapi/community (the default)
GITHUB_TOKEN=ghp_your_token node .github/scripts/vote_tracker/run-local.js
```

> **Note:** The local run modifies real files in your working tree.
> Review the diff with `git diff` before committing anything.
> Use `git checkout -- .` to discard changes if you were just testing.