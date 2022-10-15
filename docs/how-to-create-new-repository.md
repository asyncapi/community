# Create new AsyncAPI repository
This guide explains the _approval process_ and the _default repository configurations_ required for creating a new repository in the [AsyncAPI Initiative GitHub organization](https://github.com/asyncapi). We also cover how to _donate a project_ to the AsyncAPI Initiative by transferring repository ownership and becoming its maintainer. 

Let's create a new AsyncAPI repository:
1. Visit [AsyncAPI Initiative Discussions](https://github.com/orgs/asyncapi/discussions).
2. Create a new discussion by clicking on `New discussion` and selecting the `Idea` category. Specify in the _title_ that you want to create a new repository. In the _description_, specify the new repository's purpose and why it belongs under the AsyncAPI organization. [Sample new discussion example.](https://github.com/orgs/asyncapi/discussions/300).
3. Start a discussion with community members to initialize a new project for AsyncAPI, discuss the project ideas, specify if you want to use AsyncAPI CI/CD workflows, and volunteer to become a maintainer for that project. (At least 2 code maintainers are needed to start.)
To learn more about asyncapi `CI/CD`, watch this [video](https://www.youtube.com/watch?v=DsQfmlc3Ubo)
4. The Technical Steering Committee (TSC) must approve the newly proposed repository. Make sure to tag them by adding `@asyncapi/tsc_members` at the end of the proposal description; this notifies all TSC members to vote on the proposed project.
5. If the TSC approves the new repository, then either `@derberg` or `@fmvilas` will take over creating the actual new repository. Next, they'll run AsyncAPI `CI/CD workflows`. 
6. Invite new maintainers as repo admins.

## GitHub Actions: CI/CD workflow
Here are the steps `@derberg` or `@fmvilas` take when running AsyncAPI `CI/CD` workflows:
1. Go to Asyncapi `/.github` repo.
2. Click `Action` to view all workflows.
3. Select `Global workflow to rule them all`.
4. Click `run workflow` and paste the name of the new repo. Running the workflow takes all the workflows from the AsyncAPI `.github` repo and runs those on the specified repo.

The AsyncAPI bot creates a set of `pull requests` for a given repo. You need to `merge` them as a repo's maintainer.

<Remember>
 Manage project automation independently if you don't want to use the AsyncAPI global workflow.
</Remember>
<Remember>
Repos that shouldn't get CI/CD updates must do the following:
Open a `pull request` in the `.github` repo. 
Edit the`global_replicator.yml` in the `.github` repo; add the newly created repo to every `Job` under **repos to ignore**. (Example: `repos_to_ignore: your-repo-name`) 
</Remember>

## Configure repository
All AsyncAPI repositories should be similar in structure, settings, and restrictions. 

## Adjust repository options
1. Under your repository name, click the **Settings** tab. 
2. Scroll down to the **Features** section and disable these options:
    - Wikis
    - Projects
    - Discussions
You can always enable **Discussions** as an admin when you want.

3. Ensure the **Sponsorships** option is enabled.

3. Go to the **Merge button** section and _disable_ the following:
    - Allow merge commits
    - Allow rebase merging

4. Stay on the **Merge button** section and _enable_ the following: 
**Allow squash merging** option. This option combines all commits before merging changes into the `master` branch.

5. Make sure the **Automatically delete head branches** option is enabled.

## SonarCloud scans
Integrate each AsyncAPI repository with `https://sonarcloud.io/organizations/asyncapi/projects` for automated quality and security scans. 

Add your project to the list via: `https://sonarcloud.io/projects/create`.

<Remember>
Our `CI/CD workflows` fail if your repository has a `main branch` because we currently support only `master branch` in our projects.

Should you accidentally forget and create a repository with a `main branch`, remember to rename it to `master branch`. 
</Remember>
 
## Branch protection rules
Branch protection must be added by whoever creates the repository. 

Let's walk through the steps:
1. Under the **Setting** tab, click `branches`.
2. Change the branch name to `master`.
3. **Enable** all of the following settings under **Protect matching branch**:
- `Require a pull request before merging`
- `Request approvals`
- `Dismiss stale pull request approvals when new commits are pushed`
- `Require review from Code Owners`
- `Restrict who can dismiss pull request reviews` _(admin only)_
- `Require status check before merging` _(This status check runs Github action workflows before merging pull requests.)_
- `Require branch to be up to date before merging`
- `Do not allow bypassing the above settings`
- `Restrict who can push to matching branches`
- `Restrict pushes that create matching branches`

## Collaborators and teams
The AsyncAPI Initiative grants admin roles to project maintainers.

<Remember>
Don't forget to add the `[bots](https://github.com/orgs/asyncapi/teams/bots)` team as a maintainer to each project.
</Remember>

## Codeowners file
The Codeowners file contains the code owners' names; this includes both the admins and the `asyncapi-bot-eve`.

Checkout the following [`Codeowners file` example from the `/website` repository](https://github.com/asyncapi/website/blob/master/CODEOWNERS):
```
# This file provides an overview of code owners in this repository.
	 
# Each line is a file pattern followed by one or more owners.
# The last matching pattern has the most precedence.
# For more details, read the following article on GitHub: https://help.github.com/articles/about-codeowners/.
	 
# The default owners are automatically added as reviewers when you open a pull request unless different owners are specified in the file.
* @fmvilas @derberg @mcturco @akshatnema @magicmatatjahu @asyncapi-bot-eve
	 
# All .md files
*.md @alequetzalli @asyncapi-bot-eve
	 
README.md @alequetzalli @fmvilas @derberg @mcturco @akshatnema @magicmatatjahu @asyncapi-bot-eve
```

## Donate project to AsyncAPI
To donate a project to AsyncAPI, copy the repository settings in the following [sample donated RabbitMQ template for .NET](https://github.com/mr-nuno/dotnet-rabbitmq-template).
