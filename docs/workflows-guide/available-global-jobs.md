---
title: 'All Available Global Workflow Jobs'
weight: 80
---

The `global replicator` workflow consists of multiple jobs, each designed to handle a specific task that benefits repositories across the AsyncAPI organization. Some jobs are applied by default, while others are optional and require explicit `opt-in` through repository topics. 

Below is a list of all available global workflow jobs, along with a brief explanation of what each one does, the value it brings, and what you might miss out on if you choose not to enable it.

## Replicate Code of Conduct in all repositories

This workflow job ensures the distribution of the AsyncAPI `CODE_OF_CONDUCT.md` file across every repository within the AsyncAPI organization.

If you're donating a project or creating a new one under the AsyncAPI umbrella, this job is non-negotiable. You don’t get to define your own Code of Conduct because all projects must align with the shared organizational standard, which is upheld by the AsyncAPI Community Code of Conduct Committee.

Here’s a snippet of the workflow job responsible for syncing the file:

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

As shown above, the workflow pushes the `CODE_OF_CONDUCT.md` to all repositories except those explicitly listed in the `repos_to_ignore` filter. Only maintainers of the `.github` repository can modify this ignore list, which reflects how central and critical this file is to the health of the entire AsyncAPI ecosystem.

## Replicate Contributing Guide to all repositories

This workflow job ensures the distribution of the AsyncAPI `Contributing.md` file across every repository within the AsyncAPI organization.

If you're starting a new project under the AsyncAPI umbrella, this guide will be automatically added to your repository especially helpful if one doesn’t already exist. Rather than reinventing the wheel, you get a battle-tested contribution guide built from years of community contributor's experience.

However, if your project is complex and requires a customized contribution process that differs significantly from the standard one, you can opt out of this job. To do that, simply add your repository name to the `repos_to_ignore` list in the workflow configuration. 

This gives project maintainers both a strong starting point and the flexibility to diverge when necessary.

Here’s the snippet of the workflow job in action:

```
  replicate_contributing:
    if: startsWith(github.repository, 'asyncapi/')
    name: Replicate CONTRIBUTING guide to all repositories
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Replicating file
        uses: derberg/manage-files-in-multiple-repositories@beecbe897cf5ed7f3de5a791a3f2d70102fe7c25
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          patterns_to_include: CONTRIBUTING.md
          repos_to_ignore: shape-up-process,glee-hello-world,spec,community,php-template,tck,modelina,dotnet-nats-template,ts-nats-template,extensions-catalog,saunter,website,generator
          committer_username: asyncapi-bot
          committer_email: info@asyncapi.io
          commit_message: "ci: update of files from global .github repo"
          bot_branch_name: bot/update-files-from-global-repo
```

As shown above, some repositories such as `modelina`, `website`, and `generator` have already opted out because their contribution guidelines required modifications to match the complexity of their project needs. This means that whenever the global `CONTRIBUTING.md` file changes, repositories listed under `repos_to_ignore` will not receive those updates automatically.

## Replicate workflow for Go projects

This workflow job provides a language-specific testing setup tailored for Go projects. If you're setting up a Go-related project within the AsyncAPI community, this workflow gives you a battle-tested Go-related PR testing workflow file that you can adopt without needing to create one from scratch.

Unlike the previous jobs that rely on maintaining a list of repositories to include or ignore, this job uses GitHub repository topics for opt-in. That means all you need to do is tag your repository with a specific topic from the workflow `topics_to_include` filter, no manual editing of the workflow configuration required.

Here’s the workflow snippet:

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

As shown above, instead of the typical `repos_to_ignore` filter, this job uses a `topics_to_include` filter. To opt into this workflow, simply add the `golang` topic to your repository.

## Replicate workflows for Nodejs projects

 This workflow job provides a language-specific PR testing setup tailored for Node.js projects. If you're setting up a Node.js-related project within the AsyncAPI community, this job offers a battle-tested PR testing workflow configuration that you can adopt immediately. 

This workflow functions similarly to the Go workflow described earlier, with the key difference being its focus on Node.js projects.

Here’s the workflow snippet:

