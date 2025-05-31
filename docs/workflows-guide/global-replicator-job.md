---
title: 'The Global Replicator Workflow Job'
weight: 70
---

By simply extending the pattern of our workflow automations, we introduced a custom workflow called `Global Replicator` with a simple of goal of replicating generic files in different repositories from a single source. 

The Global Replicator Workflow provides the flexibility of having a subset of reusable workflows shared across multiple repositories, so you don’t have to maintain the same workflows in every project manually.

Once a repository opts in to a specific replicator job (`via topics`), it will automatically receive updates whenever that workflow file/files in the replicator job changes. This means your repo always stays in sync with the latest improvements or fixes, no extra work required.

The `global replicator` workflow consists of multiple jobs such as `Replicate Code of Conduct in all repositories` job configuration which is responsible for propagating the `Code of Conduct.md` file across all relevant repositories. 

There are two categories of jobs in the `global replicator workflow` which are  `Default workflow jobs` and `Topic-to-Replicator workflow jobs`. 

## Default Workflow Jobs

These jobs handle the distribution of **organization-wide files**, such as `CODE_OF_CONDUCT.md` or `CONTRIBUTING.md`, which are essential for maintaining consistency and compliance across all repositories.

For example, when a project joins the AsyncAPI organization, it must adopt our organization-wide policies, such as the [Code of Conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md). But with over 50 repositories, how do we ensure each one always has the most up-to-date version?

That’s where the `Replicate Code of Conduct in all repositories` job configuration in the `global replicator` comes in which is considered as a default job, which main purpose is to automate the propagation of the`CODE_OF_CONDUCT.md` file across all relevant repositories.

Here’s a snippet of the job from the replicator workflow:

```
  replicate_coc:
    if: startsWith(github.repository, 'asyncapi/')
    name: Replicate Code of Conduct in all repositories
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Replicating file
        uses: derberg/manage-files-in-multiple-repositories@beecbe897cf5ed7f3de5a791a3f2d70102fe7c25
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          patterns_to_include: CODE_OF_CONDUCT.md
          repos_to_ignore: shape-up-process,glee-hello-world,saunter
          committer_username: asyncapi-bot
          committer_email: info@asyncapi.io
          commit_message: "ci: update of files from global .github repo"
          bot_branch_name: bot/update-files-from-global-repo
```

This job uses the `derberg/manage-files-in-multiple-repositories` action to replicate files across all repositories, except for those explicitly excluded via the `repos_to_ignore` input. It ensures every project receives a local and up-to-date copy of the `CODE_OF_CONDUCT.md`, instead of just linking to it, which might be ignored or missed by contributors and automation.

## Topic-to-Replicator Jobs

Topic-to-Replicator Workflow jobs are tailored to **specific use cases** or **project types** such as language-specific test workflows that are only needed in a subset of repositories.

For instance, when a new Go-based project joins the AsyncAPI ecosystem, we may want to enable our centralized Go PR testing workflow for that repository. However, this workflow should **only** be applied to Go projects.

To support this, the `global replicator` includes jobs that uses the `topics_to_include` filter. Repositories must have a specified global workflow topic to be eligible for the workflow:

```
  replicate_go_workflows:  
    if: startsWith(github.repository, 'asyncapi/')
    name: Replicate workflows for Go projects
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Replicating file
        uses: derberg/manage-files-in-multiple-repositories@beecbe897cf5ed7f3de5a791a3f2d70102fe7c25
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          patterns_to_include: .github/workflows/if-go-pr-testing.yml
          topics_to_include: golang
          committer_username: asyncapi-bot
          committer_email: info@asyncapi.io
          commit_message: "ci: update of files from global .github repo"
          bot_branch_name: bot/update-files-from-global-repo

```

In this setup, **only repositories tagged with the `golang` topic** will receive the `go PR testing workflow`. This gives maintainers the flexibility to opt into shared workflows without affecting repositories that don't need them.

Below is a list of workflows with their corresponding topics and descriptions. By including each topic in your repository in AsyncAPI organisation, you will subscribe to get a workflow or a group of workflows that perform a specific task.

| Topic to include | Workflows you will get | Description |
| --- | --- | --- |
| `get-workflows-validation` | [validate-workflow-schema](.github/workflows/validate-workflow-schema.yml) | Validates the YAML schema of a workflow files in your repository 
| `golang` | [if-go-pr-testing](.github/workflows/if-go-pr-testing.yml) | Compiles and tests Go code using multiple versions of Go
| `nodejs` | [if-nodejs-pr-testing](.github/workflows/if-nodejs-pr-testing.yml) | Builds and tests Node.js projects using multiple Node.js versions
| `get-global-node-release-workflows` | [if-nodejs-release](.github/workflows/if-nodejs-release.yml), [if-nodejs-version-bump.yml](.github/workflows/if-nodejs-version-bump.yml) , [bump.yml](.github/workflows/bump.yml) | Fetches and publishes Node.js release information to the project's website
| `get-global-releaserc` | [.releaserc](.github/workflows/.releaserc) | Fetches release configuration files from a remote repository andUpdates the documentation of a project using `generate:assets` command (if it exists) when the commit starts with `docs makes them available to other workflows 
| `get-global-docs-autoupdate` | [update-docs-on-docs-commits](.github/workflows/update-docs-on-docs-commits.yml) | Updates the documentation of a project using `generate:assets` command (if it exists) when the commit starts with `docs:`
| `get-global-prettierignore` | [replicate-prettierignore-file](./.github/workflows/global-replicator.yml#L202C3-L218C61) | Replicates `.prettierignore` file in the repository which has this topic.

## Why This Matters

Having local copies of key files like the Code of Conduct ensures better visibility and enforcement. More importantly, it removes the burden from maintainers to keep these files in sync manually. Updates made in the `.github` repo can be automatically and reliably distributed across all relevant projects. 