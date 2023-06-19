### Automate paper work around project governance

This project aims to automate maintaining the Maintainers.yaml file which contains the list of maintainers and TSC members of AsyncAPI. The tasks involve implementing workflows to automatically update the member's list based on changes in other files, inviting new maintainers and TSC members, updating the Emeritus.yaml file when someone is removed, and aggregating helpful information in the Maintainers.yaml file. These automation and improvements will make it easier to manage the maintainers and TSC members of AsyncAPI.

The first graph outlines the steps to automate the updating of Maintainers.yaml. This involves migrating to YAML, updating the website code to handle YAML format, automating the updation of Maintainers.yaml, creating a validation workflow to block pull requests if records are added/removed by humans, creating an update-maintainers workflow, and allowing humans to update social info and TSC member property.

```mermaid
graph LR;

subgraph Migrate TSC_MEMBERS.JSON to TSC_MEMBERS.YAML
    A[Convert TSC_MEMBERS.JSON to TSC_MEMBERS.YAML]
end

subgraph Update website code to handle YAML format
    B[Update website code to handle YAML format]
end

subgraph Automate Maintainers.yaml update
    C[Automate Maintainers.yaml update]
    D[Validation workflow]
    E[update-maintainers workflow]
    F[Allow humans to update social info and TSC member property]
end

A --> B
B --> C
C --> D
C --> E
C --> F
```

The second graph outlines the steps for onboarding new maintainers. This involves creating an invitation workflow, creating a TSC member change workflow, and creating a notification workflow to inform existing members about the new addition.

```mermaid
graph LR;
    J[New Maintainer Onboarding] --> K[Create invitation workflow];
    J --> L[Create TSC member change workflow];
    K --> M[Create notification workflow];
    L --> M;
```

The third graph outlines the steps for updating the Emeritus.yaml file. This involves creating a removal workflow to remove members from the organization/team, and creating a pull request review workflow to ensure that changes are reviewed by a human before merging.

```mermaid
graph LR;
    N[Updates to Emeritus.yaml file] --> O[Create removal workflow];
    O --> P[Remove from organization/team];
    O --> Q[Create PR review workflow];
```

Overall, these subgraphs represent a comprehensive approach to maintaining and updating the YAML files related to maintainers and TSC members, ensuring that new maintainers are onboarded effectively, and keeping the Emeritus.yaml file up to date. This approach involves a range of workflows and automated processes to streamline these tasks.

### Workflows

### `validate-maintainers.yaml`

This workflow listens for changes to the Maintainers.yaml file and validates whether the changes were made by the bot or a human. If a human made the changes, the workflow blocks the pull request and notifies the user with a proper message.

> Note: This workflow should be located only in the community repository and should be made a required status check in the repository settings, so if it fails, PR cannot be merged.

```mermaid
graph LR;
A[New record added to Maintainers.yaml?] --> |Yes| B[Validate record];
B --> |Validation failed| C[Block pull request];
B --> |Validation passed| D[Continue with pull request];
A --> |No| D[Continue with pull request];

```

### `update-maintainers.yaml`

This workflow listens for changes to the CODEOWNERS file and updates the Maintainers.yaml file accordingly. It also picks up the GitHub username, Twitter handle, and the name of the maintained repository from the API and notifies the affected users.

> Note: This workflow should be located in every repository. It should be configured with permissions to update the Maintainers.yaml file in the community repository.

```mermaid
graph TD;
A[Changes made to CODEOWNERS file?] --> |New maintainer added| B[Update Maintainers.yaml];
A --> |Maintainer removed| F[Check if maintainer has other repositories];
B --> C[Pick up GitHub username, Twitter handle, and repository name from API];
C --> D[Notify affected users];
D --> E[End];
F --> |Maintainer has other repositories| G[Do not remove from Maintainers.yaml];
F --> |Maintainer has no other repositories| H[Remove from Maintainers.yaml];
H --> I[Notify affected users];
I --> E;

```

### `allow-updates.yaml`

This workflow allows humans to update social info or the tsc_member property in the Maintainers.yaml file.

> Note: This workflow should be located only in the community repository.

```mermaid
graph TD;
    A[Is the user updating social info or the tsc_member property?] --> |Yes| B[Allow update];
    B --> C[Update Maintainers.yaml];
    C --> D[Validate the updated record];
    D --> |Record is invalid| E[Block update and notify the user];
    D --> |Record is valid| F[Notify affected users of the update];
    E --> G[End];
    F --> G[End];

```

### `invite-maintainers.yaml`

