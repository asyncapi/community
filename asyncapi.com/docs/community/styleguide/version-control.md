# Version Control

## Importance of Version Control in Documentation

Version control is crucial in documentation for several reasons:

1. **Tracking Changes:** It allows us to track changes made to the documentation over time. This helps in understanding the evolution of the document and identifying when key decisions were made.
2. **Collaboration:** Multiple contributors can work on the documentation simultaneously without overwriting each other's changes. This is essential for a collaborative project like AsyncAPI.
3. **Reverting Changes:** If a mistake is made, version control allows us to revert to a previous version of the document. This ensures that errors can be quickly corrected without losing valuable work.
4. **Accountability:** Version control provides a history of who made what changes and when. This accountability is important for maintaining the integrity of the documentation.

## Guidelines for Version Control

### 1. Use Git for Version Control

AsyncAPI documentation uses Git for version control. Git is a distributed version control system that allows multiple contributors to work on the documentation simultaneously.

### 2. Branching Strategy

- **Main Branch:** The `main` branch contains the latest stable version of the documentation. All changes must be merged into the `main` branch through pull requests.
- **Feature Branches:** For each new feature or significant change, create a new branch from the `main` branch. Name the branch descriptively, such as `feature/add-new-section` or `bugfix/fix-typo`.

### 3. Commit Messages

- **Descriptive Messages:** Write clear and descriptive commit messages. A good commit message explains what changes were made and why.
- **Conventional Commits:** Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages. This helps in maintaining a consistent commit history.

### 4. Pull Requests

- **Review Process:** All changes must be submitted through pull requests. Each pull request should be reviewed by at least one other contributor before being merged into the `main` branch.
- **Linked Issues:** If the pull request addresses an issue, link the pull request to the issue. This helps in tracking the progress of the work.

### 5. Documentation Updates

- **Changelog:** Maintain a changelog to document significant changes to the documentation. This helps in keeping track of the evolution of the documentation.
- **Version Tags:** Tag releases of the documentation with version numbers. This helps in identifying specific versions of the documentation.

## Examples of Version Control Practices

### Example 1: Creating a Feature Branch

```bash
git checkout -b feature/add-new-section
```

### Example 2: Writing a Commit Message

```bash
git commit -m "feat: add new section on version control"
```

### Example 3: Creating a Pull Request

1. Push the feature branch to the remote repository:
   ```bash
   git push origin feature/add-new-section
   ```
2. Create a pull request on GitHub and request a review from another contributor.

### Example 4: Tagging a Release

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```
