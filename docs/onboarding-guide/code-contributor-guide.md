# AsyncAPI Onboarding Code Contributor Guide  

Welcome to the AsyncAPI community! We’re excited to have you here. Think of AsyncAPI as a collaborative puzzle—your contributions are essential to completing it. This guide will help you get started smoothly.  

---

## Understanding AsyncAPI  
[AsyncAPI](https://www.asyncapi.com/en) is an open-source initiative for defining and building event-driven architectures. Our repositories house tools, specifications, and generators that make event-driven systems easier to work with. Each repo has a purpose, detailed in its `README.md`.  

---

## Tools You’ll Need  
- **Git and GitHub**: Your tools for collaboration. Get familiar with forking, branching, and pull requests.  
- **Code Editor**: Your favourite IDEs like VS Code.  
- **Node.js & NPM**: AsyncAPI relies on JavaScript, so ensure these are installed and configured.  

---

## Starting Small  
- Look for `good first issue` or `help wanted` labels in the repository. These are beginner-friendly issues to get you started.  
- Join our [Slack workspace](https://t.co/YbJQ4ghX7Q) for help and to connect with the community.  

---

## Contribution Etiquette  
1. Follow the [Code of Conduct](https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md)
2. Stick to the [Contributing guidelines](https://github.com/asyncapi/community/blob/master/CONTRIBUTING.md)
3. Document Everything  
4. Communicate Openly

---

## Branch Strategy  
AsyncAPI uses a "Fork and Pull" workflow. In Git terms:  
- Your **fork** is the `origin`.  
- The official AsyncAPI repository is the `upstream`.  

### Adding Upstream  
Add the `upstream` repository and prevent pushing directly to it:  

```bash  
# Replace <upstream git repo> with the AsyncAPI repo URL  
# Example:  
#  https://github.com/asyncapi/generator.git  
#  git@github.com:asyncapi/generator.git  

git remote add upstream <upstream git repo>  
git remote set-url --push upstream no_push  
```

### Verify with:
```bash
git remote -v
```

### Keeping Your Fork in Sync
Before starting new work, sync your fork with the upstream:

```bash
git fetch upstream
git checkout master  # Use 'main' if that's the default branch
git rebase upstream/master
git push
```

### Starting a New Branch
Create a feature branch for your contribution:

```bash
git checkout -b myfeature
```

## Submitting Your First Pull Request
- Fork and Clone: Fork the repository and clone it locally.
- Branch Off: Create a new branch for your work.
- Commit Changes: Write clear and concise commit messages.
- Push and PR: Push your branch and open a pull request.

Every contribution matters, no matter how small. Dive in and let’s build something amazing together!