```
 replicate_nodejs_workflows:
    if: startsWith(github.repository, 'asyncapi/')
    name: Replicate workflows for Nodejs projects
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Replicating file
        uses: derberg/manage-files-in-multiple-repositories@beecbe897cf5ed7f3de5a791a3f2d70102fe7c25
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          patterns_to_include: .github/workflows/if-nodejs-pr-testing.yml
          topics_to_include: nodejs
          committer_username: asyncapi-bot
          committer_email: info@asyncapi.io
          commit_message: "ci: update of files from global .github repo"
          bot_branch_name: bot/update-files-from-global-repo
```

As with the Go-specific workflow, this job uses the `topics_to_include` filter too, instead of a list of repository names. To opt into this workflow, simply add the `nodejs` topic to your repository. Once the topic is in place, the workflow will automatically apply to your project.

## Replicate release workflows for Nodejs projects

This workflow job provides you with three battle tested workflow configuration specifically tailored for Node.js projects:
- **Semantic Release Workflow**: Automatically handles publishing when a release is triggered.
- **Version Bump Workflow**: Updates your project's `package.json` version after a release.
- **Dependency Bump Workflow**: Detects other AsyncAPI repositories that depend on your project and opens a PR to bump their dependency version.

Here's the workflow snippet:

```
  replicate_nodejs_release_workflows:
    if: startsWith(github.repository, 'asyncapi/')
    name: Replicate release workflows for Nodejs projects
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Replicating file
        uses: derberg/manage-files-in-multiple-repositories@beecbe897cf5ed7f3de5a791a3f2d70102fe7c25
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          patterns_to_include: .github/workflows/if-nodejs-release.yml,.github/workflows/if-nodejs-version-bump.yml,.github/workflows/bump.yml
          topics_to_include: get-global-node-release-workflows
          committer_username: asyncapi-bot
          committer_email: info@asyncapi.io
          commit_message: "ci: update of files from global .github repo"
          bot_branch_name: bot/update-files-from-global-repo
```

As shown above, this job uses the `topics_to_include` filter, so opting in is as simple as adding the `get-global-node-release-workflows` topic to your repository. Once added, the workflow files will be automatically replicated and kept in sync with the global configuration.

## Replicate .releaserc file

While the **Replicate Release Workflows for Node.js Projects** already includes semantic release support, there are scenarios where you might want more control over how semantic release is configured in your repository. For instance, you might want to use a custom `.releaserc` file located in a different directory in your repository, or you might need to extend the default config for your specific release needs.

To help with this, we provide a standalone workflow job that replicates the global `.releaserc` configuration file into your repository. This file is essential for projects using **semantic-release**, as it defines how your releases are managed. 

You can opt into this job by simply adding the `get-global-releaserc` topic to your repository.

Here’s the workflow snippet:

```
  replicate_semantic_release_config:
    if: startsWith(github.repository, 'asyncapi/')
    name: Replicate .releaserc file
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Replicating file
        uses: derberg/manage-files-in-multiple-repositories@beecbe897cf5ed7f3de5a791a3f2d70102fe7c25
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          patterns_to_include: .github/workflows/.releaserc
          topics_to_include: get-global-releaserc
          committer_username: asyncapi-bot
          committer_email: info@asyncapi.io
          commit_message: "ci: update of files from global .github repo"
          destination: ./
          bot_branch_name: bot/update-files-from-global-repo
```

This workflow configuration above ensures that your `.releaserc` file stays consistent with the global `.releaserc` file, while still allowing you to override or extend it in your own workflows as needed.

## Replicate generic workflows and scripts needed for any project

This workflow is the most comprehensive of all the available workflow jobs in the `global replicator` file, simply because it's replicating a number of generic workflows — more than just two or three. These are foundational configurations that make maintaining any project within the AsyncAPI organization smoother and more efficient. 

Here are a few highlights of what this job provides:

- **Automatic Merging of Pull Requests**: Enables auto-merging with a simple command or by labeling a PR as `ready-to-merge`.
- **Welcome Messages for First-Time Contributors**: New contributors get a friendly message when they open their first PR—great for community engagement.
- **Pull Request Title Linting**: Ensures contributors follow PR title conventions, promoting cleaner release notes and commit history.

Here's the workflow snippet:

