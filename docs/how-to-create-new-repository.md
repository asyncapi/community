# How to create a new repository

This document is not about creating a repository on GitHub. If this is what you were looking for, then [read GitHub's guides on repository creation](https://docs.github.com/en/get-started/quickstart/create-a-repo).

This document is about creating a new repository in the [AsyncAPI Initiative GitHub organization](https://github.com/asyncapi). This guide explains what is the approval process and default repository configuration options.

This document is also helpful if you donate a project to the AsyncAPI Initiative, which involves transferring repository ownership and becoming its maintainer.

## Creating a repo for a new project

1. Visit [AsyncAPI Initiative Discussions](https://github.com/orgs/asyncapi/discussions).


2. Start a new discussion by clicking on `New discussion` and selecting the `Idea` category. Specify in the title that you want to create a new repository. In the description specify what is the purpose of the new repository, and why it should be created under the AsyncAPI organization. See also [example discussion from the past](https://github.com/orgs/asyncapi/discussions/300).


3. After starting a discussion about your new project for AsyncAPI, and successfully convinced other community members why your project ideas are necessary, and you want to maintain the codebase.


4. Additionally, when creating a proposal, specify the initial maintainers of the project and whether you want to use AsyncAPI CI/CD workflows or not, so we don't need to ask you. At least 2 code maintainers are needed to start.

5. Your proposal for a new repository must be approved by the Technical Steering Committee (TSC). Make sure that at the end of the proposal description you mention the `@asyncapi/tsc_members` GitHub team so as notify all TSC members.

6. After getting approval from the TSC, the repo is created by either Lukasz or Fran, and the `CI/CD workflow` will be pushed to the repo. Next, we invite new maintainers as repo admins. 
 To learn more, watch this [AsyncAPI `CI/CD video](https://www.youtube.com/watch?v=DsQfmlc3Ubo)

## Github Actions CI/CD in new repo
Using AsyncAPI `CI/CD` workflow saves you from a lot of work load, after including it in your Github discussion/proposal specifing that you want to use our `CI/CD` workflow, the following activities will be carried out by Lukasz or Fran.

1. Go to Asyncapi `/.github` repo.
2. Click on `Action` to view all workflows.
3. Select `Global workflow to rule then all`.
4. Click on `run workflow` and paste the name of the new repo.
5. `Run workflow`.

We have a `workflow` that takes all the workflows from `.github` and allows you to push to a specific repo selectively. One of the owners (which at the time of this writing is still Lukasz or Fran) executes these actions.

The AsyncAPI bot creates a set of `pull requests` for a given repo. You need to `merge` them as a repo's maintainer.

If you don't want to use the AsyncAPI global workflow, you will have to automate all the necessary `pull requests` that the bot would have made.

We open a `pull request` in the `.github` repo, select `global_replicator.yml` and add the newly created repo to every single `Job` from the `global_replicator.yml` file. Add as **list of repos to be ignored** in `repos_to_ignore: name-of-repo`

The previous action tells the AsyncAPI bot not constantly push `pull request` to the repo.

## Configuring the repo


## Donating a project to asyncapi
