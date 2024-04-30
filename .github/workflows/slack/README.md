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
- Please [import](#L52) the user groups to terraform state if they already exist in the workspace, as they **cannot be deleted** in Slack 😢.

> [!IMPORTANT]
> The terraform state will overwrite any description, name, or topic change. It is better to manage the changes in the YAML files and then apply them. However, the terraform state will not affect bookmarks, pinned items, etc.
