# Following Conventional Commits

When you contribute to a project, you're not just adding code or docs — you're also adding context. Your changes become part of the project's history, and your commit messages explain why those changes were made.

In this guide, we'll explore how to write effective commit messages that follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard. This standard helps us create clear, consistent commit messages that are easy to understand and navigate.

## Overview

Conventional Commits is a specification for writing commit messages that are easy to read and understand. It provides a set of guidelines for structuring commit messages, including the use of commit types and a consistent format.

A well-written commit message explains what you did, why you did it, and how it impacts the project. This clarity helps *everyone*, whether you're reviewing a pull request (PR) or digging into the history later on.

### Understand the purpose of a commit

A commit message is like a *mini-story* that explains the change you're making. It should be clear, concise, and informative.

When you write a commit message, you should think about *what* you changed and *why* that change was necessary.

Since this is a message that others will read, it's important to provide enough context to understand the change. Therefore, you should avoid vague messages like "fixed bug." Instead, try to be specific.

For example:

> **Bad:** `fixed bug`  

> **Good:** `fix: resolve timeout issue on login by renewing session tokens`

The *good* example tells you exactly **what** was fixed and **why** that fix was important.

### Choose the right commit type

We use a set of commit types to quickly communicate the nature of a change. These types help us understand the impact of a commit at a glance.

The following are the most common commit types we use:

- **feat:** Choose `feat` for new features. If your change adds functionality or improves our project in some way, use this type.
- **fix:** This type is for bug fixes. If your change corrects an issue or resolves a problem, you should use the `fix` type.
- **docs:** `docs` is for documentation changes. If you update a README, add comments, or make other documentation changes, use this type.
- **style:** The `style` type is for changes that don't affect the code's meaning. If you update whitespace, formatting, or other non-functional elements, use this type.
- **refactor:** Use the `refactor` type for code changes that neither fix a bug nor add a feature. If you reorganize code, rename variables, or make other changes that don't affect the code's behavior, use this type.
- **test:** If your change adds or modifies tests, use the `test` type.
- **chore:** The `chore` type is for changes that don't affect the codebase. If you update build scripts, make tooling changes, or perform other maintenance tasks, use this type.

These commit types are so important to us that we use them as a prefix in our PR titles. That means that every PR title should start with one of these commit types.

A PR title that doesn't start with one of these commit types will be rejected by our [Linting bot](https://github.com/asyncapi/community/blob/master/.github/workflows/lint-pr-title.yml) and will prevent the PR from being merged.

Therefore, you can use the following examples to guide you:

| Bad | Good |
| --- | --- |
| `Add user avatar upload feature` | `feat: add user avatar upload feature` |
| `Fix login issue` | `fix: resolve timeout issue on login by renewing session tokens` |
| `Update README` | `docs:  add installation instructions to README` |
| `Update formatting` | `style: update indentation in main.js` |

If you're not sure which type to use, ask yourself what the main *purpose* of your change is. That should help you pick the right type.

### Craft a clear, descriptive commit message

A commit message is a chance to explain your change in more detail. Usually, it could be just a few sentences, but it's your opportunity to provide context and explain the reasoning behind your change.

When writing your commit message, remember to:

- Use the imperative mood (e.g., "add," "fix," "update").
- Keep it simple and clear.
- Avoid unnecessary details — focus on the impact!

**Examples:**

> `feat: add user avatar upload feature to improve user experience on profile pages`

> `docs: reorganize README for better readability`

> `chore: update build scripts to improve performance`

### Use the commit body for additional context

Most times, a one-liner is all you need. But when you need to provide more context, use the commit body to explain the reasoning behind the change, how it was implemented, or any nuances that might help others understand the decision.

To create this, add a blank line after your commit message and then write your additional context.

**Example:**

> `feat: add user avatar upload feature to improve user experience on profile pages` <br> <br> This change adds a new feature that allows users to upload an avatar image to their profile. The feature includes a new form field, validation checks, and a new API endpoint to handle the image upload. This will help users personalize their profiles and make the platform more engaging.

### Keep messages brief but informative

A good commit message is like a headline — it should be short and to the point, but it should also provide enough information to understand the change.

When you write your commit message, aim for a balance between brevity and clarity. If you find yourself writing a long message, consider whether you can break it up into smaller commits or use the commit body to provide more context.

### Check for consistency and completeness

Before you submit your commit, take a moment to review your message. Ask yourself:

- Does my message stand alone and make sense?
- Have I included enough context to explain the change?

Standing alone means that someone who reads your commit message should be able to understand what you did and why you did it without needing to look at other commits or PRs.

### Use English and avoid jargon

The goal of a commit message is to communicate your changes clearly and effectively. To achieve this, we advise that you stick to plain English.

This keeps your commit messages accessible to everyone, even those who might not be familiar with all the technical terms.

## Final Thoughts

Writing effective commit messages might seem like a small detail, but it makes a huge difference in how we work together and understand our project's history.

A clear, well-crafted commit message is like a signpost that guides us through the project's evolution. It helps us understand the context of your change, why you made it, and how it fits into the bigger picture.

For more information on Conventional Commits, please refer to the [official website](https://www.conventionalcommits.org/en/v1.0.0/). If you have any questions or need help, feel free to reach out to any maintainer or fellow contributor.