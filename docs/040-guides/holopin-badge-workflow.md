---
title: Holopin Badge Workflow for Maintainers
description: Learn how to set up and use Holopin digital badges to recognize contributors in your repository.
weight: 30
---

## Introduction

**Holopin badges** (stickers) are digital rewards maintainers give to recognize contributors. This guide is for repositories **inside the AsyncAPI GitHub organization** and shows, in order:

- **Enable**: Add the `get-global-holopin` topic so the shared Holopin setup auto-applies (no manual `holopin.yml` needed).
- **Issue**: Use the `@holopin-bot @username sticker-alias` comment to send badges.
- **Support**: Who to contact if you need new badges or help.

## Prerequisites

At a glance, you need to: (1) create a Holopin account, (2) join the AsyncAPI Holopin org, and (3) link your GitHub account.

### Create a Holopin Account

1. Visit [holopin.io](https://holopin.io) and create an account
2. Complete your profile setup

### Join the AsyncAPI Holopin Organization

Repository maintainers must be members of the AsyncAPI Holopin organization to issue badges.

**To get added to the organization:**
1. Open a Holopin account
2. Contact one of the following administrators to request access: Ask them to add you to the AsyncAPI Holopin organization so you can start issuing badges.

    - **@thulieblack** (GitHub)
    - **@derberg** (GitHub)

### Link Your GitHub Account

1. Go to your [Holopin Account Settings](https://holopin.io/account)
2. Link your Holopin account to your GitHub profile
3. This enables the `@holopin-bot` to work in your repositories

## Setting Up the Badge Workflow

### Add the Repository Topic

**Steps to add the topic:**

1. Navigate to your repository on GitHub
2. Click on the gear icon next to the "About" section, or click on the topics area
3. In the topics field, add `get-global-holopin`
4. Press Enter or click outside the field to save

The `holopin.yml` file will be automatically created in your repository's `.github` directory with all the necessary configuration replicated from the [AsyncAPI `.github` repository](https://github.com/asyncapi/.github).

> **Note:** For more information about this automation, see the [`replicate_holopin_file` job](https://github.com/asyncapi/.github/blob/master/.github/workflows/global-replicator.yml#L271) within the global replicator workflow.

### Understanding the Configuration

The automatically replicated `holopin.yml` file contains:

- **Organization:** `asyncapi` (the Holopin organization name)
- **Default sticker:** The default badge that will be issued if no alias is specified
- **Available stickers:** A list of all badge types with their IDs and aliases

## How to Issue a Badge

1. Navigate to any **Issue** or **Pull Request** in your repository
2. Add a comment with the following format:

```
// Format
@holopin-bot @username sticker-alias

// Example
@holopin-bot @johndoe contributor-badge
```

Once submitted, the `@holopin-bot` responds to the user `@johndoe` with a unique URL to claim the `contributor-badge` badge within their Holopin profile. After claiming, the badge appears on the Holopin profile and can also be [displayed in their GitHub profile](https://blog.holopin.io/posts/github-readme-tutorial).

### Best Practices

- **Be specific:** Use the appropriate badge type for the contribution
- **Timely recognition:** Issue badges soon after contributions are merged or completed
- **Consistent criteria:** Establish clear criteria for each badge type in your repository
- **Document usage:** Consider adding badge criteria to your repository's CONTRIBUTING.md or README.md

## Getting New Badges

If you need new badge types created for the AsyncAPI organization:

1. Contact **@thulieblack** or **@derberg** to request new badge designs
2. Once created, they will add the new badge to the central `holopin.yml` file in the `.github` repository
3. All repositories with the `get-global-holopin` topic will automatically receive the updated configuration

## Additional Resources

- **Holopin GitHub Integration Documentation:** [https://docs.holopin.io/integrations/github](https://docs.holopin.io/integrations/github)
- **Holopin Issuing Rewards Guide:** [https://docs.holopin.io/issuing-rewards/regular-badges](https://docs.holopin.io/issuing-rewards/regular-badges)
- **AsyncAPI `.github` Repository:** [https://github.com/asyncapi/.github/blob/master/README.md](https://github.com/asyncapi/.github/blob/master/README.md)
- **AsyncAPI Holopin Configuration:** [https://github.com/asyncapi/.github/blob/master/.github/holopin.yml](https://github.com/asyncapi/.github/blob/master/.github/holopin.yml)

## Troubleshooting

### Bot Not Responding

- Ensure you've added the `get-global-holopin` topic to your repository
- Verify the `holopin.yml` file exists in your `.github` directory (it should be automatically created)
- Verify you're a member of the Holopin organization
- Check that your GitHub account is linked to your Holopin account
- Make sure you're commenting in an Issue or Pull Request (not a discussion)

### Badge Not Issued

- Verify the sticker alias exists in the `holopin.yml` file (check the [central configuration](https://github.com/asyncapi/.github/blob/master/.github/holopin.yml))
- Check that the username is correct (include the `@` symbol)
- Ensure the bot has access to the repository
- Confirm the `get-global-holopin` topic is present on your repository

### Need Help?

If you encounter issues or need assistance:
- Contact **@thulieblack** or **@derberg** on GitHub
- Reach out in the [AsyncAPI Slack](https://asyncapi.com/slack-invite) community
- Check the [Holopin support documentation](https://docs.holopin.io)

