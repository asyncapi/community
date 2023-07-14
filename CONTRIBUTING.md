# Contributing to AsyncAPI Initiative

We love your input! We want to make contributing to this project as easy and transparent as possible. ❤️

The following links show you how to start contributing:
- **Spec contribution:** visit our [AsyncAPI **Spec** contributing document.](https://github.com/asyncapi/spec/blob/master/CONTRIBUTING.md)
- **Tools contribution:** visit our [AsyncAPI **Tools** contributing document.](https://github.com/asyncapi/.github/blob/master/CONTRIBUTING.md)

Below sections explain things that are common for majority of contributor guides:

## Automation around the process of merging a pull request (PR)

> Explanation of this section is also [available as a video](https://youtu.be/QhOv_W6LmrY).

To get a PR merged:
- it needs to be approved by the maintainer (mentioned in the CODEOWNER file located in the root of the repository) of the repository
- pass required GitHub workflows successfully
- it is not a **Draft** PR
- it is not labeled as **do-not-merge**

Once all above requirements are met, anyone can merge a PR asking the AsyncAPI bot for help. Simply add a comment to the PR such as `/ready-to-merge` or `rtm`. This prompts the bot  to add a `ready-to-merge` label and then proceeds to merge the PR for you. The PR title is used as a commit message of both squashed and merged PRs.

If you are a maintainer and for some reason, you prefer to merge the PR on your own and you do not want a contributor to decide on it, add a `/do-not-merge` or `/dnm` comment to the PR. The bot will then add a `do-not-merge` label that only the repository maintainer can remove.

> Remember that you can always ask AsyncAPI bot on a PR level to remind you about available automation comments with `/help` comment