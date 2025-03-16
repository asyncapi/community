---
title: Code Contributor Guide
weight: 90
---
# AsyncAPI Onboarding Code Contributor Guide  

Welcome to the AsyncAPI community! We're excited to have you here. Think of AsyncAPI as a collaborative puzzle - your contributions are essential to completing it. This guide will help you get started smoothly.  

## Understanding AsyncAPI  
[AsyncAPI](https://www.asyncapi.com/en) is an open-source initiative for defining and building event-driven architectures. Our repositories house tools, specifications, and generators that make event-driven systems easier to work with. Each repo has a purpose, detailed in its `README.md`.  

## Tools You’ll Need  
- **Git and GitHub**: Your tools for collaboration. Get familiar with forking, branching, and pull requests.  
- **Code Editor**: Your tool to work with the source code of our repositories and version control. For example, VS Code, Sublime Text, JetBrains IDEs, or any other tool you prefer.
- **Node.js & NPM**: AsyncAPI relies on JavaScript/Typescript, so ensure these are installed and configured.  

## Contribution Etiquette  
1. Follow the [Code of Conduct](https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md)
2. Stick to the [Contributing guidelines](https://github.com/asyncapi/community/blob/master/CONTRIBUTING.md)
3. Document the "why" of your contribution(s). Make sure that someone who opens the code for the first time understands the changes you've made.
4. Communicate Openly through discussions on GitHub or designated Slack channel(s).

## Contribution Strategy  
AsyncAPI uses a fork model to allow contributions to the organization's repositories. In this model, you push changes to your own working copy (a fork, a so-called `origin`) of the official repository (a so-called `upstream`), and then create a pull request (PR) to incorporate changes from the `origin` to `upstream`.

### **1. Fork the Repository**  
If you haven’t already, fork the AsyncAPI repository:  
- Go to the [AsyncAPI repository](https://github.com/asyncapi/generator) you want to contribute to.  
- Click the **Fork** button (top right).  
- This creates a copy of the repository in your GitHub account.  

### **2. Clone Your Fork**  
Now, copy the repository from GitHub to your local machine:  
```bash
git clone https://github.com/your-username/generator.git
```

Replace `your-username` with your GitHub username.

Move into the project folder:

```bash
cd generator
```
### **3. Add Upstream Repository** 
Add the `upstream` repository to fetch the latest changes from the official AsyncAPI repository:  

```bash  
# Replace <upstream git repo> with the AsyncAPI repo URL  
# Example:  
#  https://github.com/asyncapi/generator.git  
#  git@github.com:asyncapi/generator.git  

git remote add upstream <upstream git repo>  
```

### Verify with:
```bash
git remote -v
```
- Example output:

```bash
origin  https://github.com/<username>/generator.git (fetch)  
origin  https://github.com/<username>/generator.git (push)  
upstream        git@github.com:asyncapi/generator.git (fetch)  
upstream        git@github.com:asyncapi/generator.git (push)  
```
### **4. Keeping Your Fork in Sync**
Before starting new work, sync your `origin` with the `upstream`:

```bash
git fetch upstream
git checkout main  # Ensure you're on the main i.e., default branch
git rebase upstream/main
git push
```
### Making Code Changes

### **1. Creating a New Branch**
Always create a new branch before making changes:

```bash
git checkout -b my-feature-branch
```
Replace `my-feature-branch` with a meaningful branch name (e.g., `fix-tests`).

### **2. Make Changes and Commit**
Now, make the necessary changes to the code or documentation. Once done:

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
git commit -m "Fix unit tests"
```

## Submitting Your First Pull Request (PR)  

Once you've made changes to your forked repository, you need to submit a **Pull Request (PR)** to propose merging your work into the official AsyncAPI repository. Follow these steps:  

### **1. Push Your Changes to Your Fork (Origin)**

Now, push your changes to your fork on GitHub:

```bash
git push origin my-feature-branch
```
This uploads your branch to your origin repository.

### **2. Create a Pull Request (PR)**

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
