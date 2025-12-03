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

### Create a Holopin Account

- Visit [holopin.io](https://holopin.io) and create an account
- Complete your profile setup

### Join the Holopin Organization

Repository maintainers must be members of the AsyncAPI Holopin organization to issue badges.

**To get added to the organization:**
- Open a Holopin account
- Contact one of the following administrators to request access:
  Ask them to add you to the AsyncAPI Holopin organization so you can start issuing badges.
  
  - **@thulieblack** (GitHub)
  - **@derberg** (GitHub)


### Link GitHub Account

- Go to your [Holopin Account Settings](https://holopin.io/account)
- Link your Holopin account to your GitHub profile
- This enables the `@holopin-bot` to work in your repositories

## Setting Up the Badge Workflow

### Add the Repository Topic

To enable Holopin badges in your repository, you don't need to create a `holopin.yml` file manually. Simply add the `get-global-holopin` topic to your repository, and the configuration file will be automatically replicated from the [AsyncAPI `.github` repository](https://github.com/asyncapi/.github).

**Steps to add the topic:**

1. Navigate to your repository on GitHub
2. Click on the gear icon (⚙️) next to the "About" section, or click on the topics area
3. In the topics field, add `get-global-holopin`
4. Press Enter or click outside the field to save

The `holopin.yml` file will be automatically created in your repository's `.github` directory with all the necessary configuration.

> **Note:** For more information about this automation, see the [AsyncAPI `.github` repository README](https://github.com/asyncapi/.github/blob/master/README.md).

### Understanding the Configuration

The automatically replicated `holopin.yml` file contains:

- **Organization:** `asyncapi` (the Holopin organization name)
- **Default sticker:** The default badge that will be issued if no alias is specified
- **Available stickers:** A list of all badge types with their IDs and aliases

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

Once you've added the `get-global-holopin` topic to your repository and the `holopin.yml` file has been automatically created, you can issue badges to contributors.

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

