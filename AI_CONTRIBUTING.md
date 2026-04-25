# AI Contributing

This document covers how AI-assisted contributions are handled in the AsyncAPI community. It applies to all repositories under the [asyncapi](https://github.com/asyncapi) organization.

## Why this document exists

A growing number of contributions include code or documentation generated or assisted by AI tools (GitHub Copilot, ChatGPT, Cursor, etc.). This is not a problem — we welcome contributors who use these tools thoughtfully. What matters is that the contributor understands what they're submitting and can take responsibility for it.

## What we expect

**Review before submitting.** AI-generated output can be incorrect, outdated, or miss important context. Read through everything before opening a pull request. If you don't understand a change well enough to explain it, don't submit it yet.

**Disclose AI use.** The pull request template includes a checkbox asking whether AI tools were used. Check it if they were. This helps reviewers calibrate how closely to look at certain parts of the PR.

**Own the contribution.** Submitting a PR means you're taking responsibility for the content — not the AI tool. If a reviewer asks why something was done a certain way, you should be able to answer.

**Don't copy-paste without reading.** Pasting AI output without reviewing it first often introduces subtle errors or removes important nuance. Our [Style Guide](docs/011-styleguide/aboutguide.md) and [contribution guidelines](docs/010-contribution-guidelines/contribution-flow.md) still apply.

## What reviewers should know

When reviewing a PR where AI was used:

- Pay closer attention to technical accuracy, especially for spec-related content.
- Check that code examples actually work.
- Look for generic or boilerplate phrasing that doesn't match AsyncAPI's context.

If something looks wrong or out of place, ask the contributor to clarify. Don't assume the AI got it right.

## What is not allowed

- Submitting AI-generated content without reviewing it.
- Using AI to bulk-close issues or open PRs without meaningful human input.
- Representing AI-generated work as fully original when it isn't.

## Questions

If you're unsure whether your use of AI tools is appropriate for a given contribution, ask in the [#11_contributing](https://asyncapi.com/slack-invite) Slack channel before opening a PR.
