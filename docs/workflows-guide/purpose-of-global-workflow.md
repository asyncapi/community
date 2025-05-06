---
title: 'Purpose of Global Workflows'
weight: 50
---

Global workflows are foundational to automation at AsyncAPI. They are designed to help streamline managing of projects by ensuring consistency across all repository within the organization. As the number of repositories grows, maintaining consistency, enforcing best practices, and scaling automation becomes more challenging. Global workflows address this by centralizing common workflow automations in the `.github` repository, and making them available for reusability and ease of maintainability. 

The primary purpose is to eliminate the need for every repository to implement its own version of routine workflows, such as syncing key documentation(i.e. `Code of Conduct & Contributing Guide`), bumping dependencies versions, or running security checks. By offloading these tasks to a shared set of workflows, maintainers can focus their time and energy on making actual contribution to the project instead of rebuilding what already exists elsewhere. 

Additionally, Global workflows also offer a single point of control for updates and improvements. When organizational standards evolve, such as adopting new security measures or tooling, those changes can be applied in one place and automatically reflected across all consuming repositories. This ensures faster rollout of critical updates and reduces the operational burden on individual maintainers.

## Workflow Update Use Case: Securing External GitHub Actions

A recent security scenario illustrates the importance of this centralization. Consider the use of versions in the case of actions that are not coming from Github, technically when using external actions to do things such as create a Pull request you'd do something similar to the following:

```
- name: Create Pull Request
uses: peter-evans/create-pull-request@v5
```

So basically `peter-evans/create-pull-request@v5` is an external action being used to create Pull Request. While convenient, referencing external actions by version tags (like `@v5`) introduces a security risk: a malicious actor could publish a new commit to that version, injecting harmful code capable of accessing CI/CD secrets in both public and private workflows.

To avoid this, the recommended approach is to use the specific commit `SHA` of the action:

```
- name: Create Pull Request
uses: peter-evans/create-pull-request@4e1beaa7521e8b457b572c090b25bd3db56bf1c5
```

However, if each repository were implementing its own copy of a workflow that uses this action, a simple security patch like updating the action SHA would require changes in every repository which is an error-prone and time-consuming process. With global workflows, this update can be made once and instantly applied across all consuming projects. This significantly improves response time and ensures all projects stay aligned with best practices.

In essence, global workflows are key to sustainable, secure, and scalable project management at AsyncAPI. They promote maintainability, reduce duplication, and accelerate onboarding.