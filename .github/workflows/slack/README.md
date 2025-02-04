## Infrastructure for slack integration

This directory contains the infrastructure for Slack integration. It is used to create/manage Slack channels and groups and invite users to Slack channels. The Slack integration is implemented using the [slack-terraform-provider](https://github.com/pablovarela/terraform-provider-slack).

### Prerequisites

- [A slack App](https://api.slack.com/apps) with the following scopes under `User Token Scopes` in `OAuth & Permissions`:
  
  Write Permissions:
  - `channels:write`
  - `groups:write`
  - `usergroups:write`

  Read Permissions:
  - `channels:read`
  - `groups:read`
  - `usergroups:read`
  
> [!CAUTION]
> Try to use a bot to log into Slack to prevent any changes from being attributed to the workspace owner. This is due to using a `user token` for authentication, which does the changes on behalf of the user who created the token.

- [API Token](https://api.slack.com/apps) after installing the app in your workspace. ( `xoxp-<your-slack-token>` )

- [Terraform](https://www.terraform.io/downloads.html) installed on your local machine.

### Usage

- Create a `terraform.tfvars` file in the `slack` directory with the following content:

```hcl
slack_token = "xoxp-<your-slack-token>"
```

- Run the following commands to create the Slack resources:

```bash
terraform init
terraform apply
```

> [!TIP]
> The `terraform apply` command will create the resources better to use `terraform plan` to see the changes before applying.

### How it works

Three main resources are created using the slack integration:

- `slack_channel`: This resource creates a slack channel. The channels are defined in the [channels.yaml](./channels/channels.yaml) file. with the structure explained there.

- `slack_usergroup`: This resource creates a Slack user group. The usergroups are defined in the [usergroups.yaml](./groups/groups.yaml) file, and their structure is explained there. 

> [!CAUTION]
> The user groups should be unique across the workspace (i.e., no channel, user, or user group should have the same handle). Also, in case of user groups mentioned in the yaml existing in the workspace, you have to run the following command to import it to terraform state:
> ```bash
> terraform import module.groups.slack_usergroup.<resource name>[\"<usergroup name>\"] <usergroup id>
> 
> # Example
> terraform import module.groups.slack_usergroup.wg_groups[\"Developer Experience\"] <actual_group_id>
> ```

- `slack_user`: This resource invites users to the Slack workspace. The users are defined in the [users.tf](./users/users.tf) file, and their structure is explained there.

### Pitfalls

- Use of bot token of the format `xoxo-<your-slack-token>` is not supported for creating user groups.
- The user group should be unique across the workspace (i.e., no channel, user, or user group should have the same handle).
- Please [import](#importing-existing-resources) the user groups to terraform state if they already exist in the workspace, as they **cannot be deleted** in Slack 😢.
- **You have to invite the bot to all managed channels to make it work.**

> [!WARNING]
> **Creation of multitudes of groups leads to a lot of API calls and can lead to rate limiting. Please be cautious while creating groups, otherwise you will get `Error: couldn't get usergroups: slack rate limit exceeded, retry after 30s`**. Related issue (not fixed even thought it is closed): https://github.com/pablovarela/terraform-provider-slack/issues/64

> [!IMPORTANT]
> The terraform state will overwrite any description, name, or topic change. It is better to manage the changes in the YAML files and then apply them. However, the terraform state will not affect bookmarks, pinned items, etc.

### Importing existing resources

In case you have existing resources such as channels, user groups in the workspace, you can import them to the terraform state by transforming the `json` response from the slack API. An example script can be seen below:

```javascript
const fs = require('fs');
const fetch = require('node-fetch');

const token = 'xoxp-<your-slack-token>';

const fetchResource = async (resource, url_params) => {
  // convert the url_params to query string
  const url = new URL(`https://slack.com/api/${resource}`);
  Object.keys(url_params).forEach(key => url.searchParams.append(key, url_params[key]));
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

async function main() {
  const channels = await fetchResource('conversations.list', { exclude_archived: true });
  const usergroups = await fetchResource('usergroups.list', { include_users: true });

  channels.channels.forEach(channel => {
    console.log(`terraform import module.channels.slack_conversation.channels[\\"${channel.name}\\"] ${channel.id}`);
  });

  usergroups.usergroups.forEach(usergroup => {
    console.log(`terraform import module.groups.slack_usergroup.wg_groups[\\"${usergroup.name}\\"] ${usergroup.id}`);
  });
}


main();
```

### What all can be done?

#### Groups

The groups can be mentioned in the slack messages using the `@<group-name>` syntax. Addition of groups can be done by adding the group to the [groups.yaml](./groups/groups.yaml) file. 

The following groups are being created currently:
- `tsc`

  This group is for the Technical Steering Committee members mentioned in the [TSC_MEMBERS](../../../TSC_MEMBERS.json) file. Can be used to mention all the TSC members at once.

- `maintainers`

  This group is for the all maintainers of the repository mentioned in the [MAINTAINERS](../../../MAINTAINERS.yaml) file. Can be used to mention all the maintainers at once. 
  
- `studio`

  This group consists of members actively working on the studio project.

- `coc_commitee`
  
  This group consists of members of the Code of Conduct committee.

In addition to these groups are also being created for each working group mentioned in the [WORKING_GROUPS](../../../WORKING_GROUPS.yaml) file. Example: `@dx_wg`. 

We are also having groups for maintainers of each repository mentioned in the [MAINTAINERS](../../../MAINTAINERS.yaml) file. You can mention the maintainers of a repository using `@maintainers_<repo-name>`. Example: `@maintainers_studio`.

#### Channels

Two types of channels are being created currently:

- General channels: The channels are defined in the [channels.yaml](./channels/channels.yaml) file with the structure explained there. 

- Working group channels: The working group channels are created for each working group mentioned in the [WORKING_GROUPS](../../../WORKING_GROUPS.yaml) file. The channels are created with the name `wg_<working-group-name>` or custom nameas configured in the [WORKING_GROUPS](../../../WORKING_GROUPS.yaml) file.
