### Automate Listing of Members of the Technical Steering Committee - GSoC 2023 Project

This project, titled "Automate listing of members of the Technical Steering Committee", is part of the Google Summer of Code (GSoC) 2023. The goal is to automate the process of managing and maintaining the Maintainers.yaml file, which contains the list of maintainers and TSC members of AsyncAPI. Through a series of workflows, we aim to automatically update the member's list based on changes in other files, invite new maintainers and TSC members, update the Emeritus.yaml file when someone is removed, and aggregate helpful information in the Maintainers.yaml file. These automation and improvements will make it easier to manage the maintainers and TSC members of AsyncAPI.


The first graph outlines the steps to automate the updating of Maintainers.yaml. This involves migrating to YAML, updating the website code to handle YAML format, automating the updation of Maintainers.yaml, creating a verification workflow to block pull requests if records are added/removed by humans, creating an update-maintainers workflow, and allowing humans to update social info and TSC member property.

```mermaid
graph TD;

subgraph Migrate TSC_MEMBERS.JSON to MAINTAINERS.yml
    A[Convert TSC_MEMBERS.JSON to MAINTAINERS.yml]
end

subgraph Read File & Filter TSC Members
    B1[Read new file name]
    B2[Filter objects with TSC member flag]
    B1 --> B2
end

subgraph Automate Maintainers.yaml update
    C[Automate Maintainers.yaml update]
    D[Verification workflow]
    E[update-maintainers workflow]
    F[Allow humans to update social info and TSC member property]
end

A --> B1
B2 --> C
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

### `verify-maintainers.yaml`

This workflow listens for changes to the Maintainers.yaml file and verifies the legitimacy of the changes. It discerns between changes made by a bot and those made by a human. If a human has made changes that involve critical attributes, which include modifying fields such as the GitHub username, repository keys, or removing an entire maintainer object, the workflow blocks the pull request and notifies the user with an appropriate message.

The workflow allows the pull request to continue if:

- The changes are made by the approved bot account.
- The changes made by a human do not involve the removal or modification of critical attributes.

> Note: This workflow should be located only in the community repository and should be made a required status check in the repository settings, so if it fails, PR cannot be merged.

```mermaid
graph TD;
A[Maintainers.yaml file changes detected] --> B{Changes made by bot or human?};

B --> |Bot| E[Continue with pull request];
B --> |Human| C{Do changes involve critical attributes?};

C --> |Yes| D[Block pull request with message];
C --> |No| E[Continue with pull request];

D --> F[End];
E --> F;

subgraph Critical Attributes
CA1[GitHub Username];
CA2[Maintainer's repositories list];
CA3[Addition or removal of any maintainer object];
end

```

### `update-maintainers.yaml`

This workflow listens for changes to the CODEOWNERS file and updates the Maintainers.yaml file accordingly. It also picks up the GitHub username, Twitter handle, and the name of the maintained repository from the API and notifies the affected users. If bot accounts are removed or added in CODEOWNERS file then it should ignore this workflow.

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

A --> |tsc_member value change| F{Add or remove member from TSC team?};
F --> |Add| G[Add member to TSC team];
G --> H[Update TSC team membership];
H --> I[Notify affected users];
I --> J[End];
F --> |Remove| K[Remove member from TSC team];
K --> H;
```

### `msg-to-new-member-pr-merged.yml`

This workflow is triggered when a new member is added to the TSC. It notifies the new member about ways to get notified when TSC members are called out and notifies other TSC members by mentioning the GitHub team.

> Note: This workflow should be located in the community repository.
> This one is already present.

```mermaid
graph TD;
A[PR modifies tsc_member to true?] --> |Yes| B[Notify new member about ways to get notified];
B --> C[Notify TSC members about new member];
C --> D[End];
A --> |No| D[End];
```

### `update-emeritus.yaml`

This workflow is triggered when a person is either removed from the Maintainers.yaml file or if their TSC member status is changed. It updates the Emeritus.yaml file with the information of ex-TSC members who left the project. Additionally, it should also be able to handle changes in TSC membership status.

> Note: This workflow should be located in the community repository.

```mermaid
graph TD;
A[Change in Maintainers.yaml?] --> |Removal or TSC flag changed| B[Check if TSC member];
B --> |Yes| C[Update Emeritus.yaml];
C --> D[End];
B --> |No| D[End];
A --> |No change| D[End];
```

#### Workflow Diagram: Interconnections between Workflows

The following charts showcases the interconnections between different workflows that collectively automate the process of maintaining and updating the Maintainers.yaml file.

#### CODEOWNER Add/Remove

This flowchart illustrates the streamlined process for managing changes to a CODEOWNERS file. When changes are detected, the flowchart outlines steps for adding or removing a maintainer. For additions, it retrieves the new maintainer's information, updates Maintainers.yaml, validates changes, sends an invitation to the new maintainer, and notifies TSC members. For removals, it retrieves the removed maintainer's information, updates Maintainers.yaml, moves the removed maintainer's information to Emeritus.yaml, removes them from the organization, and notifies TSC members.

```mermaid
graph TD;
A[CODEOWNERS file changes detected] --> B{Is it an addition, removal, or configuration update?};

B --> |Addition| C{Is maintainer already listed in Maintainers.yaml?};
B --> |Removal| R{Is Maintainer still owning some other repositories?};
B --> |Configuration Update| X[End];

C --> |Yes| C1[Add repo to existing maintainer];
C --> |No| C2[Retrieve new maintainer information and add to maintainers list];

C1 --> PR2[Create PR in Community Repo to Update Maintainer];
C2 --> PR3[Create PR in Community Repo with New Maintainer Info];

R --> |Yes| R1[Remove repository from list];
R --> |No| R2[Remove maintainer from list];

R1 --> PR4[Create PR in Community Repo for Removal from Repo];
R2 --> PR5[Create PR in Community Repo for Total Removal];
```

Below flowchart illustrates the process of verifying changes detected in the Maintainers.yaml file. It helps determine the type of changes, whether they are made by a bot or a human, and takes appropriate actions based on the nature of the changes.

Critical Attributes:
- GitHub Username
- Maintainer's repositories list
- Addition or removal of any maintainer object

The flowchart guides the verification process and actions to be taken, including merging pull requests, sending invitations, updating organization and repository settings, and notifying TSC members.

Please refer to the flowchart for a visual representation of the steps involved in verifying Maintainers.yaml changes.


```mermaid
graph TD;
A[Maintainers.yaml file changes detected] --> B{Is it by bot or human?};

B --> |Bot| D1{What kind of changes?};
B --> |Human| H1{What kind of changes?};

D1 --> |Maintainer Changes| C1{Is it an addition or removal?};
D1 --> |Maintainer's repositories list| S1[Merge PR];

C1 --> |Addition| G1[Merge PR];
C1 --> |Removal| E1{Maintainer being removed};

G1 --> Z1[Send invitation to new maintainer and notify TSC Members Add new maintainer to organization, repository, and team Post welcome comment to pull request];

E1 --> |Yes| F1[Human verification required before removal];

F1 --> |Human verification successful| L2[Merge PR, Remove maintainer from organization and teams, update Emeritus.yaml, and notify TSC Members];

H1 --> |isTscMember Change| TSC1{True or False};
H1 --> |Critical Changes| P[Close PR with clear message and no action];
H1 --> |Simple Change| N[Merge PR];

TSC1 --> |True| T1[Handle TSC member addition];
TSC1 --> |False| T2[Handle TSC member removal];

subgraph Critical Attributes
CA1[GitHub Username];
CA2[Maintainer's repositories list];
CA3[Addition or removal of any maintainer object];
end
```
