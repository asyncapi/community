---
title: 'Utilizing GitHub Actions'
weight: 120
---

- [Overview](#overview)
- [Types of GitHub Actions workflows](#types-of-github-actions-workflows)
  - [Local workflows](#local-workflows)
  - [Global workflows](#global-workflows)
- [Global workflows overview](#global-workflows-overview)
- [Global replicator workflow](#global-replicator-workflow)
- [How to opt in or out of global workflows](#how-to-opt-in-or-out-of-global-workflows)
  - [Opt-in](#opt-in)
  - [Opt-out](#opt-out)
- [Semantic release and automation](#semantic-release-and-automation)
- [Slash commands](#slash-commands)
- [Basic requirements to use global workflows](#basic-requirements-to-use-global-workflows)

## Overview

[GitHub Actions](https://docs.github.com/actions) is a continuous integration and continuous delivery (CI/CD) platform that automates software development workflows directly within a GitHub repository.

At AsyncAPI, GitHub Actions is crucial for maintaining consistency, efficiency, and quality across our projects by handling repetitive tasks automatically.

This document outlines how AsyncAPI utilizes GitHub Actions to automate and optimize workflows. It provides a comprehensive guide for maintainers and contributors, explaining global and local workflows, common commands, repository setup, and best practices.

## Types of GitHub Actions workflows

At AsyncAPI, there are two types of workflows: [local](#local-workflows) and [global](#global-workflows).

### Local workflows

Local workflows are specific to a repository. They are stored in the `.github/workflows` directory and typically handle:

- Running tests on pull requests (PRs).
- Linting code.
- Building and deploying applications.

A few key points about local workflows in AsyncAPI:

- Multiple workflows can be triggered for a single PR.
- Not all workflows are required to pass for a PR to be merged.  
- Some workflows are marked as required; if these fail, the PR will be blocked.  
- External workflows can sometimes affect local checks.

You can view these workflows under the **Actions** tab or at the bottom of each PR page.

### Global workflows

Global workflows are shared across multiple repositories and maintained centrally in the [AsyncAPI `.github` repository](https://github.com/asyncapi/.github).

They help:

- Enforce consistent configurations.
- Automate releases.
- Synchronize files across repositories.

Changes made to global workflows can automatically propagate to opted-in repositories.

## Global workflows overview

The table below provides an overview of all the global workflows available in the AsyncAPI organization:

| Workflow Name | Description |
|:--------------|:------------|
| **Add Good First Issue** | Labels issues automatically with `good first issue` and area labels to an issue when a contributor comments `/gfi` or `/good-first-issue [area]`. |
| **Automerge for Humans(Add Ready to Merge or Do Not Merge)** | Enables merging PRs via slash commands such as `/rtm`, `/dnm`, `/au` to mark them as ready to merge, block them from merging, or enable automatic updates. |
| **Automerge for Humans Merging** | Enables automatic merging of pull requests once all checks pass and a maintainer has approved it, as long as the PR has the `ready-to-merge` label and no `do-not-merge` label. |
| **Automerge for Humans(remove ready to merge label on edit)** | Acts as a safeguard by automatically removing the `ready-to-merge` label if a pull request is changed (either synchronized or its title is edited) after the label was applied. |
| **Automerge Orphan** | Runs daily to identify pull requests opened by bots like `asyncapi-bot` or `dependabot` that failed to automerge. |
| **Automerge** | Automatically approves and merges pull requests created by trusted bots like `asyncapi-bot` or `dependabot`. |
| **Autoupdate** | Ensures that autoapproved pull requests with the `autoupdate` label in upstream AsyncAPI repositories are always up-to-date with their target branches. |
| **Bounty Program Commands** | Allows only authorized users to assign or unassign bounties using comments like `/bounty` or `/unbounty`. |
| **Bump** | Bumps version dependencies across AsyncAPI repos after a release commit is merged into `master`. |
| **Global Remover** | Deletes specific files from multiple repositories in the AsyncAPI organization. It runs when changes are pushed to the `.github/workflows` directory, or when manually triggered. |
| **Global Replicator** | Syncs various important files across multiple repositories in the AsyncAPI organization. |
| **Help Command** | Lists available slash commands when `/help` is used. |
| **If Docker PR testing** | Runs on pull request activity and tests whether a Docker image can be built from the project **only if a `Dockerfile` is present** in the repository root. |
| **If Go PR testing** | Runs on pull request activity and, if the project contains a `go.mod` file, it lints and tests the Go code across Linux, macOS, and Windows environments—while skipping checks for automated bot PRs. |
| **If Node.js PR Testing** | Runs on pull request events and, if a `package.json` file is found, it installs dependencies, runs tests, and performs linting for Node.js projects across Linux, macOS, and Windows. |
| **If Node.js Release** | Automates the release process for Node.js projects by running tests across OSes when conventional commit messages are used and the repo is under `asyncapi/`. |
| **If Node.js Version Bump** | Bumps the version in a Node.js project's `package.json` right after a GitHub release is published. |
| **Issue and PR Notifications** | Sends Slack notifications on issue and PR activity. |
| **Lint PR Titles** | Enforces Conventional Commits for PR titles. |
| **Notify TSC Mentions** | Notifies the TSC via Slack and email whenever `@asyncapi/tsc_members` is mentioned in issues, PRs, discussions, or their comments. |
| **PTAL Command** | Listens for `/please-take-a-look` or `/ptal` comments on PRs and pings any requested reviewers who haven’t reviewed yet, helping prompt attention from the right people. |
| **Release Announcements** | Announces new releases by notifying a Slack channel for every release and tweeting about major or minor releases, including contributor recognition. |
| **Stale Issues Management** | Marks inactive issues and PRs as stale after 120 days of inactivity and closes them if there's still no activity, while allowing exceptions via labels. |
| **Transfer Issues** | Allows users to transfer open issues between AsyncAPI repos by commenting `/transfer-issue <repo>` or `/ti <repo>`, validating the target repo first. |
| **Update Docs** | Regenerates docs PRs on `docs:` commits. |
| **Update MAINTAINERS Trigger** | Triggers an update to the `MAINTAINERS.yaml` file in the community repo whenever a `CODEOWNERS` file is changed on the `master` branch. |
| **Update PR** | Listens for PR comments with `/update` or `/u`, and if the PR is updateable (e.g., it's behind the base branch but has no conflicts), it automatically merges the latest changes from the base into the PR branch—even for forks (unless they're in different orgs or lack permissions). |
| **Validate Workflow Schema** | Lints and validates GitHub Actions YAMLs. |
| **Welcome First Time Contributors** | Posts a welcome message for first-time contributors. |

(For a detailed breakdown of each, see [AsyncAPI Global Workflows](https://github.com/asyncapi/.github/tree/master/.github/workflows)).

## Global replicator workflow

The [Global Replicator Workflow](https://github.com/asyncapi/.github/blob/master/.github/workflows/global-replicator.yml) keeps key files in sync across AsyncAPI repositories.

| **Job Name**                     | **Description**                            | **Replicated Files**                          | **Target**                   |
|----------------------------------|---------------------------------------------|------------------------------------------------|-------------------------------|
| `replicate_coc`                  | Syncs `CODE_OF_CONDUCT.md`                  | `CODE_OF_CONDUCT.md`                           | All AsyncAPI repos            |
| `replicate_contributing`         | Syncs `CONTRIBUTING.md`                     | `CONTRIBUTING.md`                              | All AsyncAPI repos            |
| `replicate_go_workflows`         | Pushes Go PR testing workflows              | `.github/workflows/if-go-pr-testing.yml`       | Repos with `golang` topic     |
| `replicate_nodejs_workflows`     | Pushes Node.js PR testing workflows         | `.github/workflows/if-nodejs-pr-testing.yml`   | Repos with `nodejs` topic     |
| `replicate_nodejs_release_workflows`| Pushes Node.js release workflows          | `if-nodejs-release.yml`, `if-nodejs-version-bump.yml` | Node release repos |
| `replicate_generic_workflows`    | Pushes utility workflows like stale labeling| Multiple `.github/workflows/*.yml`             | All AsyncAPI repos            |
| `replicate_docker_workflows`     | Pushes Docker PR testing workflows          | `.github/workflows/if-docker-pr-testing.yml`   | Repos with `docker` topic     |
| `replicate_validate_workflow_schema`| Adds YAML validation workflows             | `.github/workflows/validate-workflow-schema.yml`| Repos with validation topic  |


## How to opt in or out of global workflows

### Opt-in  

  To opt in to a global workflow managed in the AsyncAPI `.github` repository, you can either add a specific topic to your repository (via GitHub settings or the GitHub CLI) or ask a maintainer to trigger it manually for you.
  
  To do this, reach out on Slack or open an issue, and a maintainer can run the “Global workflow to rule them all” from the **Actions** tab, optionally targeting your repo by name.

### Opt-out

  Some workflows are applied automatically to all repositories. If you’d like to opt out of one of those, your repository must be added to the `repos_to_ignore` list in the relevant job. This change has to be made in the global workflow by a maintainer, so just ask in Slack or open an issue if you'd like to be excluded.

## Semantic release and automation

Semantic release automatically creates and publishes new package versions based on commit messages following [Conventional Commits](https://www.conventionalcommits.org/).

By merging a pull request with a properly formatted title, a release is automatically triggered without needing manual intervention.

When you opt in to the Node.js release workflows, you also agree to use Semantic Release and Conventional Commits across your repository. This setup enables full automation of the release process: once code is merged to `master`, the appropriate version is published to npm, and a GitHub release is created. It even supports advanced cases like pre-releases.

There are two separate jobs in the AsyncAPI global workflow: one to replicate the Node.js release workflows, and another to replicate the standard `.releaserc` configuration file. Some projects, especially more complex setups like monorepos, may need a custom release configuration instead of the default one, and in those cases, maintainers can opt out of using the shared `.releaserc` file.

## Slash commands

Thanks to the shared workflows, repositories that opt in automatically get support for issue and pull request commands.

These commands allow users to type a slash command (like `/something`) directly into an issue or PR to trigger helpful actions through a bot, reducing manual work.

To make it easy, the most important command to remember is `/help`, which shows a list of all available commands whenever you need it.

For example, the `/rtm` command lets you merge a PR without worrying about manually adjusting the commit message.
## Basic requirements to use global workflows

Before a repository can start using the global workflows managed through the `.github` repository, a few setup steps are required. This ensures that bots can properly push and merge workflow files. Without these steps, the automation will not work as expected.

The basic requirements are:

- **Add the bots team as maintainers**: In the repository settings, under *Collaborators and Teams*, add the bots team with maintainer permissions.
- **Add Eve to code owners**: Ensure that the Eve bot account is listed as a code owner to allow automatic approval of bot-generated pull requests.
- **Trigger initial setup**: Reach out to the maintainers of the `.github` repository and ask them to manually run the "Global Workflow to Rule Them All" action, providing your repository name.
- **Manually approve initial PRs**: The first set of workflow-related pull requests must be manually merged, as the automation for merging only becomes available after the necessary workflows are installed.

Once these steps are complete, the repository will start automatically receiving and merging global workflow updates as expected.