---
title: 'Introduction to the .github repository'
weight: 60
---

With over `90%` of all available workflows in all repositories across the organization being considered as global workflows, managing them will be a nightmare without proper centralization of these workflows.

Github has many special repositories. For example, you can create a repository that matches your username, add a README file to it, and all the information in that file will be visible on your Github profile. 

The `.github` repository is one of the many special repository available on Github. It serves as the central hub for reusable Github configurations that can be automatically inherited by other repositories within the org, especially repositories without existing of pre-defined `.github` directory which can they act as a fallback for such repositories. 

The AsyncAPI [.github](https://github.com/asyncapi/.github) repository serves as the central source for all reusable community health files and global workflow automation. It includes shared GitHub Actions, issue and pull request templates, and metadata for the entire organization. For instance, the profile description you see when visiting [github.com/asyncapi](https://github.com/asyncapi) is powered by the `/profile/README.md` file within this repository.

## Key Function of the `.github` Repository

The `.github` repository lies at the heart of our global workflow strategy. It plays a vital role in ensuring consistency, automation, and maintainability across all AsyncAPI repositories. Below are its primary functions:

| Function                        | Desctiption            |
| ------------------------------- | ---------------------- |
| Shared Github Actions Workflows | Hosts reusable workflows that can be referenced by other repositories using, enabling centralized automation and reducing duplication. This is the foundation of AsyncAPI’s global workflows.                                  |
| Default Community Health Files  | Provides default files such as `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `ISSUE_TEMPLATE/`, and more. These are automatically applied to any repository in the organization that doesn't define its own versions.               |
| Org-wide Metadata               | Stores files like `/profile/README.md` to define the org-wide profile page, and `FUNDING.yml` to manage sponsorship links. This centralizes important metadata and presents a unified organizational identity.                 |
| Centralized Maintainance        | Updates to workflows, templates, or documentation only need to be made once in this repository. All consuming repositories automatically reflect the changes, simplifying maintenance and ensuring uniformity across projects. |
