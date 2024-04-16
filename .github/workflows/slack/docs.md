## Infrastructure for slack integration

This directory contains the infrastructure for slack integration. The slack integration is used to create/manage slack channels, usergroups and invite users to slack channels. The slack integration is implemented using the [slack-terraform-provider](https://github.com/pablovarela/terraform-provider-slack).

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
  - `users:read`
  - `users:read.email`
  
> [!CAUTION]
> Try to use a bot for logging in to slack. This will prevent any changes to be attribued to the workspace owner. This is due to use of `user token` for authentication which does the changes on behalf of the user who created the token.

- [API Token](https://api.slack.com/apps) after installing the app in your workspace. ( `xoxp-<your-slack-token>` )

- [Terraform](https://www.terraform.io/downloads.html) installed on your local machine.

### Usage

- Create a `terraform.tfvars` file in the `slack` directory with the following content:

```hcl
slack_token = "xoxp-<your-slack-token>"
```

- Run the following commands to create the slack resources:

```bash
terraform init
terraform apply
```

> [!TIP]
> The `terraform apply` command will create the resources better to use `terraform plan` to see the changes before applying.

### How it works

There are three main resources that are created using the slack integration:

- `slack_channel`: This resource is used to create a slack channel. The channels are defined in the [channels.yaml](./channels/channels.yaml) file. with the structure explained there.

- `slack_usergroup`: This resource is used to create a slack usergroup. The usergroups are defined in the [usergroups.yaml](./groups/groups.yaml) file. with the structure explained there. 

> [!CAUTION]
> The usergroups handles should be unique across the workspace (i.e. no channel, user, usergroup should have the same handle). Also in case of usergroups mentioned in the yaml existin in the workspace, you have to run the following command to import it to terraform state:
> ```bash
> terraform import slack_usergroup.<usergroup_handle> <usergroup_id>
> ```

- `slack_user`: This resource is used to invite users to the slack workspace. The users are defined in the [users.tf](./users/users.tf) file, with the structure explained there.

### Pitfalls

- Use of bot token of the format `xoxb-<your-slack-token>` is not supported for creating usergroups.
- The usergroups handles should be unique across the workspace (i.e. no channel, user, usergroup should have the same handle).
- Please import the usergroups to terraform state if they already exist in the workspace, as they **cannot be deleted** in slack 😢.

> [!IMPORTANT]
> Any change of description, name or topic will be overwritten by the terraform state. So, it is better to manage the changes in the yaml files and then apply the changes. However bookmarks, pinned items, etc. will not be affected by the terraform state.
