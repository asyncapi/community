### Automate paper work around project governance

This project aims to automate maintaining the Maintainers.yaml file which contains the list of maintainers and TSC members of AsyncAPI. The tasks involve implementing workflows to automatically update the member's list based on changes in other files, inviting new maintainers and TSC members, updating the Emeritus.yaml file when someone is removed, and aggregating helpful information in the Maintainers.yaml file. These automation and improvements will make it easier to manage the maintainers and TSC members of AsyncAPI.

The first graph outlines the steps to automate the updating of Maintainers.yaml. This involves migrating to YAML, updating the website code to handle YAML format, automating the updation of Maintainers.yaml, creating a validation workflow to block pull requests if records are added/removed by humans, creating an update-maintainers workflow, and allowing humans to update social info and TSC member property.

```mermaid
graph TD;

subgraph Migrate TSC_MEMBERS.JSON to MAINTAINERS.yml
    A[Convert TSC_MEMBERS.JSON to MAINTAINERS.yml]
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
graph TD;
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

The validation passes if:

- The changes are made by the approved bot account.

> Note: This workflow should be located only in the community repository and should be made a required status check in the repository settings, so if it fails, PR cannot be merged.

```mermaid
graph TD;
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
F --> |Maintainer has other repositories| G[Remove the given repository from the list of repositories the maintainer maintains];
G --> H[Update Maintainers.yaml];
F --> |Maintainer has no other repositories| I[Remove maintainer from Maintainers.yaml];
H --> J[Notify affected users];
I --> J;
J --> E;


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
    A --> |No| G[Is a maintainer removed from the AsyncAPI community?];
    G --> |Yes| H[Call GitHub API to remove maintainer from the organization];
    H --> I[Remove maintainer from the existing team for maintainers];
    I --> J[Update Maintainers.yaml];
    J --> K[Remove maintainer from the Maintainers GitHub team];
    K --> F[End];
    G --> |No| F[End];


```

### `tsc-and-maintainers-update.yaml`

This workflow manages changes to the TSC team and the Maintainers list of a project. The workflow is triggered when there is a change to either the "tsc_member" property or the "Maintainers.yaml" file.

If a maintainer is removed from the Maintainers list, the workflow removes that person from the organization and teams.

If there is a change to the "tsc_member" property, the workflow adds or removes the member from the TSC team based on the value of the property. If a member is added to the TSC team, the workflow notifies affected users.

If there are no changes made to the TSC team or the Maintainers list, the workflow ends.

```mermaid
graph TD;
A[Change to tsc_member property or Maintainers.yaml?] --> |Maintainer removed| B[Remove person from organization and teams];
A --> |No| D[End];

B --> E[End];

A --> |tsc_member value change| F[Add or remove member from TSC team?];
F --> |Add| G[Add member to TSC team];
G --> H[Update TSC team membership];
H --> I[Notify affected users];
I --> J[End];
F --> |Remove| K[Remove member from TSC team];
K --> H;
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

#### Workflow Diagram: Interconnections between Workflows

The following charts showcases the interconnections between different workflows that collectively automate the process of maintaining and updating the Maintainers.yaml file.

#### CODEOWNER Add/Remove

This flowchart illustrates the streamlined process for managing changes to a CODEOWNERS file. When changes are detected, the flowchart outlines steps for adding or removing a maintainer. For additions, it retrieves the new maintainer's information, updates Maintainers.yaml, validates changes, sends an invitation to the new maintainer, and notifies TSC members. For removals, it retrieves the removed maintainer's information, updates Maintainers.yaml, moves the removed maintainer's information to Emeritus.yaml, removes them from the organization, and notifies TSC members.

```mermaid
graph TD;
A[CODEOWNERS file changes detected] --> B{Is it an addition or removal of a maintainer?};
B --> |Addition| C1[Retrieve new maintainer information];
B --> |Removal| D1[Retrieve removed maintainer information];
C1 --> C2[Update Maintainers.yaml with new maintainer];
C2 --> E[Validate changes to Maintainers.yaml];
D1 --> D2[Update Maintainers.yaml to remove maintainer];
D2 --> E;
E --> |Validation failed| F[Notify user and block Pull Request];
E --> |Validation passed| G{Addition or Removal?};
G --> |Addition| H[Send invitation to new maintainer];
H --> I[Notify TSC Members of new addition];
G --> |Removal| J1[Update Emeritus.yaml with removed maintainer's info];
J1 --> J2[Remove maintainer from organization and teams];
J2 --> J3[Notify TSC Members of removal];
F --> K[End];
J3 --> K;
I --> K;

```

Below flowchart also depicts an independent process for maintainers who wish to update their information through a separate pull request. It involves validating the changes and either updating the Maintainers.yaml file or blocking the pull request if validation fails.

```mermaid
graph TD;
L[PR raised where maintainer is modified] --> M{Allow maintainer to update their social info and TSC member property?}
M -->|Yes| N[Update Maintainers.yaml with maintainer changes];
M -->|No| P[PR Ends];
N --> O[Validate changes to Maintainers.yaml];
O --> |Validation passed| P[PR Ends];
O --> |Validation failed| Q[Notify user and block Pull Request];
Q --> P;
```
