---
title: 'Overview of Local vs Global Workflows'
weight: 30
---

`We automate pretty much everything we possibly can.` But that doesn’t mean we spin up an automation for every little thing that comes our way. Why? Because we know automation only works when it’s solving the right problem, not when it’s just adding more noise.

That’s why we categorised our workflows into two main types: **Local Workflows** and **Global Workflows**.

### Local Workflows

Local workflows are types of workflow automations that are repository-specific. This means they live inside a single repository and only handle tasks related to that repo. They don’t care what’s going on elsewhere, they just focus on doing their job in one place.

For example, you might have a local workflow that runs tests on every pull request. So whenever someone opens a PR, the workflow kicks in to run the necessary checks and make sure everything meets the standards set by the maintainers. It’s all scoped to that one repo, and nothing beyond it.

### Global Workflows

Global workflows are automations that are shared across multiple repositories. These workflows allow new projects to instantly benefit from existing automations within the organization, so maintainers don’t have to build everything from scratch.

For example, say you’re donating a new project to the org. That means you’ll need things like a `Code of Conduct` and a `Contributing Guide`. But instead of writing them from scratch, you can just hook into one of our global workflows that handles that for you, it automatically syncs those docs from a central source and keeps them updated whenever changes are made.

That way, you spend less time reinventing the wheel, and more time actually working on your project.