```
  replicate_generic_workflows:
    if: startsWith(github.repository, 'asyncapi/')
    name: Replicate generic workflows and scripts needed for any project
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Replicating file
        uses: derberg/manage-files-in-multiple-repositories@beecbe897cf5ed7f3de5a791a3f2d70102fe7c25
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          patterns_to_include: .github/workflows/scripts,.github/workflows/automerge-for...
          committer_username: asyncapi-bot
          committer_email: info@asyncapi.io
          commit_message: "ci: update of files from global .github repo"
          repos_to_ignore: shape-up-process,glee-hello-world,saunter
          bot_branch_name: bot/update-files-from-global-repo
```

> The `patterns_to_include` filter has been truncated for readability. You can view the full list of included workflows in the [global-replicator file](https://github.com/asyncapi/.github/blob/18c6f8640260d0e4efe660bee94fcb36298f1f32/.github/workflows/global-replicator.yml#L130).

By default, this workflow runs for all AsyncAPI repositories, unless a repo is explicitly opted out via the `repos_to_ignore` list. But honestly, there’s little reason to skip this one; it brings in a lot of useful automation and community-friendly features that make life easier for maintainers and contributors alike.

## Replicate docker workflows needed for any project

This workflow job enables you to test your `Dockerfile` during pull requests and build Docker images as part of your project’s release process. If you’d rather not manage a custom Docker workflow yourself, you can opt in by simply adding the `docker` topic to your repository. Once added, the global Docker PR testing workflow configuration will be automatically replicated into your repo.

Here’s the workflow snippet:

```
  replicate_docker_workflows:
    if: startsWith(github.repository, 'asyncapi/')
    name: Replicate Docker workflows needed for any project
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Replicating file
        uses: derberg/manage-files-in-multiple-repositories@beecbe897cf5ed7f3de5a791a3f2d70102fe7c25
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          topics_to_include: docker
          patterns_to_include: .github/workflows/if-docker-pr-testing.yml
          committer_username: asyncapi-bot
          committer_email: info@asyncapi.io
          commit_message: "ci: update of files from global .github repo"
          bot_branch_name: bot/update-files-from-global-repo
```

This approach saves you the overhead of maintaining Docker workflow files manually, while still giving your project automated Docker testing during development and releases.

## Replicate workflow schema validation to repositories

This workflow job enables schema validation for custom GitHub Action workflows in your repository. If you need to create custom workflows tailored to your project's specific needs, it's important to ensure they're valid and error-free.

By simply adding the `get-workflows-validation` topic to your repository, you’ll automatically receive a validation workflow that checks your local workflow files against the global workflow schema file.

Here’s the workflow snippet:

```
  replicate_validate_workflow_schema:
    if: startsWith(github.repository, 'asyncapi/')
    name: Replicate workflow schema validation to repositories
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Replicating file
        uses: derberg/manage-files-in-multiple-repositories@beecbe897cf5ed7f3de5a791a3f2d70102fe7c25
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          patterns_to_include: .github/workflows/validate-workflow-schema.yml
          topics_to_include: get-workflows-validation
          committer_username: asyncapi-bot
          committer_email: info@asyncapi.io
          commit_message: "ci: update of files from global .github repo"
          bot_branch_name: bot/update-files-from-global-repo 
```

This helps catch issues early when introducing new local workflows. 

## Replicate .prettierignore file in the required repositories

This workflow job helps maintain consistent formatting standards across your project by automatically syncing a shared `.prettierignore` file.

When contributions start rolling in, it’s common to see formatting changes unintentionally introduced by contributors with auto-formatting tools like Prettier enabled in their editors. These unintended changes can slow down code reviews.

By opting into this workflow using the `get-global-prettierignore` topic, your repository will receive the global `.prettierignore` file. This ensures that anyone using prettier won't be able to push any changes to the repository, making code reviews cleaner.

Here’s the workflow snippet:

```
  replicate_prettierignore_file:
    if: startsWith(github.repository, 'asyncapi/')
    name: Replicate .prettierignore file in the required repositories
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Replicating file
        uses: derberg/manage-files-in-multiple-repositories@beecbe897cf5ed7f3de5a791a3f2d70102fe7c25
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          patterns_to_include: .prettierignore
          topics_to_include: get-global-prettierignore
          committer_username: asyncapi-bot
          committer_email: info@asyncapi.io
          commit_message: "ci: update .prettierignore from global .github repo"
          bot_branch_name: bot/update-files-from-global-repo
          destination: ./ 
```

This workflow helps prevent formatting noise in pull requests and keeps your codebase clean and easy to review.