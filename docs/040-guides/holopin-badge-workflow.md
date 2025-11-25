---
title: Holopin Badge Workflow for Maintainers
description: Learn how to set up and use Holopin digital badges to recognize contributors in your repository.
weight: 30
---

## Introduction

Holopin badges (also called stickers) are digital badges that maintainers can issue to recognize and reward contributors for their work. This guide explains how to set up the Holopin badge workflow for your repository and how to issue badges to contributors.

> **Reference:** See the [AsyncAPI's `holopin.yml` configuration](https://github.com/asyncapi/.github/blob/master/.github/holopin.yml) for a complete example.

## Prerequisites

Before you can issue Holopin badges, you need to complete the following prerequisites:

### 1. Create a Holopin Account

1. Visit [holopin.io](https://holopin.io) and create an account
2. Complete your profile setup

### 2. Join the Holopin Organization

Repository maintainers must be members of the AsyncAPI Holopin organization to issue badges.

**To get added to the organization:**
- Open a Holopin account
- Contact one of the following administrators to request access:
  - **@thulieblack** (GitHub)
  - **@derberg** (GitHub)

Ask them to add you to the AsyncAPI Holopin organization so you can start issuing badges.

### 3. Link GitHub Account

1. Go to your [Holopin Account Settings](https://holopin.io/account)
2. Link your Holopin account to your GitHub profile
3. This enables the `@holopin-bot` to work in your repositories

## Setting Up the Badge Workflow

### Create the `holopin.yml` File

Create a `.github/holopin.yml` file in your repository root (or in the `.github` directory if you're using a shared configuration repository).

The file structure should look like this:

```yaml
#
# This file enables maintainers to issue Holopin digital badges (stickers) to contributors,
# and details which badges are available for your repo.
#
# - Prerequisite: Repo maintainer(s) must be members of the Holopin organization
# - Open a Holopin account and ask @thulieblack or @derberg to add you to the AsyncAPI Holopin org
# - Docs: https://docs.holopin.io/issuing-rewards/regular-badges
#
# Usage - Issuing Badges:
# 1. To issue a badge, comment in an Issue or PR:
#      @holopin-bot @username sticker-alias
#    (Replace @username and sticker-alias as needed)
# 
# - Docs: https://docs.holopin.io/integrations/github
#

organization: asyncapi
defaultSticker: cm9sq1lb7148060cjmbvrpbcjh

stickers:
  - id: cm9sq1lb7148060cjmbvrpbcjh
    alias: contributor-badge
  - id: cm9sq9gav08040cl7wllo7t58
    alias: maintainer-badge
  - id: cm9sqfgt969010cjsedmcnnor
    alias: triager-badge
  - id: cm9sqidpx183630cjmkyo9jsi3
    alias: ambassador-badge
  - id: cm9sqoota86860cjslsvmyok6
    alias: leader-badge
  - id: cm9sqr74o209520cjmt9rksacd
    alias: speaker-badge
  - id: cm9sqsqag213480cjm3x8w3a4l
    alias: volunteer-badge
  - id: cm9squ4eq103310cjs0b6pjodo
    alias: mentor-badge
  - id: cm9sqpuco89820cjscmppqm99
    alias: champion-badge
  - id: cmae21gwr24210dl5oghsouey
    alias: bronze-badge
  - id: cmae22qm526240dl57yhq8opq
    alias: silver-badge
  - id: cmae2583o30150dl56bl3ms9z
    alias: gold-badge
  - id: cmae26orl110420dkypr5dy0yn
    alias: platinum-badge
  - id: cmae288m9116470dky1ku70j1u
    alias: diamond-badge
```

### Configuration Fields Explained

| Field | Description | Required |
|:---:|:---|:---:|
| `organization` | Your Holopin organization name (e.g., `asyncapi`) | Yes |
| `defaultSticker` | The ID of the default sticker to be issued when no alias is specified | Yes |
| `stickers` | List of available stickers with their IDs and aliases | Yes |
| `stickers[].id` | Unique identifier for the sticker (provided by Holopin) | Yes |
| `stickers[].alias` | Short name you'll use when issuing badges (e.g., `contributor-badge`) | Yes |

### Available Badge Types

The AsyncAPI organization has the following badges available:

- **contributor-badge** - For general contributions
- **maintainer-badge** - For repository maintainers
- **triager-badge** - For issue triagers
- **ambassador-badge** - For AsyncAPI ambassadors
- **leader-badge** - For community leaders
- **speaker-badge** - For speakers at events
- **volunteer-badge** - For volunteers
- **mentor-badge** - For mentors
- **champion-badge** - For champions
- **bronze-badge** - Bronze tier recognition
- **silver-badge** - Silver tier recognition
- **gold-badge** - Gold tier recognition
- **platinum-badge** - Platinum tier recognition
- **diamond-badge** - Diamond tier recognition

## Issuing Badges

Once your repository is configured with the `holopin.yml` file, you can issue badges to contributors.

### How to Issue a Badge

1. Navigate to any **Issue** or **Pull Request** in your repository
2. Add a comment with the following format:

```
@holopin-bot @username sticker-alias
```

**Example:**
```
@holopin-bot @johndoe contributor-badge
```

This will issue the `contributor-badge` to the user `@johndoe`.

### What Happens Next

1. The `@holopin-bot` will process your comment
2. The bot will respond with a unique claim URL for the recipient
3. The recipient can click the link to claim their badge on their Holopin profile
4. The badge will appear on their Holopin profile and can be displayed on their GitHub profile

### Best Practices

- **Be specific:** Use the appropriate badge type for the contribution
- **Timely recognition:** Issue badges soon after contributions are merged or completed
- **Consistent criteria:** Establish clear criteria for each badge type in your repository
- **Document usage:** Consider adding badge criteria to your repository's CONTRIBUTING.md or README.md

## Getting New Badges

If you need new badge types created for your repository:

1. Contact **@thulieblack** or **@derberg** to request new badge designs
2. Once created, they will provide you with the badge ID
3. Add the new badge to your `holopin.yml` file with an appropriate alias

## Additional Resources

- **Holopin GitHub Integration Documentation:** [https://docs.holopin.io/integrations/github](https://docs.holopin.io/integrations/github)
- **Holopin Issuing Rewards Guide:** [https://docs.holopin.io/issuing-rewards/regular-badges](https://docs.holopin.io/issuing-rewards/regular-badges)
- **AsyncAPI Holopin Configuration:** [https://github.com/asyncapi/.github/blob/master/.github/holopin.yml](https://github.com/asyncapi/.github/blob/master/.github/holopin.yml)

## Troubleshooting

### Bot Not Responding

- Ensure the `holopin.yml` file is correctly formatted and in the right location
- Verify you're a member of the Holopin organization
- Check that your GitHub account is linked to your Holopin account
- Make sure you're commenting in an Issue or Pull Request (not a discussion)

### Badge Not Issued

- Verify the sticker alias exists in your `holopin.yml` file
- Check that the username is correct (include the `@` symbol)
- Ensure the bot has access to the repository

### Need Help?

If you encounter issues or need assistance:
- Contact **@thulieblack** or **@derberg** on GitHub
- Reach out in the [AsyncAPI Slack](https://asyncapi.com/slack-invite) community
- Check the [Holopin support documentation](https://docs.holopin.io)

