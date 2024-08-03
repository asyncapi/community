# Maintainers

The ["Update MAINTAINERS.yaml file"](../../workflows/update-maintainers.yaml) workflow, defined in the `community` repository performs a complete refresh by fetching all public repositories under AsyncAPI and their respective `CODEOWNERS` files.

## Workflow Execution

The "Update MAINTAINERS.yaml file" workflow is executed in the following scenarios:

1. **Weekly Schedule**: The workflow runs automatically every week. It is useful, e.g. when some repositories are archived, renamed, or when a GitHub user account is removed.
2. **On Change**: When a `CODEOWNERS` file is changed in any repository under the AsyncAPI organization, the related repository triggers the workflow by emitting the `trigger-maintainers-update` event.
3. **Manual Trigger**: Users can manually trigger the workflow as needed.

### Workflow Steps

1. **Load Cache**: Attempt to read previously cached data from `github.api.cache.json` to optimize API calls.
2. **List All Repositories**: Retrieve a list of all public repositories under the AsyncAPI organization, skipping any repositories specified in the `IGNORED_REPOSITORIES` environment variable.
3. **Fetch `CODEOWNERS` Files**: For each repository:
   - Detect the default branch (e.g., `main`, `master`, or a custom branch).
   - Check for `CODEOWNERS` files in all valid locations as specified in the [GitHub documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#codeowners-file-location).
4. **Process `CODEOWNERS` Files**:
   1. Extract GitHub usernames from each `CODEOWNERS` file, excluding emails, team names, and users specified by the `IGNORED_USERS` environment variable.
   2. Retrieve profile information for each unique GitHub username.
   3. Collect a fresh list of repositories currently owned by each GitHub user.
5. **Refresh Maintainers List**: Iterate through the existing maintainers list:
   - Delete the entry if it:
     - Refers to a deleted GitHub account.
     - Was not found in any `CODEOWNERS` file across all repositories in the AsyncAPI organization.
   - Otherwise, update **only** the `repos` property.
6. **Add New Maintainers**: Append any new maintainers not present in the previous list.
7. **Changes Summary**: Provide details on why a maintainer was removed or changed directly on the GitHub Action [summary page](https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/).
8. **Save Cache**: Save retrieved data in `github.api.cache.json`.

## Job Details

- **Concurrency**: Ensures the workflow does not run multiple times concurrently to avoid conflicts.
- **Wait for PRs to be Merged**: The workflow waits for pending pull requests to be merged before execution. If the merged pull request addresses all necessary fixes, it prevents unnecessary executions.

## Handling Conflicts

Since the job performs a full refresh each time, resolving conflicts is straightforward:

1. Close the pull request with conflicts.
2. Navigate to the "Update MAINTAINERS.yaml file" workflow.
3. Trigger it manually by clicking "Run workflow".

## Caching Mechanism

Each execution of this action performs a full refresh through the following API calls:

```
ListRepos(AsyncAPI)                   # 1 call using GraphQL - not cached.
   for each Repo
       GetCodeownersFile(Repo)        # N calls using REST API - all are cached. N refers to the number of public repositories under AsyncAPI.
          for each codeowner
             GetGitHubProfile(owner)  # Y calls using REST API - all are cached. Y refers to unique GitHub users found across all CODEOWNERS files.
```

To avoid hitting the GitHub API rate limits, [conditional requests](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api?apiVersion=2022-11-28#use-conditional-requests-if-appropriate) are used via `if-modified-since`. The API responses are saved into a `github.api.cache.json` file, which is later uploaded as a GitHub action cache item.
