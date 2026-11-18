# Audit pipeline — constitution (Spec Kit)

## Purpose

Provide a **reproducible**, **configurable** maintainer-activity audit for all non-archived `asyncapi/*` repositories, without mutating GitHub settings from this tool.

## Principles

1. **CODEOWNERS** expresses designation; **rules + GitHub API** express activity.
2. **Bots** `asyncapi-bot` and `asyncapi-bot-eve` are excluded from credit where documented.
3. Every engine run **snapshots** inputs under `docs/audit/runs/<id>/input/`.
4. **Emeritus** is a human decision; the engine only lists **candidates**.

## References

- `docs/audit/README.md`
- `docs/audit/rules/RULE_TYPES.md`
- `.cursor/rules/audit-pipeline.mdc`
