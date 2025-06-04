---
title: Version Control
description: A guide to using version control in AsyncAPI
weight: 140
---
## Version Control

 At AsyncAPI, version control is done to keep track of what's changed, who changed it, and why. This helps maintainers, contributors, and users understand how the documentation has evolved and makes it easier for everyone to contribute.

### How Documentation Versions Work

Think of AsyncAPI documentation like a library with different editions of the same book:

* Each AsyncAPI version (like 2.0.0 or 3.0.0) gets its own documentation
* When you're reading docs, check the version number at the top to make sure it matches what you're using
* Look for the "Last Updated" date to see how current the information is

### Contributing to Documentation

Ready to help improve the docs? Here's how to get started:

#### Step 1: Choose Your Branch Name

Pick a clear name that tells others what you're working on:
* **Adding new content?** Use `docs/feature/your-topic` (like `docs/feature/kafka-tutorial`)
* **Fixing something?** Use `docs/fix/what-youre-fixing` (like `docs/fix/broken-links`)
* **General improvements?** Use `docs/your-topic` (like `docs/getting-started-clarity`)

#### Step 2: Write Clear Commit Messages

 Commit messages are like leaving notes for future contributors. Make them helpful by:
* **Describe the changes:** `docs(tutorials): add step-by-step Kafka examples`
* **Keep it short:** Aim for under 50 characters in the first line
* **Add details if needed:** Use the description area for more context
* **Link to issues in pull requests:** Add "Fixes #123" or "Related to #456" so maintainers & other can track the connection between the contribution & issue it solves

#### Step 3: Update the Changelog

Help others understand what changed by updating `CHANGELOG.md` in the following ways:
* Add the changes under the right version: `## Version X.Y.Z (2024-01-15)`
* Use clear categories: "Added," "Changed," "Fixed," "Removed"
* Include issue numbers: "Added Kafka tutorial examples (#123)"

### Understanding the Branch Setup

AsyncAPI organizes the work by using different branches (think of them as different workspaces). Here is what they are:
