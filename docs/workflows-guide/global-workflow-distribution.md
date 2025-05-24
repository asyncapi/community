---
title: 'Global Workflows Distribution'
weight: 60
---

Once a global workflow is created or exists within the `.github` repository, the next step is to make them available to other repositories across the organization. This process is referred to as **Workflow Distribution**.

The goal of the distribution is simple: `enable any repository to consume the predefined workflow with minimal setup`. Instead of copying and pasting the same workflow logic into multiple repositories, each project can simply reference a shared workflow directly from the `.github` repository.

To streamline this process, we introduced two custom workflows: `global replicator` and `global remover`. These workflows automate the distribution and removal of global workflow files across all repositories based on predefined conditions.

## How Workflow Distribution Run

If you opt in to get a generic workflow like the `Replicate workflows for Go projects` by adding the `golang` topic to your repository, the workflow doesn’t just magically appear in your Go project. For that to happen, the `global replicator` workflow distributor needs to be triggered.

There are two ways the global workflow distributor can be triggered:

### Automatic Workflow Distribution:

Workflows are distributed automatically **only** when there’s a push to the `.github` repository’s `master` branch.

So, even if you’ve opted in for the Golang workflow by adding the `golang` topic, it won’t be distributed to your repo just yet, not until there’s an actual update pushed to the `.github` repo.

```
on:
  push:
    branches: [master]
    paths:
      - ".github/workflows/**"
      - "CODE_OF_CONDUCT.md"
      - "CONTRIBUTING.md"
```

As shown above, the distribution workflow only triggers if changes are made in specific paths: the `.github/workflows` directory, `CODE_OF_CONDUCT.md`, or `CONTRIBUTING.md`. If no updates land in those files, the distributor won't kick in.

### Manual Workflow Distribution:

The second option is manual and it's only available to `.github` repository maintainers.

Say you've added the `golang` topic to your Go repository and want the Golang workflow applied immediately. In that case, you’ll need to reach out to one of the `.github` repo maintainers and ask them to manually trigger the **global workflow to rule them all** via the **Actions** tab in the `.github` repo.

From there, the maintainer can input the specific repository name and run the distribution for your project manually—no need to wait for a push to the `master` branch.

## Accepting Global Workflows

The real heroes behind the global workflows are the AsyncAPI bots: `Eve` and `Chan`. These bots are responsible for pushing changes and opening pull requests across all repositories when workflows are distributed.

But just opting in to a generic global workflow doesn’t automatically guarantee that the workflow will show up in your repository. A few things need to be in place first:

### Step 1 - Add the AsyncAPI Bots Team as Collaborators

Every repository within the AsyncAPI organization that wants to accept global files from the `.github` repository **must** add the [`asyncapi-bots`](https://github.com/asyncapi-bot) team as a collaborator with at least **maintainer** access.

In other words, if you’re maintaining a repository in the AsyncAPI GitHub org and want to take advantage of the global workflow distribution, you’ll need to make sure the `asyncapi-bots` team is added under your repo’s settings, just like in the example below:

### Step 2 - Add Bot as Part of Code-owners

One of the bots in the `asyncapi-bots` team is [`asyncapi-bot-eve`](https://github.com/asyncapi-bot-eve), who handles pull request approvals coming from the other bot, `Chan`.

To make this work smoothly, you need to add `Eve` as a code owner in your repository. This allows the bot to automatically review and approve any PRs initiated by `Chan`.

### Step 3 - Trigger Initial Workflow Automation

Adding the bots and setting up codeowners isn’t enough by itself. You still need to trigger the initial global workflow distribution.

To do this, reach out to a maintainer of the `.github` repository and ask them to manually trigger the automation. They can do this by going to the **Actions** tab in the `.github` repo, selecting the `Global workflow to rule them all` action, clicking **Run workflow**, and providing your repository name.

This kicks off the bot process and pushes all the global files that your repo has opted into, based on its topics.

### Step 4 - Merge Pull Requests

Once the automation is triggered, you’ll see a few pull requests open in your repo, containing the files distributed by the global workflows. These PRs need to be manually reviewed and merged by your repository’s maintainers.

By default, you'll receive PRs to add the `CODE_OF_CONDUCT.md` and `CONTRIBUTING.md` files, unless your repo is listed in the `repos_to_ignore` section of the global workflow job.

Other workflow-related files will only be included if your project has the right workflow topics set **before** the workflow was triggered.