This workflow is triggered when a new maintainer is added. It calls the GitHub API to invite the maintainer to the AsyncAPI organization and adds to an existing team for the maintainers. The workflow also adds the new maintainer to the Maintainers GitHub team.

> Note: This workflow should be located in the community repository.

```mermaid
graph TD;
    A[Is a new maintainer added to the AsyncAPI community?] --> |Yes| B[Call GitHub API to invite maintainer to the organization];
    B --> C[Add maintainer to an existing team for maintainers];
    C --> D[Update Maintainers.yaml];
    D --> E[Add maintainer to the Maintainers GitHub team];
    E --> F[End];
    A --> |No| F[End];

```

### `update-tsc-team.yaml`

This workflow is triggered when there is a change to the tsc_member property. It adds or removes the member from the TSC team based on the value of the property.

> Note: This workflow should be located only in the community repository.

```mermaid
graph TD;
    A[tsc_member value change?] --> |Yes| B[Add or remove member from TSC team?];
    B --> |Add| C[Add member to TSC team];
    B --> |Remove| D[Remove member from TSC team];
    C --> E[Update TSC team membership];
    D --> E[Update TSC team membership];
    E --> F[Notify affected users];
    F --> G[End];
    A --> |No| G[End];

```

### `notify-tsc-members.yaml`

This workflow is triggered when a new member is added to the TSC. It notifies the new member about ways to get notified when TSC members are called out and notifies other TSC members by mentioning the GitHub team.

> Note: This workflow should be located in the community repository.

```mermaid
graph TD;
A[PR modifies tsc_member to true?] --> |Yes| B[Notify new member about ways to get notified];
B --> C[Notify TSC members about new member];
C --> D[End];
A --> |No| D[End];
```

### `update-emeritus.yaml`

This workflow is triggered when someone is removed from the Maintainers.yaml file because they no longer maintain any repository. It updates the Emeritus.yaml file with the list of people that left the project.

> Note: This workflow should be located in the community repository.

```mermaid
graph TD;
A[Someone removed from Maintainers.yaml?] --> |Yes| B[Update Emeritus.yaml];
B --> C[End];
A --> |No| C[End];
```

### `remove-from-organization.yaml`

This workflow is triggered when someone is removed from the Maintainers.yaml file. It removes the person from the AsyncAPI organization and the proper teams.

> Note: This workflow should be located in the community repository.

```mermaid
graph TD;
A[Someone removed from Maintainers.yaml?] --> |Yes| B[Remove person from organization and teams];
B --> C[End];
A --> |No| C[End];
```

#### `review-emeritus-pr.yaml`

This workflow is triggered when a PR modifies the `Emeritus.yamlfile. It reviews and merges the PR only after it has been reviewed by a human.

> Note: This workflow should be located in the community repository.

```mermaid
graph TD;
A[PR modifies Emeritus.yaml file?] --> |Yes| B[Review and merge PR];
B --> C[End];
A --> |No| C[End];
```

#### Workflow Diagram: Interconnections between Workflows

The following charts showcases the interconnections between different workflows that collectively automate the process of maintaining and updating the Maintainers.yaml file.

First flowchart represents a process for handling changes to the CODEOWNERS file. If a new maintainer is added, the system updates the maintainers' information, allows further updates, and validates the changes. If the validation passes, the pull request is merged, and the new maintainer is invited to the TSC team. In case the validation fails, the pull request is blocked, and the user is notified of the error.

```mermaid
graph TD;
A[Changes made to CODEOWNERS file?] --> |New maintainer added| B[update-maintainers.yaml]
B --> C[allow-updates.yaml]
C --> D[validate-maintainers.yaml]
D --> |Validation passed| E[PR gets merged]
E --> F[invite-maintainers.yaml]
F --> G[notify-tsc-members.yaml]
D --> |Validation failed| H[Block pull request]
H --> I[Notify user with error message]
```

Second flowchart manages the removal of a maintainer from the CODEOWNERS file. It updates the maintainers' information, validates the changes, and either blocks or merges the pull request accordingly. If the pull request is merged, the TSC team is updated and notified. If the removed maintainer no longer maintains any repository, they are added to the Emeritus list and removed from the organization and relevant teams.

```mermaid
graph TD;
A[Changes made to CODEOWNERS file?] --> |Maintainer removed| H[update-maintainers.yaml]
H --> I[allow-updates.yaml]
I --> J[validate-maintainers.yaml]
J --> |Validation failed| K[Block pull request]
J --> |Validation passed| L[PR gets merged]
L --> M[update-tsc-team.yaml]
M --> N[notify-tsc-members.yaml]
N --> O[update-emeritus.yaml]
O --> P[remove-from-organization.yaml]
```
