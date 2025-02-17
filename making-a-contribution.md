# Contributor - Simple Contribution Flow
This article covers how to make a contribution on AsyncAPI. It walks you through the basic contribution flow and workflow processes you need to setup in order to make a contribution.

## Contents
- [Contributor - Simple Contribution Flow](#contributor---simple-contribution-flow)
  - [Contents](#contents)
  - [Making a contribution](#making-a-contribution)
  - [Setting up a workflow](#setting-up-a-workflow)
    - [Setting up the `master` branch](#setting-up-the-master-branch)
    - [Setting up a new branch](#setting-up-a-new-branch)
  - [Making a pull request](#making-a-pull-request)
  - [Making further commits](#making-further-commits)
  - [Additional Information](#additional-information)

## Making a contribution
You are welcome to making a contribution at AsyncAPI. We would love to get your suggestions, improvements, and ideas. You are encouraged to make quality contributions either by making a PR(Pull Request) for an already existing issue or creating an issue. To make a successful contribution, you are required to work on a forked repository and create a branch on the forked repository where you can make your changes(do not work directly on the `master` branch).

## Setting up a workflow
### Setting up the `master` branch 
- Fork the repository by clicking on the fork icon  
- Clone the forked repo in your local terminal
```git clone <the link you copied>```
- Run ```git remote -v```. This will list the URLs of the remote repository for your fork.
The result is as follows:
    ```
    origin  https://github.com/{your-username}/{your-fork}.git (fetch)
    origin  https://github.com/{your-username}/{your-fork}.git (push)
    ```

    See the example:
    ```
    origin	https://github.com/i000000/asyncapi.git (fetch)
    origin	https://github.com/i000000/asyncapi.git (push)
    ```
- Run ```git remote add upstream https://github.com/{original-owner}/{original-repository}.git```
  - This adds a new remote named `upstream` to your local repository. 
  - The `upstream` name refers to the original repository while `origin` refers to the forked repository.
  - The `https://github.com/{original-owner}/{original-repository}.git` refers to the URL of the main repo.
   
    See the example: ```git remote add upstream https://github.com/asyncapi/asyncapi.git```

- Run ```git fetch upstream master``` to download the latest changes from the master branch of the upstream remote (the original repository you forked from).
- Set up the local branch to track the remote branch from the upstream repo: ```git branch -u upstream/master master```
- Run ```git branch -vv``` to verify that your local `master` branch points to the `upstream/master` branch.
The result is similar to the following:
```
* master           c2226e0 [upstream/master] Update the README.md document
```

### Setting up a new branch
Before you begin to make changes, create a new branch 
- Run `git checkout -b <branchname>` 

## Making a pull request 
After making contributions and you are set to make a PR.

- Run `git add <file name>` if you created a new file as part of your changes and commit with a meaningful message. `git commit -m "Meaningful commit message"`. Else, commit your changes with `git commit -am "Meaningful commit message"`.
- Push the changes
  
```
git push --set-upstream origin <branchname>
```
- Make a pull request and wait for the maintainers to review.

## Making further commits
Normally, when a maintainer requests changes on your PR, there may have been previous commits from other contributors on that repository. Before you begin to add those changes, make sure you sync your branches (both the master and custom branch you are using).
After doing that, in your local machine terminal run `git pull` to download and merge the changes to your local machine then you can start making the changes.

To make further commits on that same repository and branch.
Simply run,
- `git add <filename>` and `git commit -m "Meaningful commit message"` (if you created a new file).
- But if you are making modifications, run `git commit -am "Meaningful commit message"`.
- Run `git push` to push your changes.

## Additional Information
- [Git workflow document](https://github.com/asyncapi/community/blob/master/git-workflow.md)
- [Conventional commit messages](https://github.com/asyncapi/website/blob/master/CONTRIBUTING.md)
