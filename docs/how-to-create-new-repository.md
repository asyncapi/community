# How to create a new repository

This document is not about creating a repository on GitHub. If this is what you were looking for, then [read GitHub's guides on repository creation](https://docs.github.com/en/get-started/quickstart/create-a-repo).

This document is about creating a new repository in the [AsyncAPI Initiative GitHub organization](https://github.com/asyncapi). This guide explains what is the approval process and default repository configuration options.

This document is also helpful if you donate a project to the AsyncAPI Initiative, which involves transferring repository ownership and becoming its maintainer.

## Creating a repo for a new project

1. Visit [AsyncAPI Initiative Discussions](https://github.com/orgs/asyncapi/discussions).


2. Start a new discussion by clicking on `New discussion` and selecting the `Idea` category. Specify in the title that you want to create a new repository. In the description specify what is the purpose of the new repository, and why it should be created under the AsyncAPI organization. See also [example discussion from the past](https://github.com/orgs/asyncapi/discussions/300).


<<<<<<< HEAD
3. Start a conversaction with community members to initialize a new project for AsyncAPI, discuss the project ideas and indicate that you want to be a maintainer of the codebase and at least 2 code maintainers are needed to start


4. Specify if you want to use asyncapi CI/CD workflows or not during your discussion about the project, so we don't get to ask you.
To know more about asyncapi `CI/CD` watch this [video](https://www.youtube.com/watch?v=DsQfmlc3Ubo)

5. Your proposal for a new repository must be approved by Technical Steering Committee (TSC). So make sure that at the end of proposal description you mention `@asyncapi/tsc_members` GitHub team to notify all TSC members about voting

6. After getting approval from the TSC, Repo is created by @derberg or @fmvilas, and the `CI/CD workflow` will be push to the Repo. Next, we invite new maintainers as admins of the repo. 


## Github Actions CI/CD in new Repo
Using asyncapi `CI/CD` workflow saves you from a lot of work load, after including it in your Github discussion/proposal specifing that you want to use our `CI/CD` workflow, the following activities will be carried out by @derberg or @fmvilas.
=======
3. After starting a discussion about your new project for AsyncAPI and successfully convinced other community members why your project ideas are necessary, and you want to maintain the codebase.


4. Additionally, when creating a proposal, specify the initial maintainers of the project and whether you want to use AsyncAPI CI/CD workflows or not, so we don't need to ask you. At least 2 code maintainers are needed to start.

5. Your proposal for a new repository must be approved by the Technical Steering Committee (TSC). Make sure that at the end of the proposal description you mention the `@asyncapi/tsc_members` GitHub team so as notify all TSC members.

6. After getting approval from the TSC, the repo is created by either @derberg or @fmvilas. They:
   - Configure the repo setting
   - Push the AsyncaPI `CI/CD workflow`
   - Invite new maintainers as repo admins.
To learn more, watch this [AsyncAPI CI/CD video](https://www.youtube.com/watch?v=DsQfmlc3Ubo)

## Github Actions CI/CD in new repo
Using AsyncAPI `CI/CD` workflow saves you from a lot of work load, after including it in your Github discussion/proposal specifing that you want to use our `CI/CD` workflow, the following activities will be carried out by Lukasz or Fran.
>>>>>>> 22ae8aab2424449ba00fcc49460006e6ffb53389

1. Go to Asyncapi `/.github` repo.
2. Click on `Action` to view all workflows.
3. Select `Global workflow to rule then all`.
4. Click on `run workflow` and paste the name of the new repo.
5. `Run workflow`.

<<<<<<< HEAD
One `worklfow` that basically takes all the workflows from `.github` and can selectively be push to a specific repo.
=======
We have a `workflow` that takes all the workflows from `.github` and allows you to push to a specific repo selectively. One of the owners (which at the time of this writing is still Lukasz or Fran) executes these actions.
>>>>>>> 22ae8aab2424449ba00fcc49460006e6ffb53389

The AsyncAPI bot creates a set of `pull requests` for a given repo. You need to `merge` them as a repo's maintainer.

If you don't want to use the AsyncAPI global workflow, you will have to manage project automation independently.

<<<<<<< HEAD
what user have to do, to make sure their repo never gets CI/CD updates
A `pull request` is open in `.github` repo, `global_replicator.yml` is selected and the newly created repo is added to every single `Job` from the `global_replicator.yml` file. Add as **list of repo to be ignore** in `repos_to_ignore: name-of-repo`
=======
We open a `pull request` in the `.github` repo, select `global_replicator.yml` and add the newly created repo to every single `Job` from the `global_replicator.yml` file. Add as **list of repos to be ignored** in `repos_to_ignore: name-of-repo`
>>>>>>> 22ae8aab2424449ba00fcc49460006e6ffb53389

The previous action tells the AsyncAPI bot not constantly push `pull request` to the repo.

## Configuring the repository
All repositories in `asyncapi` organizations should be similar in structure, settings, and restrictions. Follow these guidelines to adjust settings of a new repository created in one of these organizations.

## Adjust repository options

Under the repository name, choose the **Settings** tab. Carry out the following actions:

1. Scroll down to the **Features** section and disable these options:
    - Wikis
    - Projects
    - Discussions
As an admin you can always enable **Discussions** when you want.

Make sure **Sponsorships** option is enable and `open_collective: asyncapi` is provided.

2. Go to the **Merge button** section and disable these options:
    - Allow merge commits
    - Allow rebase merging

enable only the **Allow squash merging** option. This option combines all commits into one before merging the changes into the `master` branch.

3. Make sure option **Automatically delete head branches** is enable

## SonarCloud scans

Each repository must be integrated with https://sonarcloud.io/organizations/asyncapi/projects for automated quality and security scans.
If your project is not in the list, please add it via https://sonarcloud.io/projects/create.

Our **CI/CD** is very important so, if you create a repository named `main branch` you have to rename it to `master branch`. 
In all our project we name the `master branch` as the `main branch`.

## Branch protection rules
Branch protection is be added by whoever creates the repository, here are the steps:

- Under the **Setting** tab, click `branches`
- After that you can edith the branch name to `master` while adding branch protection

Under the **Protect matching branch** you will enable the following:

- enable `Require a pull request before merging`
- enable `Request approvals`
- enable `Dismiss stale pull request approvals when new commits are push`
- enable `Require review from Code Owners`
- enable `Restrict who can dismiss pull request reviews` this is done only by admin
- enable `Require status check before merging` at this point you have to set your status check for Github action to check before merging pull request.
- enable `Require branch to be up to date before merging`
- enable `Do not allow bypassing the above settings`
- enable `Restrict who can push to matching branches`
- enable `Restrict pushes that create matching branches`

This setting is required to done by who create the repository.

## Collaborators and teams
This is the point where you give admin role to individual that will be the maintainer of the project.

You have to invite the `bot` as a maintainer, it is very important you do.

## Codeowners file
This file contains name of the two code owners which are also the admin and also the asyncapi-bot-eve is also added.

Here is an example to `mcturo` and `magicmatatjahu` requesting to create a [`Design-system`](https://github.com/asyncapi/community/discussions/265) repository and [`An interface/project for describing errors/problems in tools in our organization`](https://github.com/asyncapi/community/discussions/300) repository

## Donating a project to asyncapi
 For donating a project to asyncapi you can click [here](https://github.com/asyncapi/community/discussions/223) for an example.

 same repository setting is applicable to donated project.