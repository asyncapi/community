---
title: 'Workflow Automation Overview'
weight: 20
---

Back in the early days of AsyncAPI, it all started with a few conversations in a Slack workspace. A couple of issues and pull requests here and there. Someone would ping a maintainer, and within a day or two, things moved along. AsyncAPI was small and personal — you knew who was working on what, and decisions were just a DM away.

But a few years down the line, growth becomes inevitable. One day you're merging a couple of community contributions, and the next, your GitHub notifications are a wall of chaos. Comments get lost. Issues go stale. A contributor’s PR sits unnoticed for weeks, and by the time a code owner reviews it, it’s out of sync with the main branch.

That’s when it hits you: _we’re not a small team anymore._

AsyncAPI is now a full-blown open source ecosystem with over 50 repositories, more than 2.7k contributors, upards of 5,000 issues, an estimated 5,000 pull requests, and the `@asyncapi/spec` package soaring past 34 million downloads in the past year alone.

Without automation, we’re screwed. Like, seriously screwed. Both at the project level _and_ the community level.

So yeah, to avoid getting screwed, we automate pretty much everything we possibly can using GitHub Actions. 

## What is Workflow Automation? 

Workflow automation is basically letting software handle the repetitive stuff so humans don’t have to. Sometimes it takes over an entire process from start to finish. Other times, it just steps in for the boring bits while people handle the rest. Either way, it keeps things moving. And the truth is, no one’s got time to be clicking buttons all day.

Workflow automation can work at almost any scale. On an individual level, it could be as simple as setting up a bot to label issues or run tests on every pull request. On an organisational level, it’s stuff like closing stale issues across all projects, publishing docs on every release, or notifying members when a new release happen. At that point, it’s not just about saving time, it’s about keeping the whole ecosystem from collapsing under its own weight.

## Why use Github Actions for AsyncAPI

The question is `Why not?`

All our projects live on GitHub, and GitHub gives us a built-in CI/CD tool that fits right into the ecosystem. It lets us automate workflows directly in our repos, integrates smoothly with other tools and services, and to top it all off — it’s free. Like, zero dollars. So yeah... why not?

I mean, what else would you suggest? CircleCI? TravisCI? _lol_.

GitHub Actions also comes with a ton of prebuilt actions from the GitHub Marketplace. Or better yet, you can write your own in any programming language and share it with the world. It’s flexible, powerful, and built right into where we already work.

We use it for everything from release announcement, welcoming contributors, bumping dependencies, automatically merging PRs, and many more. Once you set it up right, it's like having a squad of tireless bots(special shoutout to eve and chan) keeping the project running 24/7. 

You can learn more about Github Actions by visiting the [official documentation](https://docs.github.com/en/actions) page. 