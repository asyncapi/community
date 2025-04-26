---
title: Code Contributor Guide
description: A guide for new contributors looking to contribute code to the AsyncAPI project.
weight: 90
---
# AsyncAPI Onboarding Code Contributor Guide  

Welcome to the AsyncAPI community! We're excited to have you here. Think of AsyncAPI as a collaborative puzzle - your contributions are essential to completing it. This guide will help you get started smoothly.  

## Understanding AsyncAPI  
[AsyncAPI](https://www.asyncapi.com/en) is an open-source initiative for defining and building event-driven architectures. Our repositories house tools, specifications, and generators that make event-driven systems easier to work with. Each repo has a purpose, detailed in its `README.md`.  

## Tools You’ll Need  
- Git and GitHub: Your tools for collaboration. Get familiar with forking, branching, and pull requests.  
- Code Editor: Your tool to work with the source code of our repositories and version control. For example, VS Code, Sublime Text, JetBrains IDEs, or any other tool you prefer.
- Node.js & npm: AsyncAPI relies on JavaScript/TypeScript, so ensure these are installed and configured.  

## Contribution Etiquette  
1. Follow the [Code of Conduct](https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md)
2. Stick to the [Contributing guidelines](https://github.com/asyncapi/community/blob/master/CONTRIBUTING.md)
3. Document the "why" of your contribution(s). Make sure that someone who opens the code for the first time understands the changes you've made.
4. Communicate openly through discussions on GitHub or designated Slack channels.

### Making Code Changes

AsyncAPI uses a fork model to allow contributions to the organization's repositories. In this model, you push changes to your own working copy (a fork, a so-called `origin`) of the official repository (a so-called `upstream`), and then create a pull request (PR) to incorporate changes from the `origin` to `upstream`. For detailed steps, refer to our [Git Workflow Guide](https://github.com/asyncapi/community/blob/master/git-workflow.md).

### 1. Creating a New Branch
Always create a new branch before making changes:

```bash
git checkout -b my-feature-branch
```
Replace `my-feature-branch` with a meaningful branch name (e.g., `fix-tests`).

### 2. Make Changes
Now, make the changes to the code or documentation as required.

### 3. Commit Your Changes

Check what files you modified:
```bash
git status
```
Stage the changes:
```bash
git add .
```
Commit your changes with a meaningful message:
```bash
git commit -m "fix: update unit tests"
```

### 4. Push Your Changes
Push the changes to your forked repository on GitHub:

```bash
git push origin my-feature-branch
```

## Submitting Your First Pull Request (PR)  

Once you've pushed your changes, you need to create a Pull Request (PR) to propose merging your work into the official AsyncAPI repository. Make sure to use the [conventional commit style](https://github.com/asyncapi/.github/blob/master/CONTRIBUTING.md#conventional-commits) while creating PRs. Next, follow these steps:  

### Create a Pull Request (PR)

Now, go to your forked repository on GitHub (ex.- `https://github.com/your-username/generator`):

1. You’ll see a notification about your recently pushed branch. Click the "Compare & pull request" button.
2. Make sure the base repository is `asyncapi/generator` (upstream) and the head repository is your fork (`your-username/generator`).
3. Add a clear title and description explaining your changes.
4. Click "Create pull request" to submit your PR for review.

That's it! You've successfully submitted your first Pull Request. 

### Wait for Review & Merge
- The maintainers will review your PR.
- If needed, respond to their comments and make changes.
- Once approved, your PR will be merged into the official AsyncAPI repository! 

Every contribution matters, no matter how small. Dive in and let’s build something amazing together!
